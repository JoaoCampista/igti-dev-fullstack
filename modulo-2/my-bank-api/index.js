var express = require('express'); // importando a dependencia;
//import fs from ('fs')
var fs = require('fs');

var app = express(); // instanciando o express
var accountsRouter = require('./routes/accounts');

app.use(express.json()); // necessário para identificar o body no formato json

app.use('/account', accountsRouter);

app.listen(3000, function () {
  try {
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) {
        const initialJson = {
          nextId: 1,
          accounts: [],
        };

        fs.writeFile(fileName, JSON.stringify(initialJson), (err) => {
          if (err) {
            console.log(err);
          }
        }); // writeFile apaga tudo e cria dnv
      }
    });
  } catch (err) {
    console.log(err);
  }

  console.log('listening on port 3000');
});
