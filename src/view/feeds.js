import i18next from 'i18next';
import { createHeader, createItem, createList } from './utils.js';

const createFeedItem = (feed) => {
  const item = createItem();
  const title = document.createElement('h3');
  const description = document.createElement('p');
  title.textContent = feed.title;
  description.textContent = feed.description;
  item.append(title, description);
  return item;
};

export default (view) => ({ feeds }) => {
  const { feeds: feedsDiv } = view;
  feedsDiv.innerHTML = '';
  if (feeds.length === 0) return;

  const header = createHeader(i18next.t('feeds.header'));
  const items = feeds.map(createFeedItem);
  const list = createList(items);
  feedsDiv.append(header, list);
};
