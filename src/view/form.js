const renderFormToFilling = ({ elements }) => {
  const { url, submitBtn } = elements;
  url.classList.remove('is-invalid');
  submitBtn.removeAttribute('disabled');
  url.removeAttribute('readonly');
};

const renderFormToSending = ({ elements }) => {
  const { url, submitBtn } = elements;
  url.classList.remove('is-invalid');
  submitBtn.setAttribute('disabled', '');
  url.setAttribute('readonly', '');
};

const renderFormToFailed = ({ elements }) => {
  const { url, submitBtn } = elements;
  url.classList.add('is-invalid');
  submitBtn.removeAttribute('disabled');
  url.removeAttribute('readonly');
};

const renderFormToFinished = ({ elements }) => {
  const { url } = elements;
  url.value = '';
};

const mappingFormStateToRender = {
  filling: renderFormToFilling,
  sending: renderFormToSending,
  failed: renderFormToFailed,
  finished: renderFormToFinished,
};

export default ({ form }) => ({ feedForm }) => {
  const render = mappingFormStateToRender[feedForm.state];
  if (!render) throw Error('Unknown form state!!!');
  render(form);
};
