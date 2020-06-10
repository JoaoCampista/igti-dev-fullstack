var express = require('express');
var router = express.Router();
var fs = require('fs');

global.fileName = 'accounts.json';

router.get('/', (_, response) => {
  fs.readFile(fileName, 'utf8', (err, data) => {
    if (!err) {
      let json = JSON.parse(data);
      delete json.nextId;
      response.send(json);
    } else {
      response.status(400).send({ error: err.message });
    }
  });
});

// router.get('/:id/:other, (request, response) => { // tambem funciona com mais de um parametro
router.get('/:id', (request, response) => {
  fs.readFile(fileName, 'utf8', (err, data) => {
    if (!err) {
      let json = JSON.parse(data);
      const account = json.accounts.find(
        (account) => account.id === parseInt(request.params.id, 10)
        //(account) => account.id == request.params.id
      );
      if (account) {
        response.send(account);
      } else {
        response.end();
      }
    } else {
      response.status(400).send({ error: err.message });
    }
  });
});

router.post('/', (require, response) => {
  let account = require.body;

  fs.readFile(fileName, 'utf8', (err, data) => {
    if (!err) {
      try {
        let json = JSON.parse(data);
        account = { id: json.nextId++, ...account };
        json.accounts.push(account);

        fs.writeFile(fileName, JSON.stringify(json), (err) => {
          if (err) {
            response.status(400).send({ error: err.message });
          } else {
            response.end();
          }
        });
      } catch (err) {
        response.status(400).send({ error: err.message });
      }
    } else {
      response.status(400).send({ error: err.message });
    }
  });

  // // prettier-ignore
  // fs.appendFile(fileName, JSON.stringify(params), (err) => { // appendFile faz o apend na tabela criada, JSON.stringfy passa um arquivo json para string
  //   // writeFile apaga tudo e cria dnv
  //   console.log(err);
  // });
});

module.exports = router;
