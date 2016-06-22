var http = require('http');
var fs = require('fs');

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./views/chat.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le notifi aux autres clients et on l'enregistre
io.sockets.on('connection', function (socket) { 
      
    socket.on('nouvelle_connexion', function(params) {
        socket.broadcast.emit('nouvelle_connexion', params);
    });
    
    socket.on('deconnexion', function(params) {
        socket.broadcast.emit('deconnexion', params);
    });
    
    socket.on('message', function(params) {
        socket.broadcast.emit('message', params);
    });
});


server.listen(12345);