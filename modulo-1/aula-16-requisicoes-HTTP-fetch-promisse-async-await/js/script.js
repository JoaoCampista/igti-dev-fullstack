/*
window.addEventListener('load', () => {
  fetch('https://api.github.com/users/joaocampista').then((res) => {
    //res = response
    res.json().then((data) => {
      showData(data); // a função json pode demorar, portanto utiliza o then para esperar o carregamento da promisse
    });
  });
});

*/

window.addEventListener('load', () => {
  doFetch();
  doFetchAsync();
  //transformando para async await

  executeDivisionPromise(20, 60);

  // criando uma promisse
  divisionPromise(12, 7)
    .then((result) => {
      console.log(result);
    })
    .catch((errorMessage) => {
      console.log(`Falha na divisão ${errorMessage}`);
    });
});

function doFetch() {
  fetch('https://api.github.com/users/joaocampista')
    .then((res) => {
      //res = response
      res.json().then((data) => {
        showData(data); // a função json pode demorar, portanto utiliza o then para esperar o carregamento da promisse
      });
    })
    .catch((error) => {
      console.log('Erro na requisição');
    });
}

async function doFetchAsync() {
  const res = await fetch('https://api.github.com/users/joaocampista');
  const json = await res.json();
  showData(json);
}

function showData(data) {
  const users = document.querySelector('#user');
  users.textContent = `${data.login} ${data.name}`;
}

function divisionPromise(a, b) {
  return new Promise((resolve, reject) => {
    if (b === 0) {
      reject('Não é possivel dividir por 0');
    }
    resolve(a / b);
  });
}

async function executeDivisionPromise(a, b) {
  const division = await divisionPromise(a, b);
  console.log(division);
}
