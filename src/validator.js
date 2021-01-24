import * as yup from 'yup';

export const isValidUrl = (url) => {
  const schema = yup.string().url().required();
  return schema.isValidSync(url);
};

export const isValidRSS = (data) => {
  return false;
};
