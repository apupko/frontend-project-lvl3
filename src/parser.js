import { map } from 'lodash';

const parseItem = (item) => {
  const title = item.querySelector('title').textContent;
  const description = item.querySelector('description').textContent;
  const link = item.querySelector('link').textContent;
  return {
    title,
    description,
    link,
  };
};

const parseFeed = (channel) => {
  const title = channel.querySelector('title').textContent;
  const description = channel.querySelector('description').textContent;
  return {
    title,
    description,
  };
};

const parse = (data) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'application/xml');
  const channel = doc.querySelector('channel');
  if (!channel) return {};
  const feed = parseFeed(channel);
  const posts = map(channel.getElementsByTagName('item'),
    (item) => parseItem(item));
  return { feed, posts };
};

export default { parse };
