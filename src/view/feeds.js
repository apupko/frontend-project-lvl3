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

export default (view) => (state) => createList(
  view.feeds,
  state.feeds,
  createFeedItem,
  i18next.t('feeds.header'),
);
