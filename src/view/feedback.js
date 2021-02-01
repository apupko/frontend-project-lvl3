import i18next from 'i18next';

const render = (view, feedback) => {
  const { feedback: label } = view;
  const { message, isError } = feedback;
  label.textContent = i18next.t(message);
  if (isError) {
    label.classList.add('text-danger');
    return;
  }
  label.classList.remove('text-danger');
};

export default (view) => ({ feedback }) => {
  render(view, feedback);
};
