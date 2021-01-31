import { createHeader, createItem, createList } from './utils.js';

export default (view) => ({ posts }) => {
  const { posts: postsDiv } = view;
  if (posts.length === 0) {
    postsDiv.innerHTML = '';
    return;
  }
  const header = createHeader('Posts');
  const items = posts.map(createItem);
  const list = createList(items);
  postsDiv.append(header, list);
};
