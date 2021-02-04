import i18next from 'i18next';
import { createItem, createList } from './utils.js';

const postClass = [
  'list-group-item',
  'd-flex',
  'justify-content-between',
  'align-items-start',
];

const createPreviewButton = (post) => {
  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.classList.add('btn', 'btn-primary', 'btn-sm');
  button.dataset.id = post.id;
  button.dataset.toggle = 'modal';
  button.dataset.target = '#previewModal';
  button.textContent = i18next.t('posts.preview.previewBtnName');
  return button;
};

const createPostItem = (post) => {
  const item = createItem();
  const link = document.createElement('a');
  const button = createPreviewButton(post);
  link.setAttribute('href', post.link);
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
  const readStyle = post.read ? 'font-weight-normal' : 'font-weight-bold';
  link.classList.add(readStyle);
  link.dataset.id = post.id;
  link.textContent = post.title;
  item.append(link, button);
  item.classList.add(...postClass);
  return item;
};

export default (view) => (state) => createList(
  view.posts,
  state.posts,
  createPostItem,
  i18next.t('posts.header'),
);
