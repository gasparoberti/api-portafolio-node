'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar archivos de rutas
var project_routes = require('./routes/project');

//middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//cors
app.use((req, res, next) => {
    //cuando se publique la web en vez de * debo poner la url permitida
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//rutas
app.use('/api', project_routes);


//rutas de ejemplos
// app.get('/', (req, res) => {
//     res.status(200).send(
//         "<h1>Página de inicio</h2>"
//     );
// });

// app.get('/test', (req, res) => {
//     res.status(200).send({
//         message: "Hola Mundo desde la API de NodeJS."
//     });
// });

// app.post('/test/:id', (req, res) => {
//     console.log(req.body.nombre);   //parametro que envío por post en el body
//     console.log(req.query.web);     //parametro que envío por get en la url
//     console.log(req.params.id);     //parametro en la ruta

    // haciendo un post con postman con esta ruta, en la consola podré ver el nombre, la web y el id del request
    // http://localhost:3700/test/88?web=www.laweb.com.ar

//     Juan
// www.laweb.com.ar
// 88

//     res.status(200).send({
//         message: "Hola Mundo desde la API de NodeJS."
//     });
// });

//exports
module.exports = app;

