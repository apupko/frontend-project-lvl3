import { createHeader, createItem, createList } from './utils.js';

export default (view) => ({ feeds }) => {
  const { feeds: feedsDiv } = view;
  if (feeds.length === 0) {
    feedsDiv.innerHTML = '';
    return;
  }
  const header = createHeader('Feeds');
  const items = feeds.map(createItem);
  const list = createList(items);
  feedsDiv.append(header, list);
};
