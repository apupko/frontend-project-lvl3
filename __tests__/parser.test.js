import { readFixtureFile } from '../__fixtures__/utils.js';
import rss from '../src/parser';

const expected = {
  feed: {
    title: 'RSS feed',
    description: 'Simple rss feed',
  },
  posts: [
    {
      title: 'First post',
      description: 'First post description',
      link: '#',
    },
    {
      title: 'Second post',
      description: 'Second post description',
      link: '#',
    },
  ],
};

const rssDataFile = [
  ['valid', 'test.rss', expected],
  ['invalid', 'index.html', {}],
];

test.each(rssDataFile)('parse %s rss', (caseName, file, expectedResult) => (
  readFixtureFile(file)
    .then((data) => rss.parse(data))
    .then((obj) => expect(obj).toEqual(expectedResult))));
