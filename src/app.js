import View from './view/view.js';
import { validateUrl } from './validator.js';
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
    feeds: [],
    posts: [],
  };

  const view = new View();
  const state = view.init(initState);
  state.feedback = { message: '', isError: false };

  const formSubmitHahdler = (event) => {
    event.preventDefault();
    const url = event.target.elements.url.value;
    const feedsUrls = state.feeds.map(({ link }) => link);
    state.feedForm.state = 'sending';
    validateUrl(url, feedsUrls).then(getFeed).then(({ feed, posts }) => {
      state.feedForm.state = 'finished';
      state.feeds = [...state.feeds, feed];
      state.posts = [...posts, ...state.posts];
      state.feedback = { message: 'feedback.rssLoaded', isError: false };
      state.feedForm.state = 'filling';
    })
      .catch((error) => {
        const { message } = error;
        state.feedForm.state = 'failed';
        state.feedback = { message, isError: true };
      });
  };

  const { form } = view;
  form.addEventListener('submit', formSubmitHahdler);

  const updateFeeds = (st, timeout) => () => {
    getNewPostsFromFeeds(state)
      .then((newPostsArrays) => {
        const newPosts = newPostsArrays.flat();
        st.posts.unshift(...newPosts);
        setTimeout(updateFeeds(st), timeout);
      })
      .catch((err) => {
        setTimeout(updateFeeds(st), timeout);
        throw new Error(err);
      });
  };
  setTimeout(updateFeeds(state), UPDATE_TIME);
};
