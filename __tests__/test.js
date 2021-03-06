// @ts-check

import { promises as fs } from 'fs';
import path from 'path';
import init from '../src/app';

beforeEach(async () => {
  const pathToHtml = path.resolve(__dirname, '../index.html');
  const html = await fs.readFile(pathToHtml, 'utf8');
  document.body.innerHTML = html;
});

test('init', () => {
  init();
  expect(true).toBeDefined();
});
