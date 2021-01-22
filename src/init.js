// @ts-check

import App from './app.js';

export default () => {
  const element = document.getElementById('point');
  const obj = new App(element);
  obj.init();
};
