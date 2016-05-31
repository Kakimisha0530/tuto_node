var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser');

var app = express();
var EventList = require('events').EventEmitter;

/* On utilise les sessions */
app.use(session({secret: 'my_session_todo'}));
// these statements config express to use these modules, and only need to be run once
app.use(bodyParser.json());         
app.use(bodyParser.urlencoded({ extended: true }));

/* On utilise les sessions */
/* S'il n'y a pas de todolist dans la session,
on en crée une vide sous forme d'array avant la suite */
app.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})
.get('/', function(req, res) {
    res.render('todo.ejs', {todolist:req.session.todolist});
})
.post('/ajouter', function(req, res) {
    if (req.body.todoval != '') {
        req.session.todolist.push(req.body.todoval);
    }
    res.redirect("/");
})
.get('/supprimer/:index', function(req, res) {
    if (req.params.index != '') {
        req.session.todolist.splice(req.params.index , 1);
    }
    res.redirect("/");
})
.use(function(req, res, next){
    res.setHeader('Content-Type','text/plain');
    res.status(400).send('Page introuvable !');
});

app.listen(8080);