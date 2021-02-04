const createHeader = (text, type) => {
  const header = document.createElement(type);
  header.textContent = text;
  return header;
};

const createItem = () => {
  const item = document.createElement('li');
  item.classList.add('list-group-item');
  return item;
};

const createUl = (items) => {
  const list = document.createElement('ul');
  list.classList.add('list-group', 'mb-5');
  items.forEach((item) => list.append(item));
  return list;
};

const clear = (element) => {
  const tmp = element;
  tmp.innerHTML = '';
};

const createList = (parent, content, render, title) => {
  if (content.length === 0) return;
  clear(parent);
  const header = createHeader(title, 'h2');
  const items = content.map(render);
  const list = createUl(items);
  parent.append(header, list);
};

export {
  createHeader,
  createItem,
  createList,
};
