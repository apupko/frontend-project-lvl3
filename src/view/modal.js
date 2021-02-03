import _ from 'lodash';
import i18next from 'i18next';

const fillModal = (view, post) => {
  const { modalTitle, modalBody, modalViewBtn } = view;
  modalTitle.textContent = post.title;
  modalBody.textContent = post.description;
  modalViewBtn.textContent = i18next.t('posts.preview.modal.fullArtName');
  modalViewBtn.setAttribute('href', post.link);
};

export default (view) => (state) => {
  const { posts, stateUI } = state;
  const post = _(posts).find({ id: stateUI.modal.id });
  fillModal(view, post);
};
