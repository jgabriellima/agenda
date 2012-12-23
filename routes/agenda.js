
/*
 * GET users listing.
 */
db = GLOBAL.db;
collection = GLOBAL.COLLECTION;
io = GLOBAL.io;
socket = GLOBAL.socket;

exports.list = function(req, res){
    //    db.query('select * from agenda' ,
    //        function(err, result, fields) {
    //            console.log(result);
    //            if (err) 
    //                throw err;
    //            else {
    //                res.send(result);
    //            }
    //        });
    db.agendas.find(function(err, doc) {
        if (err) {
            throw err;
        }else{
            console.log(doc);
            res.send(doc);
        }
    });
};

exports.inserir = function(req, res){
    //    var Contato = req.body;
    //    console.log(Contato);
    //    db.query('INSERT INTO agenda (nome,email,telefone,celular,website) VALUES("'+Contato.nome+'","'+Contato.email+'","'+Contato.telefone+'","'+Contato.celular+'","'+Contato.website+'")',
    //        function(err, result, fields) {
    //            if (err) 
    //                throw err;
    //            else {
    //                socket.broadcast.emit('updateagenda', Contato);
    //                io.sockets.emit('updateagenda', Contato);
    //                res.send();
    //            }
    //        });
    var Contato = req.body;
    console.log(Contato);
    db.agendas.save(Contato,function(err, doc) {
        if (err) {
            throw err;
        }else{
            console.log(doc);
            socket.broadcast.emit('updateagenda', Contato);
            io.sockets.emit('updateagenda', Contato);
            res.send();
        }
    });
};

