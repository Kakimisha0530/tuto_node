var express = require('express');
var morgan = require('morgan'); // Charge le middleware de logging

var app = express();

app.use(morgan('combined')) // Active le middleware de logging
.use(express.static(__dirname + '/public')) // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)
.use(function(req, res){ // Répond enfin
    res.send('Hello');
});

app.listen(8080);