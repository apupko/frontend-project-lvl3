// @ts-check

import { promises as fs } from 'fs';
import path from 'path';
import init from '../src/init';
import isValidUrl from '../src/validator';

beforeEach(async () => {
  const pathToHtml = path.resolve(__dirname, '../__fixtures__/index.html');
  const html = await fs.readFile(pathToHtml, 'utf8');
  document.body.innerHTML = html;
});

test('init', () => {
  init();
  expect(true).toBeDefined();
});

test('Valid url', () => {
  const validUrl = 'http://lorem-rss.herokuapp.com/feed';
  expect(isValidUrl(validUrl)).toBeTruthy();
  expect(isValidUrl('http://hexlet')).toBeFalsy();
});
