const removeInvalid = (element) => element.classList.remove('is-invalid');
const setInvalid = (element) => element.classList.add('is-invalid');

const enableElement = (element) => element.removeAttribute('disabled');
const disableElement = (element) => element.setAttribute('disabled', '');

const renderFormToFilling = (view) => {
  const { form } = view;
  const { url, submitBtn } = form.elements;
  removeInvalid(url);
  enableElement(submitBtn);
  enableElement(url);
};

const renderFormToSending = (view) => {
  const { form } = view;
  const { url, submitBtn } = form.elements;
  removeInvalid(url);
  disableElement(submitBtn);
  disableElement(url);
};

const renderFormToFailed = (view) => {
  const { form } = view;
  const { url, submitBtn } = form.elements;
  setInvalid(url);
  enableElement(submitBtn);
  enableElement(url);
};

const renderFormToLoaded = (view) => {
  const { form } = view;
  const { url, submitBtn } = form.elements;
  removeInvalid(url);
  url.value = '';
  enableElement(submitBtn);
  enableElement(url);
};

const mappingFormStateToRender = {
  filling: renderFormToFilling,
  sending: renderFormToSending,
  failed: renderFormToFailed,
  finished: renderFormToLoaded,
};

export default (view) => ({ feedForm }) => {
  const { state } = feedForm;
  const render = mappingFormStateToRender[state];
  if (!render) throw Error('Unknown form state!!!');
  render(view);
};
