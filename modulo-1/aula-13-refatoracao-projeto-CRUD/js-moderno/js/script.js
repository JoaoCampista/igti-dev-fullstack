/*
1 refatoração: função start removida, transformada em função anonima dentro do próprio evento onde foi chamada,
ou seja dentro do evento load;
2 organizado variaveis globais no inicio do código;
3 trocado var para let
4 dentro da funcao activateInput, substituido o metodo push para o metodo spread
5 dentro da função deleteName, subistuido o metodo splice pelo filter, com o indexador i, e verificação de igualdade,
o metodo splice é mutavel, e o ideal é que o codigo seja imutavel, para nao ocorrer problemas.
6 subistituido funcao clearInput para arrowfunction
*/

let globalNames = ['um', 'dois', 'três', 'quatro'];
let inputName = null; // definida no escopo global como nulo para evitar problemas de rodar antes do html
let currentIndex = null;
let isEditing = false;

window.addEventListener('load', () => {
  inputName = document.querySelector('#inputName');

  preventFormSubmit();
  activateInput();
  render();
});

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault(); // evita o comportamento padrão de submeter um form e recarregar a pagina
  }

  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {
  function insertName(newName) {
    //globalNames.push(newName);
    globalNames = [...globalNames, newName];
  }

  function updateName(newName) {
    globalNames[currentIndex] = newName;
  }

  function handleTyping(event) {
    if (event.key === 'Enter' && event.target.value.trim() != '') {
      if (isEditing) {
        updateName(event.target.value);
      } else {
        insertName(event.target.value);
      }
      render();
      isEditing = false;
      clearInput();
    }
  }

  inputName.addEventListener('keyup', handleTyping);
  inputName.focus();
}

function render() {
  function createDeleteButtom(index) {
    function deleteName() {
      // 1 forma
      //globalNames.splice(index, 1);

      // 2 forma
      // globalNames = globalNames.filter((name, i) => {
      //   if (i === index) {
      //     return false;
      //   }
      //   return true; // nesse caso não é necessario o else, pois se der false ele vai sair da função
      // });

      //3 forma
      //return i !== index;
      //});

      //4 forma

      globalNames = globalNames.filter((_, i) => i !== index);

      render(); // Estado - o javascrip não sabe que alterou, entao precisa renderizar dnv a tela
    }
    var button = document.createElement('button');
    button.classList.add('deleteButton');
    button.textContent = 'x';
    button.addEventListener('click', deleteName);
    return button;
  }

  function createSpan(name, index) {
    function editItem() {
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }
    var span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = name;
    span.addEventListener('click', editItem);
    return span;
  }

  var divNames = document.querySelector('#names');
  divNames.innerHTML = ''; // limpa o registro

  var ul = document.createElement('ul');

  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];

    var li = document.createElement('li');
    var button = createDeleteButtom(i);
    var span = createSpan(currentName, i);

    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  }

  divNames.appendChild(ul);
  clearInput();
}

// function clearInput() {
//   inputName.value = '';
//   inputName.focus();
// }

const clearInput = () => {
  inputName.value = '';
  inputName.focus();
};
