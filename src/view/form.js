const removeInvalid = (element) => element.classList.remove('is-invalid');
const setInvalid = (element) => element.classList.add('is-invalid');

const enableElement = (element) => element.setAttribute('disabled', false);
const disableElement = (element) => element.setAttribute('disabled', true);

const renderFeedback = (view, message, options = { error: false }) => {
  const { feedback } = view;
  feedback.textContent = message;
  const { error } = options;
  if (error) {
    feedback.classList.add('text-danger');
    return;
  }
  feedback.classList.remove('text-danger');
};

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

const renderFormToFailed = (view, errors) => {
  const { form } = view;
  const { url, submitBtn } = form.elements;
  setInvalid(url);
  enableElement(submitBtn);
  enableElement(url);
  const msg = errors.join(' ');
  renderFeedback(view, msg, { error: true });
};

const renderFormToLoaded = (view) => {
  const { form } = view;
  const { url, submitBtn } = form.elements;
  removeInvalid(url);
  url.textContent = '';
  enableElement(submitBtn);
  enableElement(url);
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
