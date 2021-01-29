import view from './view.js';
import rssParser from './parser.js';

export default () => {
  const state = {
    feedForm: {
      state: 'filing',
      fields: {
        url: '',
      },
      errors: [],
    },
    feeds: [],
    posts: [],
  };

  view.init();
  state.feedForm.state = 'failed';
  view.renderForm(state);
};
