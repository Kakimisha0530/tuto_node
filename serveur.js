//module de creation du serveur http
var http = require("http");
//module de recuperation de la page demandée
var url = require("url");
//module de recuperation de paramètres d'url
var querystring = require('querystring');
//Module d'emission d'evenements
//on utilise emit("event_name", ...parametres) pour emettre des evenements
var EventEmitter = require('events').EventEmitter;
//Module express pour gerer les routes et les templates
var express = require('express');

var serveur = http.createServer(function(req,res){
    var page = url.parse(req.url).pathname;
    var params = querystring.parse(url.parse(req.url).query);
    console.log(page);
    res.writeHead(200,{"content-type":"text/html"});
    if (page == '/') {
        res.write('Vous êtes à l\'accueil, que puis-je pour vous ?');
    }
    else if (page == '/sous-sol') {
        res.write('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
    }
    else if (page == '/etage/1/chambre') {
        res.write('Hé ho, c\'est privé ici !');
    }
    res.end();
});

serveur.listen(1234);
