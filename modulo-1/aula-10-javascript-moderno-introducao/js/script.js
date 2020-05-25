'use strict';

/*
var x let

var tem escopo abrangente
let tem escopo reduzido
*/

function withVar() {
  for (var i = 0; i < 10; i++) {
    console.log('var' + i);
  }

  i = 20;
  console.log(i);
}
function withLet() {
  for (let i = 0; i < 10; i++) {
    console.log('let' + i);
  }

  i = 20;
  console.log(i);
}

withVar(); // var é possivel reatribuir o valor, fora do escopo da função
//withLet(); // let não é possivel reatribuir valor fora do escopo da função

// const -> não da para reatribuir um valor
// const não garante imutabilidade total, pois ele consegue editar objetos e arrays
//const c = 10;
//c = 20;

function sum(a, b) {
  return a + b;
}

console.log(sum(2, 3));

const sum2 = function (a, b) {
  return a + b;
};

console.log(sum2(2, 3));

const sum3 = (a, b) => {
  return a + b;
};

console.log(sum3(2, 3));

const sum4 = (a, b) => a + b;

console.log(sum4(2, 3));

// template literals

const name = 'João';
const surname = 'Campista';
const text1 = 'Meu nome é ' + name + ' ' + surname;
const text2 = `Meu nome é ${name} ${surname}`;

console.log(text1);
console.log(text2);

// desse jeito o javascript retorna NaN, pois nao foi passado a variavel b
const sum5 = (a, b) => a + b;
console.log(sum5(2));

// default parameters assim passamos um valor padrão para caso não seja informado um valor na função
// só é possivel passar no ultimo parametro, não funciona se passar no parametro inicial

const sum6 = (a, b = 10) => a + b;
console.log(sum6(2));
