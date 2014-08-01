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

exports.get_china2 = function(req, res){
    res.render('china2');
};
exports.get_china3 = function(req, res){
    res.render('china3');
};
exports.get_glueck = function(req, res){
    res.render('glueck');
};

exports.get_glueck_gedicht = function(req, res){
    res.render('glueck_gedicht');
};

exports.get_handy = function(req, res){
    res.render('handy');
};

exports.get_ersti = function(req, res){
    res.render('ersti_task1');
};

exports.get_ersti_task1 = function(req, res){
    res.render('ersti_task1');
};

exports.get_ersti_task2 = function(req, res){
    res.render('ersti_task2');
};
exports.get_ersti_task2b = function(req, res){
    res.render('ersti_task2b');
};
exports.get_ersti_task2c = function(req, res){
    res.render('ersti_task2c');
};
exports.get_ersti_task2d = function(req, res){
    res.render('ersti_task2d');
};
exports.get_ersti_task3 = function(req, res){
    res.render('ersti_task3');
};
exports.get_ersti_task3b = function(req, res){
    res.render('ersti_task3b');
};
exports.get_ersti_task3c = function(req, res){
    res.render('ersti_task3c');
};
exports.get_ersti_task4 = function(req, res){
    res.render('ersti_task4');
};
exports.get_veggieday_inhalt = function(req, res){
    res.render('veggieday_inhalt');
};
exports.get_veggieday = function(req, res){
    res.render('veggieday');
};
exports.get_veggieday_met = function(req, res){
    res.render('veggieday_met');
};

exports.get_veggieday_multi = function(req, res){
    res.render('veggieday_multi');
};
exports.get_veggieday_u5 = function(req, res){
    res.render('veggieday_u5');
};
exports.get_veggieday_drag = function(req, res){
    res.render('veggieday_drag');
};
exports.get_wertewandel = function(req, res){
    res.render('wertewandel');
};

exports.get_generationen = function(req, res){
    res.render('generationen');
};

exports.get_generationen2 = function(req, res){
    res.render('generationen2');
};
exports.get_zukunft = function(req, res){
    res.render('zukunft');
};
exports.get_zukunft_task1 = function(req, res){
    res.render('zukunft_task1');
};
exports.get_zukunft_task2 = function(req, res){
    res.render('zukunft_task2');
};
exports.get_zukunft_task3 = function(req, res){
    res.render('zukunft_task3');
};
exports.get_zukunft_task4 = function(req, res){
    res.render('zukunft_task4');
};