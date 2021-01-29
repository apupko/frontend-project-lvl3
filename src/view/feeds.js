const buildHeader = (title) => {
  const header = document.createElement('h2');
  header.textContent = title;
  return header;
};

const buildItem = (feed) => {
  const title = document.createElement('h3');
  const description = document.createElement('p');
  const item = document.createElement('li');

  title.textContent = feed.title;
  description.textContent = feed.description;
  item.classList.add('list-group-item');
  item.append(title, description);

  return item;
};

const buildList = (feeds) => {
  const list = document.createElement('ul');
  const items = feeds.map(buildItem);
  list.classList.add('list-group', 'mb-5');
  items.forEach((item) => list.append(item));

  return list;
};

export default (view) => ({ feeds }) => {
  const { feeds: feedsDiv } = view;
  if (feeds.length === 0) {
    feedsDiv.innerHTML = '';
    return;
  }
  const header = buildHeader('Feeds');
  const list = buildList(feeds);
  feedsDiv.append(header, list);
};
