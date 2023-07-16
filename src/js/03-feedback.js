import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
};
const STORAGE_KEY = 'feedback-form-state';
const newObject = {...JSON.parse(localStorage.getItem(STORAGE_KEY))};
popularTextArea();
refs.form.addEventListener('input', throttle(onOtherValue, 500));
refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  const {
    elements: { email, message },
  } = refs.form;
  if (email.value === '' || message.value === '') {
    return alert('Усі поля мають бути заповнені');
  }

  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  Object.keys(newObject).forEach(key => delete newObject[key])
}

function onOtherValue(evt) {
  const name = evt.target.name;
  //   console.log(name);
  const value = evt.target.value;
  //   console.log(value);
  newObject[name] = value;
  //   console.log(newObject);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newObject));
}

function popularTextArea() {
  const saveMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (saveMessage) {
    // console.log(saveMessage);
    for (const key in saveMessage) {
      refs.form[key].value = saveMessage[key];
    }
  }
}
