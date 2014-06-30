var dbhandler = require('./dbhandler');

exports.ubung = function(req, res){
    res.render('ubung');
    //dbhandler.getub(function (ubs) {res.render('ubung', {'ubs': ubs[1]});});
};

exports.neu = function(req, res){
    res.render('neuanlegen');
};

exports.createUebung = function(req, res){
    var satz = req.body.inhalt.split("|");

    dbhandler.savenew(req.body.typ, satz, req.body.name);
    res.redirect('/ubshow');
};

exports.ubshow = function(req, res){
    dbhandler.getub(function (ubs) {res.render('ubshow', {'ubs': ubs});});
};

exports.deleteub = function(req, res){
    dbhandler.delUb(req.params.id);
    res.redirect('/ubshow');
};

exports.get_china = function(req, res){
    res.render('china');
};
exports.get_glueck = function(req, res){
    res.render('glueck');
};
exports.get_handy = function(req, res){
    res.render('handy');
};
exports.get_ersti = function(req, res){
    res.render('ersti');
};
exports.get_veggieday = function(req, res){
    res.render('veggieday');
};
exports.get_wertewandel = function(req, res){
    res.render('wertewandel');
};
exports.get_generationen = function(req, res){
    res.render('generationen');
};
exports.get_zukunft = function(req, res){
    res.render('zukunft');
};