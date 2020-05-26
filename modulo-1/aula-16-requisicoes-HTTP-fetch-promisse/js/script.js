window,
  addEventListener('load', () => {
    fetch('https://api.github.com/users/joaocampista').then((res) => {
      //res = response
      res.json().then((data) => {
        showData(data); // a função json pode demorar, portanto utiliza o then para esperar o carregamento da promisse
      });
    });
  });

function showData(data) {
  const users = document.querySelector('#user');
  users.textContent = `${data.login} ${data.name}`;
}
