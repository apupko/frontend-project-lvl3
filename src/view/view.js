import renderForm from './form';

function init() {
  const { body } = document;
  this.title = body.querySelector('#mainTitle');
  this.description = body.querySelector('#mainDesc');
  this.form = body.querySelector('.rss-form');
  this.example = body.querySelector('#example');
  this.feedback = body.querySelector('.feedback');
}

function View() {
  this.init = init;
  this.renderForm = renderForm(this);
  this.renderFeeds = renderFeeds(this);
  this.renderPosts = renderPosts(this);
}

export default View;
