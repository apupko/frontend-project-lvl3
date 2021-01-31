const createHeader = (text) => {
  const header = document.createElement('h2');
  header.textContent = text;
  return header;
};

const createItem = (data) => {
  const title = document.createElement('h3');
  const description = document.createElement('p');
  const item = document.createElement('li');

  title.textContent = data.title;
  description.textContent = data.description;
  item.classList.add('list-group-item');
  item.append(title, description);

  return item;
};

const createList = (items) => {
  const list = document.createElement('ul');
  list.classList.add('list-group', 'mb-5');
  items.forEach((item) => list.append(item));

  return list;
};

export {
  createHeader,
  createItem,
  createList,
};
