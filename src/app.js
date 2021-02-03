import _ from 'lodash';
import View from './view/view.js';
import {
  getFeed,
  validateForm,
  indexing,
  getNewPostsFromFeeds,
} from './form.js';

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
    const feedsUrls = _.map(state.feeds, (feed) => _.get(feed, 'link'));
    state.feedForm.state = 'sending';
    validateForm(url, feedsUrls).then(getFeed).then(indexing)
      .then(({ feed, posts }) => {
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

  const update = (st) => () => {
    getNewPostsFromFeeds(state)
      .then((newPostsArrays) => {
        const newPosts = _.flatten(newPostsArrays);
        st.posts.unshift(...newPosts);
        setTimeout(update(st), 5000);
      })
      .catch((err) => {
        setTimeout(update(st), 5000);
        throw new Error(err);
      });
  };
  setTimeout(update(state), 5000);
};
