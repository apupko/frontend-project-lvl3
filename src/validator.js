import { object, number, string } from 'yup';

const validStatusCodes = [200];

export const validateUrl = (url, urlsList) => {
  const schema = string()
    .required()
    .url('feedback.errors.url.invalid')
    .notOneOf(urlsList, 'feedback.errors.rss.alreadyExists');
  return schema.isValidSync(url);
};

const rssContentShema = string()
  .required()
  .matches(/<rss.+?version=".+?".*?>/gm, { message: 'feedback.errors.rss.invalid' });

const rssStatusShema = object({
  http_code: number().equals(validStatusCodes, 'feedback.errors.rss.notFound'),
  content_type: string()
    .matches(/(rss\+xml|xml)/, { message: 'feedback.errors.rss.invalid' }),
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
