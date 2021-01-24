'use strict'

console.log("hola mundo con node js");

// para ejecutar el srchivo lo hago desde la consola poniendo:
// node .\calculadora.js

var params = process.argv.slice(2);     //para poder pasar argumentos. en params se almacenaran como un vector todos los parametros que yo pase al llamar al documento:     node .\calculadora.js 1 2 esto devolverá: ['1', '2']

console.log(params);

var numero1 = parseFloat(params[0]);
var numero2 = parseFloat(params[1]);

var resultado = `
La suma es ${numero1 + numero2}
La resta es ${numero1 - numero2}
`

console.log(resultado);