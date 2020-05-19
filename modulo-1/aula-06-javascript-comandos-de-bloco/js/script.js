console.log('olá joão');

var title = document.querySelector('h1');
title.textContent = 'Modificado por João';

// operador Switch

const dayOfWeek = 5;

switch (dayOfWeek) {
  case 1:
    console.log('Segunda-Feira');
    break;
  case 2:
    console.log('Terça-Feira');
    break;
  case 3:
    console.log('Quarta-Feira');
    break;
  case 4:
    console.log('Quinta-Feira');
    break;
  case 5:
    console.log('Sexta-Feira');
    break;
  case 6:
    console.log('Sábado');
    break;
  case 7:
    console.log('Domingo');
    break;
}

// Operador ternário

var totalSales = 1000;

/**
 * Regra do bônus
 * Vendas maiores ou iguais a 600 reais ==> 10%
 * Vendas menores que 600 reais ==> 5%
 */

var bonus = totalSales >= 600 ? totalSales * 0.1 : totalSales * 0.05;

// Transformando o código acima para if/else

if (totalSales >= 600) {
  bonus = totalSales * 0.1;
} else {
  bonus = totalSales * 0.05;
}

console.log(bonus);

/**
 * Realizando o somatório de números de 1 a 100 com while, do.. wile e for
 */

var sum = 0;
var i = 1;

// No while o teste é feito no inicio do bloco
while (i <= 100) {
  sum += i;
  i++;
}

i = 1;
sum = 0;

/**
 * No do.. while o teste da é feito no final do bloco
 */

do {
  sum += i;
  i++;
} while (i <= 100);

sum = 0;

/**
 * O for é mais organizado pois, em uma linha inicializa a variável de
 * controle, define a proposição e o incremento. Assim a lógica fica
 * isolada e mais fácil de ser entendida
 */

for (sum = 0; sum <= 100; sum++) {}

// funções

/**
 *@param {Number} totalSales
 *@param {Number} reference
 *@param {Number} bestBonus
 *@param {Number} worstBonus
 */

function calculateBonus(totalSales, reference, bestBonus, worstBonus) {
  var bonus =
    totalSales >= reference ? totalSales * bestBonus : totalSales * worstBonus;

  return bonus;
}

console.log(calculateBonus(1000, 600, 0.1, 0.05));
console.log(calculateBonus(500, 600, 0.1, 0.05));
