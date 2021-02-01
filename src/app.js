import axios from 'axios';
import _ from 'lodash';
import View from './view/view.js';
import { validateUrl, validateResponse } from './validator.js';
import RSSParser from './parser.js';

const proxy = (url) => `https://hexlet-allorigins.herokuapp.com/get?url=${encodeURIComponent(url)}`;

export default () => {
  const initState = {
    feedForm: {
      state: 'filling',
      fields: {
        url: '',
      },
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

  const { form } = view;

  const formSubmitHahdler = (event) => {
    event.preventDefault();
    const { value } = event.target.elements.url;
    const feedsUrls = state.feeds.map((feed) => _.get(feed, 'link'));
    console.log(feedsUrls);
    validateUrl(value, feedsUrls)
      .then((validUrl) => {
        state.feedForm.state = 'sending';
        return axios.get(proxy(validUrl));
      })
      .then((response) => validateResponse(response))
      .then(({ data }) => {
        const { url } = data.status;
        const { contents } = data;
        return RSSParser.parse(contents, url, _.uniqueId);
      })
      .then(({ feed, posts }) => {
        state.feedForm.state = 'finished';
        state.feeds = [...state.feeds, feed];
        state.posts = [...state.posts, ...posts];
        state.feedback = { message: 'Ok', isError: false };
        state.feedForm.state = 'filling';
      })
      .catch((err) => {
        state.feedForm.state = 'failed';
        const { message } = err;
        state.feedback = { message, isError: true };
      });
  };

  form.addEventListener('submit', formSubmitHahdler);
};
