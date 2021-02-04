import i18next from 'i18next';
import { createHeader, createItem, createList } from './utils.js';

const createFeedItem = (feed) => {
  const item = createItem();
  const title = createHeader(feed.title, 'h3');
  const description = document.createElement('p');
  description.textContent = feed.description;
  item.append(title, description);
  return item;
};

export default (view) => (state) => {
  const { feeds } = view;
  feeds.innerHTML = '';
  if (state.feeds.length === 0) return;

  const header = createHeader(i18next.t('feeds.header'), 'h2');
  const items = state.feeds.map(createFeedItem);
  const list = createList(items);
  feeds.append(header, list);
};
