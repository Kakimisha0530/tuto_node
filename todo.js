var express = require('express');
var Session = require('cookie-session');

var app = express();
var EventList = require('events').EventEmitter;

app.get('/', function(req, res) {
    res.render('todo.ejs', {});
}).use(function(req, res, next){
    res.setHeader('Content-Type','text/plain');
    res.status(400).send('Page introuvable !');
});

app.listen(8080);