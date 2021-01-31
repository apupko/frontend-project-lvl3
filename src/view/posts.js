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
  link.textContent = post.title;
  item.append(link);
  item.classList.add(...postClass);
  return item;
};

export default (view) => ({ posts }) => {
  const { posts: postsDiv } = view;
  if (posts.length === 0) {
    postsDiv.innerHTML = '';
    return;
  }
  const header = createHeader('Posts');
  const items = posts.map(createPostItem);
  const list = createList(items);
  postsDiv.append(header, list);
};
