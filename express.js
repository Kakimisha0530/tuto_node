/*
//module de creation du serveur http
var http = require("http");
//module de recuperation de la page demandée
var url = require("url");
//module de recuperation de paramètres d'url
var querystring = require('querystring');
//Module d'emission d'evenements
//on utilise emit("event_name", ...parametres) pour emettre des evenements
var EventEmitter = require('events').EventEmitter;
*/

//Module express pour gerer les routes et les templates
var express = require('express');

var app = express();

app.get('/', function(req, res) {
    res.setHeader('Content-Type','text/plain');
    res.end('Vous êtes à l\'accueil, que puis-je pour vous ?');
}).get('/sous-sol', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
}).get('/etage/2/chambre', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes à la chambre de l\'étage n°' + req.params.etagenum);
}).get('/compteur/:nombre', function(req, res) {
    var noms = ['Robert', 'Jacques', 'David'];
    res.render('compteur.ejs', {compteur: req.params.nombre, noms: noms});
}).use(function(req, res, next){
    res.setHeader('Content-Type','text/plain');
    res.status(400).send('Page introuvable !');
});

app.listen(8080);