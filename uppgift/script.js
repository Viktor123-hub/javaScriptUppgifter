const form = document.querySelector('#form');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const output = document.querySelector('#output');

let users = [];



const validateText = id => {
  const input = document.querySelector('#' + id);
  const error = input.nextElementSibling;

  if(input.value === '') {
    error.innerText = 'Du måste ange ett namn';
    input.classList.add('is-invalid');
    return false;
  } else if(input.value.length < 2) {
    error.innerText = '';
    input.classList.add('is-invalid');
    return false;
  } else {
    input.classList.add('is-valid');
    input.classList.remove('is-invalid');
    return true;
  }
}

const validateEmail = id => {
  const input = document.querySelector('#' + id);
  const error = input.nextElementSibling;

  let regEx = /^\w+@[a-zA-Z]+?\.[a-zA-Z-]{2,}$/

  if(regEx.test(input.value)) {
    input.classList.add('is-valid');
    input.classList.remove('is-invalid');
    return true;
  } else {
    error.innerText = 'Ange en giltig email';
    input.classList.add('is-invalid');
    return false;
  }
}

const validate = () => {
  document.querySelectorAll('input').forEach(input => {
    if(input.type === 'text') {
      validateText(input.id);
    }

    if(input.type === 'email') {
      validateEmail(input.id)
    }
  })

}

const resetForm = () => {
  document.querySelectorAll('input').forEach(input => {
    input.value = '';
    input.classList.remove('is-valid');
  })
}


const createUser = (firstName, lastName, email) => {
  let user = {
    id: Date.now().toString(),
    firstName,
    lastName,
    email
  }

  users.push(user);
  console.log(users);
}

const renderUsers = () => {

  output.innerHTML = '';

  users.forEach(user => {
    let template = `
    <div class="user d-flex justify-content-between align-items-center mb-4">
      <div class="text">
        <h3>${user.firstName} ${user.lastName}</h3>
        <small>${user.email}</small>
      </div>
    </div>
    `

    output.innerHTML += template;
  })

}


renderUsers();

form.addEventListener('submit', (e) => {
  e.preventDefault();

  validate();

  if(validateText('firstName') && validateText('lastName') && validateEmail('email')) {
    createUser(firstName.value, lastName.value, email.value);
    renderUsers();
    resetForm();
  }
})
