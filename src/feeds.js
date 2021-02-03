import axios from 'axios';
import _ from 'lodash';
import { validateUrl, validateResponse } from './validator.js';
import RSSParser from './parser.js';

const proxyUrl = 'https://hexlet-allorigins.herokuapp.com/get?url=';
const proxy = (url) => `${proxyUrl}${encodeURIComponent(url)}`;

export const loadRss = (url) => axios
  .get(proxy(url))
  .catch(() => Promise.reject(new Error('feedback.errors.network')));

const setLinkToFeed = ({ feed, posts }, link) => ({ feed: { ...feed, link }, posts });
const indexingFeed = ({ feed, posts }) => ({ feed: { ...feed, id: _.uniqueId() }, posts });
const indexingPost = (post, feedId) => ({ ...post, feedId, id: _.uniqueId() });
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

export const validateForm = (url, feedsUrls) => validateUrl(url, feedsUrls);

export const getFeed = (url) => loadRss(url)
  .then(validateResponse)
  .then(parseResponse)
  .then((rss) => _(rss).setLinkToFeed(url).value());

export const indexing = (rss) => _(rss).indexingFeed().indexingPosts().value();

const notContainIn = (posts) => (post) => _(posts).every(({ link }) => link !== post.link);

const getUpdatedPostsFromFeed = ({ feed, posts: loadedPosts }) => getFeed(feed.link)
  .then((rss) => _(rss.posts).filter(notContainIn(loadedPosts)).value())
  .then((newPosts) => _({ feed, posts: newPosts }).indexingPosts().getPosts().value());

const getNewPosts = (allPosts, feed) => (
  { feed, posts: _(allPosts).filter((post) => post.feedId === feed.id).value() }
);

export const getNewPostsFromFeeds = ({ feeds, posts }) => Promise.all(
  _(feeds).flatMap((feed) => getUpdatedPostsFromFeed(getNewPosts(posts, feed))).value(),
);
