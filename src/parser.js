import { map } from 'lodash';

const parseItem = (item, feedId, generateId) => {
  const title = item.querySelector('title').textContent;
  const description = item.querySelector('description').textContent;
  const link = item.querySelector('link').textContent;
  return {
    title,
    description,
    link,
    id: generateId(),
    feedId,
  };
};

const parseFeed = (channel, generateId) => {
  const title = channel.querySelector('title').textContent;
  const description = channel.querySelector('description').textContent;
  const link = channel.querySelector('link').textContent;
  return {
    title,
    description,
    link,
    id: generateId(),
  };
};

const parse = (data, generateId) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'application/xml');
  const channel = doc.querySelector('channel');
  if (!channel) return {};
  const feed = parseFeed(channel, generateId);
  const posts = map(channel.getElementsByTagName('item'),
    (item) => parseItem(item, feed.id, generateId));
  return { feed, posts };
};

export default { parse };
