import { readFixtureFile } from '../__fixtures__/utils.js';
import rss from '../src/parser';

const expected = {
  title: 'RSS feed',
  description: 'Simple rss feed',
  posts: [
    { title: 'First post', description: 'First post description', link: '#' },
    { title: 'Second post', description: 'Second post description', link: '#' },
  ],
};

test('parse valid rss', () => readFixtureFile('test.rss')
  .then((data) => rss.parse(data))
  .then((obj) => expect(obj).toEqual(expected)));
