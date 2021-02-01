import axios from 'axios';
import _ from 'lodash';
import View from './view/view.js';
import { validateUrl, validateResponse } from './validator.js';
import RSSParser from './parser.js';

export default () => {
  const initState = {
    feedForm: {
      state: 'filling',
      fields: {
        url: '',
      },
      errors: [],
    },
    feeds: [],
    posts: [],
  };

  const view = new View();
  const state = view.init(initState);

  const { form } = view;

  const formSubmitHahdler = (event) => {
    event.preventDefault();
    const { value } = event.target.elements.url;
    const feedsUrls = state.feeds.map((feed) => _.get(feed, 'link'));
    validateUrl(value, feedsUrls)
      .then((validUrl) => {
        state.feedForm.state = 'sending';
        return axios.get(validUrl);
      })
      .then((response) => validateResponse(response))
      .then(({ data }) => RSSParser.parse(data.contents))
      .then(({ feeds, posts }) => {
        state.feedForm.state = 'finished';
        state.feeds = [...feeds];
        state.posts = [...posts];
        state.feedForm.state = 'filling';
      })
      .catch((err) => {
        state.feedForm.state = 'failed';
        state.errors = [...err.errors];
      });
  };

  form.addEventListener('submit', formSubmitHahdler);
};
