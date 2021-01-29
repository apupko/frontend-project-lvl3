function init() {
  const { body } = document;
  this.title = body.querySelector('#mainTitle');
  this.description = body.querySelector('#mainDesc');
  this.form = body.querySelector('.rss-form');
  this.example = body.querySelector('#example');
  this.feedback = body.querySelector('.feedback');
}

function setFormToFillingView() {
  const { form, feedback } = this;
  form.elements.url.classList.remove('is-invalid');
  form.elements.url.classList.add('is-valid');
  form.elements.submitBtn.classList.remove('disabled');
  feedback.classList.remove('text-danger');
}

const setFormToSendingView = () => {
  const { form, feedback } = view;
  form.elements.submitBtn.classList.add('disabled');
  feedback.classList.remove('text-danger');
};

const setFormToFailedView = (view, errors) => {
  const { form, feedback } = view;
  form.elements.url.classList.add('is-invalid');
  form.elements.url.classList.remove('is-valid');
  form.elements.submitBtn.classList.remove('disabled');
  feedback.textContent = errors.join(' ');
  feedback.classList.add('text-danger');
};

const mappingFormState = {
  filling: setFormToFillingView,
  sending: setFormToSendingView,
  failed: setFormToFailedView,
};

function renderForm({ feedForm }) {
  const { state, fields } = feedForm;
  const updateForm = mappingFormState[state];
  if (!updateOperation) throw Error('Unknown form status!!!');
  updateForm(this);
}

const render = (state) => {

};

function View() {
  this.init = init;
  this.renderForm = renderForm;
}

export default View;
