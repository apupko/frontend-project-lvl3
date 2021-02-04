import onChange from 'on-change';
import i18next from 'i18next';
import en from './locales/en.js';
import renderForm from './form';
import renderFeeds from './feeds';
import renderPosts from './posts';
import renderFeedback from './feedback';
import renderModal from './modal';

const view = {};

const watchingFunction = (state) => (path) => {
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

  render(state);
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

const init = (state) => {
  view.modal = document.body.querySelector('#previewModal');
  view.modalTitle = view.modal.querySelector('.modal-title');
  view.modalBody = view.modal.querySelector('.modal-body');
  view.modalViewBtn = view.modal.querySelector('.full-article');

  view.form = document.body.querySelector('.rss-form');
  view.feedback = document.body.querySelector('.feedback');
  view.feeds = document.body.querySelector('.feeds');
  view.posts = document.body.querySelector('.posts');

  i18next.init({
    lng: 'en',
    debug: false,
    resources: {
      en,
    },
  })
    .then(() => initStaticContents())
    .catch((err) => console.log(err));

  return onChange(state, watchingFunction(state));
};

export default { elements: view, init };
