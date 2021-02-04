import i18next from 'i18next';

const render = (view, feedback) => {
  const { feedback: label } = view;
  const { message, isError } = feedback;
  label.textContent = i18next.t(message);
  if (isError) {
    label.classList.add('text-danger');
    label.classList.remove('text-success');
    return;
  }
  label.classList.remove('text-danger');
  label.classList.add('text-success');
};

export default (view) => ({ feedback }) => {
  render(view, feedback);
};
