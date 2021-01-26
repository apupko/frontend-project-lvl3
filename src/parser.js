import { map } from 'lodash';

const parseItem = (item) => {
  const title = item.querySelector('title').textContent;
  const description = item.querySelector('description').textContent;
  const link = item.querySelector('link').textContent;
  return { title, description, link };
};

const parse = (data) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'application/xml');
  const channel = doc.querySelector('channel');
  const title = channel.querySelector('title').textContent;
  const description = channel.querySelector('description').textContent;
  const posts = map(channel.getElementsByTagName('item'), parseItem);
  return { title, description, posts };
};

export default { parse };
