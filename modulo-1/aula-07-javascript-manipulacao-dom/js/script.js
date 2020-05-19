console.log('olá joão');

var title = document.querySelector('h1');

title.textContent = 'Mudei o H1';

var city = document.querySelector('#city');

city.textContent = 'Campinas';

var personalDataArray = document.querySelectorAll('.data');

personalDataArray = Array.from(personalDataArray); // mutabilidade

var data = Array.from(document.querySelectorAll('.data'));

for (var i = 0; i < data.length; i++) {
  var currentElement = data[i];
  currentElement.style.color = 'red';
}

//adicionando outra classe ao array de elementos

for (var i = 0; i < data.length; i++) {
  var currentElement = data[i];
  currentElement.classList.add('emphasis');
}
