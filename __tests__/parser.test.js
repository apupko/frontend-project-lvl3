import { readFixtureFile } from '../__fixtures__/utils.js';
import rss from '../src/parser';

const expected = {
  feed: {
    title: 'RSS feed',
    description: 'Simple rss feed',
    link: '#',
    id: 1,
  },
  posts: [
    {
      title: 'First post',
      description: 'First post description',
      link: '#',
      id: 1,
      feedId: 1,
    },
    {
      title: 'Second post',
      description: 'Second post description',
      link: '#',
      id: 1,
      feedId: 1,
    },
  ],
};

const rssDataFile = [
  ['valid', 'test.rss', expected],
  ['invalid', 'index.html', {}],
];

test.each(rssDataFile)('parse %s rss', (caseName, file, expectedResult) => (
  readFixtureFile(file)
    .then((data) => rss.parse(data, '#', () => 1))
    .then((obj) => expect(obj).toEqual(expectedResult))));
