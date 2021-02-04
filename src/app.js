import _ from 'lodash';
import view from './view/view.js';
import { getUrlValidationSchema } from './validator.js';
import { getFeed, getNewPostsFromFeeds } from './feeds.js';

const UPDATE_TIME = 5000;

export default () => {
  const initState = {
    feedForm: {
      state: 'filling',
    },
    feedback: {
      message: '',
      isError: false,
    },
    stateUI: {
      modal: {
        id: 0,
      },
    },
    feeds: [],
    posts: [],
  };

  const state = view.init(initState);

  const formSubmitHahdler = (event) => {
    event.preventDefault();
    const url = event.target.elements.url.value;
    const feedsUrls = state.feeds.map(({ link }) => link);
    const urlSchema = getUrlValidationSchema(feedsUrls);

    if (urlSchema.isValidSync(url)) {
      state.feedForm.state = 'sending';
      getFeed(url).then(({ feed, posts }) => {
        state.feedForm.state = 'finished';
        state.feeds = [...state.feeds, feed];
        state.posts = [...posts, ...state.posts];
        state.feedback = { message: 'feedback.rssLoaded', isError: false };
        state.feedForm.state = 'filling';
      })
        .catch((error) => {
          const { message } = error;
          state.feedback = { message, isError: true };
          state.feedForm.state = 'failed';
        });
    } else {
      try {
        urlSchema.validateSync(url);
      } catch (error) {
        const { message } = error;
        state.feedback = { message, isError: true };
        state.feedForm.state = 'failed';
      }
    }
  };

  const modalShowHandler = (event) => {
    const { target } = event;
    const { id } = target.dataset;
    if (!id) return;
    state.stateUI.modal.id = id;
    const index = _(state.posts).findIndex({ id });
    state.posts[index].read = true;
  };

  const { form, posts } = view.elements;
  form.addEventListener('submit', formSubmitHahdler);
  posts.addEventListener('click', modalShowHandler);

  const updateFeeds = (st, timeout) => () => {
    getNewPostsFromFeeds(state)
      .then((newPostsArrays) => {
        const newPosts = newPostsArrays.flat();
        st.posts.unshift(...newPosts);
        setTimeout(updateFeeds(st, timeout), timeout);
      })
      .catch((err) => {
        setTimeout(updateFeeds(st, timeout), timeout);
        throw new Error(err);
      });
  };
  setTimeout(updateFeeds(state, UPDATE_TIME), UPDATE_TIME);
};
