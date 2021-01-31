const createHeader = (text) => {
  const header = document.createElement('h2');
  header.textContent = text;
  return header;
};

const createItem = () => {
  const item = document.createElement('li');
  item.classList.add('list-group-item');

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
