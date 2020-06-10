var express = require('express'); // importando a dependencia;
//import fs from ('fs')
var fs = require('fs');

var app = express(); // instanciando o express

app.use(express.json()); // necessário para identificar o body no formato json

app.get('/', function (require, response) {
  response.send('hello john');
});

app.post('/account', (require, response) => {
  let params = require.body;

  //fs.writeFile('accounts.json', JSON.stringify(params), (err) => { // writeFile apaga tudo e cria dnv

  fs.readFile('accounts.json', 'utf8', (err, data) => {
    try {
      let json = JSON.parse(data);
      console.log(json);
      response.send('post account');
    } catch (err) {
      response.send('erro');
    }
  });

  // // prettier-ignore
  // fs.appendFile('accounts.json', JSON.stringify(params), (err) => { // appendFile faz o apend na tabela criada, JSON.stringfy passa um arquivo json para string
  //   // writeFile apaga tudo e cria dnv
  //   console.log(err);
  // });
});

app.listen(3000, function () {
  console.log('listening on port 3000');
});
