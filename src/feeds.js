import axios from 'axios';
import _ from 'lodash';
import { validateResponse } from './validator.js';
import RSSParser from './parser.js';

axios.defaults.baseURL = 'https://hexlet-allorigins.herokuapp.com';

const requestPath = (url) => `/get?url=${encodeURIComponent(url)}`;

export const loadRss = (url) => axios
  .get(requestPath(url));
  // .catch(() => Promise.reject(new Error('feedback.errors.network')));

const setLinkToFeed = ({ feed, posts }, link) => ({ feed: { ...feed, link }, posts });
const indexingFeed = ({ feed, posts }) => ({ feed: { ...feed, id: _.uniqueId() }, posts });
const indexingPost = (post, feedId) => ({
  ...post,
  feedId,
  id: _.uniqueId(),
  read: false,
});
const indexingPosts = ({ feed, posts }) => (
  { feed, posts: posts.map((post) => indexingPost(post, feed.id)) });

const getPosts = ({ posts }) => posts;

_.mixin({
  setLinkToFeed,
  indexingFeed,
  indexingPosts,
  getPosts,
});

const parseResponse = ({ data }) => RSSParser.parse(data.contents);

const getRawFeed = (url) => loadRss(url)
  .then(validateResponse)
  .then(parseResponse)
  .then((rss) => _(rss).setLinkToFeed(url).value());

const notContainIn = (posts) => (post) => _(posts).every(({ link }) => link !== post.link);

const getNewPostsFromFeed = ({ feed, posts: loadedPosts }) => getRawFeed(feed.link)
  .then((rss) => _(rss.posts).filter(notContainIn(loadedPosts)).value())
  .then((newPosts) => _({ feed, posts: newPosts }).indexingPosts().getPosts().value());

const extract = (allPosts, feed) => (
  { feed, posts: _(allPosts).filter((post) => post.feedId === feed.id).value() }
);

export const getFeed = (url) => getRawFeed(url)
  .then((rss) => _(rss).indexingFeed().indexingPosts().value());

export const getNewPostsFromFeeds = ({ feeds, posts }) => Promise.all(
  _(feeds).flatMap((feed) => getNewPostsFromFeed(extract(posts, feed))).value(),
);
