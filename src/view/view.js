import onChange from 'on-change';
import renderForm from './form';
import renderFeeds from './feeds';
import renderPosts from './posts';

const watchingFunction = (view) => function (path) {
  console.log(`path - ${path}`);
  const mappingPathToRender = {
    'feedForm.state': renderForm(view),
    errors: renderForm(view),
    feeds: renderFeeds(view),
    posts: renderPosts(view),
  };
  const render = mappingPathToRender[path];
  if (!render) {
    throw new Error('Unknown app state!!!');
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
