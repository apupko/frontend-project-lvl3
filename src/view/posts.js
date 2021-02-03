import i18next from 'i18next';
import { createHeader, createItem, createList } from './utils.js';

const postClass = [
  'd-flex',
  'justify-content-beetwen',
  'align-items-start',
];

const createPostItem = (post) => {
  const item = createItem();
  const link = document.createElement('a');
  link.setAttribute('href', post.link);
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
  link.classList.add('font-weight-bold');
  link.textContent = post.title;
  item.append(link);
  item.classList.add(...postClass);
  return item;
};

export default (view) => ({ posts }) => {
  const { posts: postsDiv } = view;
  postsDiv.innerHTML = '';
  if (posts.length === 0) return;
  const header = createHeader(i18next.t('posts.header'));
  const items = posts.map(createPostItem);
  const list = createList(items);
  postsDiv.append(header, list);
};
