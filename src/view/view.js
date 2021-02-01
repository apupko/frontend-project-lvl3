import onChange from 'on-change';
import renderForm from './form';
import renderFeeds from './feeds';
import renderPosts from './posts';
import renderFeedback from './feedback';

const watchingFunction = (view) => function func(path) {
  const mappingPathToRender = {
    'feedForm.state': renderForm(view),
    feedback: renderFeedback(view),
    feeds: renderFeeds(view),
    posts: renderPosts(view),
  };
  const render = mappingPathToRender[path];
  if (!render) {
    throw new Error('Unknown render path!!!');
  }
  render(this);
};

function init(state) {
  const { body } = document;
  this.title = body.querySelector('#mainTitle');
  this.description = body.querySelector('#mainDesc');
  this.form = body.querySelector('.rss-form');
  this.example = body.querySelector('#example');
  this.feedback = body.querySelector('.feedback');
  this.feeds = body.querySelector('.feeds');
  this.posts = body.querySelector('.posts');

  return onChange(state, watchingFunction(this));
}

function View() {
  this.init = init;
}

export default View;
