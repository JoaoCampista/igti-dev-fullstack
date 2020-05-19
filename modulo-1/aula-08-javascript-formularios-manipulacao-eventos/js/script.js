console.log('Oi João');

// eventos

window.addEventListener('load', start);

function start() {
  console.log('função start');
  console.log('pagina totalmente carregada');

  var input = document.querySelector('#inputName');
  input.addEventListener('keyup', countName);

  var form = document.querySelector('form');
  form.addEventListener('submit', preventSubmit);
}

function countName(event) {
  var span = document.querySelector('#nameLength');
  var count = event.target.value;
  span.textContent = count.length;
}

function preventSubmit(event) {
  event.preventDefault();
  var nameInput = document.querySelector('#inputName');
  alert(nameInput.value + ' cadastrado com suceso!');
}
