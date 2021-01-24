import * as yup from 'yup';

export default (url) => {
  const schema = yup.string().url().required();
  return schema.isValidSync(url);
};
