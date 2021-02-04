import nock from 'nock';
import path from 'path';
import axios from 'axios';
import fs from 'fs';
import { validateResponse } from '../src/validator.js';

axios.defaults.adapter = require('axios/lib/adapters/http');

nock.disableNetConnect();

const host = 'http://hexlet.ru';
const validUrl = '/valid.rss';
// const wrongUrl = ':-wrongurl.com';
const responses = {};

beforeAll(() => {
  const pathToValidRss = path.resolve(__dirname, '../__fixtures__/valid.json');
  const pathToInvalidRss = path.resolve(__dirname, '../__fixtures__/invalid.json');
  responses.valid = JSON.parse(fs.readFileSync(pathToValidRss, 'utf-8'));
  responses.invalid = JSON.parse(fs.readFileSync(pathToInvalidRss, 'utf-8'));
});

test('valid response', () => {
  nock(host)
    .get(validUrl)
    .reply(200, responses.valid);
  return axios.get(`${host}${validUrl}`)
    .then((response) => validateResponse(response))
    .then((response) => expect(response.data).toEqual(responses.valid));
});

test('invalid rss in response', () => {
  nock(host)
    .get(validUrl)
    .reply(200, responses.invalid);
  return axios.get(`${host}${validUrl}`)
    .then((response) => validateResponse(response))
    .catch((err) => expect(err.errors).toContain('feedback.errors.rss.invalid'));
});
