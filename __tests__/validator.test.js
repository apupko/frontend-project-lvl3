import nock from 'nock';
import path from 'path';
import isValidRssUrl from '../src/validator.js';

nock.disableNetConnect();

const host = 'https://hexlet.ru';
const validRssUrl = '/valid.rss';
const invalidRssUrl = '/invalid.rss';
const wrongUrl = ':wrongurl.com';
const nonExistentUrl = '/nonexisten.rss';

const pathToValidRss = path.resolve(__dirname, '../__fixtures__/valid.rss');
const pathToInvalidRss = path.resolve(__dirname, '../__fixtures__/invalid.rss');

nock(host)
  .get(validRssUrl)
  .replyWithFile(200, pathToValidRss, {
    'Content-Type': 'application/rss+xml',
  })
  .get(invalidRssUrl)
  .replyWithFile(200, pathToInvalidRss, {
    'Content-Type': 'application/html',
  })
  .get(nonExistentUrl)
  .reply(404);

const urls = [
  ['valid url', `${host}${validRssUrl}`, true],
  ['invalid url', `${host}${invalidRssUrl}`, false],
  ['non existen url', `${host}${nonExistentUrl}`, false],
  ['wrong url', wrongUrl, false],
];

test.each(urls)('case %#: %s', (caseName, url, expected) => {
  expect(isValidRssUrl(url)).toBe(expected);
});
