const setValid = (element) => {
  element.classList.remove('is-invalid');
  element.classList.add('is-valid');
};

const setInvalid = (element) => {
  element.classList.remove('is-valid');
  element.classList.add('is-invalid');
};

const enableElement = (element) => element.classList.remove('disabled');
const disableElement = (element) => element.classList.add('disabled');

const renderFeedback = (view, message, { isError = false }) => {
  const { feedback } = view;
  feedback.textContent = message;
  if (isError) {
    feedback.classList.add('text-danger');
    return;
  }
  feedback.classList.remove('text-danger');
};

const renderFormToFilling = (view) => {
  const { form } = view;
  const { url, submitBtn } = form.elements;
  setValid(url);
  enableElement(submitBtn);
};

const renderFormToSending = (view) => {
  const { form } = view;
  const { url, submitBtn } = form.elements;
  setValid(url);
  disableElement(submitBtn);
};

const renderFormToFailed = (view, errors) => {
  const { form } = view;
  const { url, submitBtn } = form.elements;
  setInvalid(url);
  enableElement(submitBtn);
  const msg = errors.join(' ');
  renderFeedback(view, msg, { isError: true });
};

const renderFormToLoaded = (view) => {
  const { form } = view;
  const { url, submitBtn } = form.elements;
  setValid(url);
  url.textContent = '';
  enableElement(submitBtn);
  const msg = 'Loaded';
  renderFeedback(view, msg);
};

const mappingFormStateToRender = {
  filling: renderFormToFilling,
  sending: renderFormToSending,
  failed: renderFormToFailed,
  finished: renderFormToLoaded,
};

export default (view) => ({ feedForm }) => {
  const { state, errors } = feedForm;
  const render = mappingFormStateToRender[state];
  if (!render) throw Error('Unknown form state!!!');
  render(view, errors);
};
