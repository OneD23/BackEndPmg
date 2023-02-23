'use strict'

var express = require("express")
var bodyParse = require("body-parser")
var UserRoutes = require('./Routes/Usuarios');
const { userInfo } = require("os");

var app = express();

// Archivo de rutas 


//middlewares
app.use(bodyParse.urlencoded({extended:false}))
app.use(bodyParse.json())

//cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Rutas
app.use(UserRoutes)
//exports
module.exports = app;