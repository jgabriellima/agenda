
/**
 * Module dependencies.
 */

var express = require('express')
, routes = require('./routes')
, agenda = require('./routes/agenda')
, index = require('./routes/index')
, http = require('http')
, io = require('socket.io')
, mongojs = require('mongojs')
, path = require('path');

var app = express();

GLOBAL.app = app;

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session());
    app.use(app.router);
    app.use(require('stylus').middleware(__dirname + '/public'));
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});
app.configure('production', function(){
    app.use(express.errorHandler());
});
app.get('/', routes.index);
app.get('/agenda', agenda.list);
app.post('/inserir', agenda.inserir);
app.get('/lista', agenda.list);


server = http.createServer(app);
server.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

io = io.listen(server);
GLOBAL.io = io;

io.sockets.on('connection', function (socket) {
    GLOBAL.socket = socket;
});

init = function(){
    var DATABASE = 'mongodb://useragenda:1234567890@ds045757.mongolab.com:45757/agendateste';
    if(db == null){
        var databaseUrl = DATABASE; // "username:password@example.com/mydb"
        var collections = ["agendas"]
        db = mongojs.connect(databaseUrl, collections);
        GLOBAL.db = db;
        console.log('iniciou banco');
    }
}
init();
//init = function(){
//    var HOST = 'localhost';
//    var PORT = 3306;
//    var MYSQL_USER = 'root';
//    var MYSQL_PASS = '';
//    var DATABASE = 'agendateste';
//    var TABLE = 'agenda';
//
//    if(db == null){
//        db = mysql.createConnection({
//            host: HOST,
//            port: PORT,
//            user: MYSQL_USER,
//            password: MYSQL_PASS
//        });
//    }
//    db.query('use ' + DATABASE);
//    GLOBAL.db = db;
//    console.log('iniciou banco');
//}
//init();