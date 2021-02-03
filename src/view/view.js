import onChange from 'on-change';
import i18next from 'i18next';
import en from './locales/en.js';
import renderForm from './form';
import renderFeeds from './feeds';
import renderPosts from './posts';
import renderFeedback from './feedback';
import renderModal from './modal';

const watchingFunction = (view) => function func(path) {
  const mappingPathToRender = {
    'feedForm.state': renderForm(view),
    'stateUI.modal.id': renderModal(view),
    feedback: renderFeedback(view),
    feeds: renderFeeds(view),
    posts: renderPosts(view),
  };
  const route = path.includes('posts') ? 'posts' : path;
  const render = mappingPathToRender[route];
  if (!render) {
    throw new Error('Unknown render path!!!');
  }
  render(this);
};

const initStaticContents = () => {
  const title = document.body.querySelector('#mainTitle');
  const description = document.body.querySelector('#mainDesc');
  const example = document.body.querySelector('#example');
  const form = document.body.querySelector('.rss-form');
  const { submitBtn, url } = form.elements;
  const modalCloseBtn = document.body.querySelector('.close-modal-btn');

  title.textContent = i18next.t('mainPage.title');
  description.textContent = i18next.t('mainPage.description');
  example.textContent = i18next.t('mainPage.example');
  submitBtn.textContent = i18next.t('form.buttonLabel');
  url.setAttribute('placeholder', i18next.t('form.inputPlaceholder'));
  modalCloseBtn.textContent = i18next.t('posts.preview.modal.closeName');
};

function init(state) {
  this.modal = document.body.querySelector('#previewModal');
  this.modalTitle = this.modal.querySelector('.modal-title');
  this.modalBody = this.modal.querySelector('.modal-body');
  this.modalViewBtn = this.modal.querySelector('.full-article');

  this.form = document.body.querySelector('.rss-form');
  this.feedback = document.body.querySelector('.feedback');
  this.feeds = document.body.querySelector('.feeds');
  this.posts = document.body.querySelector('.posts');

  i18next.init({
    lng: 'en',
    debug: false,
    resources: {
      en,
    },
  })
    .then(() => initStaticContents())
    .catch((err) => console.log(err));

  return onChange(state, watchingFunction(this));
}

function View() {
  this.init = init;
}

export default View;
