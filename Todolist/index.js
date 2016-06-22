var http = require('http');
var fs = require('fs');
var todoList = [];

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// On écoute l'événement "connection"
io.sockets.on('connection', function (socket) {
    
    // Quand un client se connecte, on lui affiche la dernière todoList
    socket.emit('update', todoList);
    
    // Quand un client ajoute une nouvelle tâche , on la rajoute à la todoList 
    //et on renvoi la nouvelle todoList aux utilisateurs
    socket.on('ajout', function(todo) {
        todoList.push(todo);
        socket.emit('update', todoList);
        socket.broadcast.emit('update', todoList);
    });
    
    // Quand un client supprime une tâche , on la supprime de la todoList 
    //et on renvoi la nouvelle todoList aux utilisateurs
    socket.on('suppression', function(index) {
        todoList.splice(index , 1);
        socket.emit('update', todoList);
        socket.broadcast.emit('update', todoList);
    });
    
    // Quand un client change le status d'une tâche , on la modifie dans la todoList 
    //et on renvoi la nouvelle todoList aux utilisateurs
    socket.on('modification', function(index) {
        todoList[index].status = (parseInt(todoList[index].status) + 1) % 2;
        socket.emit('update', todoList);
        socket.broadcast.emit('update', todoList);
    });
});


server.listen(12345);