import { object, number, string } from 'yup';

const validStatusCodes = [200];

export const ERRORS = {
  invalidUrl: 'Must be valid url',
  rssAlreadyExists: 'Rss already exists',
  wrongRss: 'This source doesn\'t contain valid rss',
  wrongContentType: 'This source doesn\'t contain valid rss',
  notFound: 'This source doesn\'t contain valid rss',
};

export const validateUrl = (url, urlsList) => {
  const schema = string()
    .required()
    .url(ERRORS.invalidUrl)
    .notOneOf(urlsList, ERRORS.rssAlreadyExists);
  return schema.validate(url);
};

const rssContentShema = string()
  .required()
  .matches(/<rss.+?version=".+?".*?>/gm, { message: ERRORS.wrongRss });

const rssStatusShema = object({
  http_code: number().equals(validStatusCodes, ERRORS.notFound),
  content_type: string().required()
    .matches(/(rss\+xml|xml)/, { message: ERRORS.wrongContentType }),
}).required();

export const validateResponse = (response) => {
  const schema = object().shape({
    status: number().required().equals(validStatusCodes),
    data: object({
      contents: rssContentShema,
      status: rssStatusShema,
    }).required(),
  });

  return schema.validate(response);
};
