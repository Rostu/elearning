var dbhandler = require('./dbhandler');
var navigation = require('./navbar');

exports.ubung = function(req, res){
    req.session.lastpage = '';
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
exports.get_TEST = function(req, res){
    res.render('TEST');
};
exports.deleteub = function(req, res){
    dbhandler.delUb(req.params.id);
    res.redirect('/ubshow');
};
exports.get_china_start = function(req, res){
    req.session.lastpage = 'china_start';
    res.render('china_start');
};
exports.get_china_task1 = function(req, res){
    req.session.lastpage = 'china_task1';
    res.render('china_task1');
};

exports.get_china_task2 = function(req, res){
    req.session.lastpage = 'china_task2';
    res.render('china_task2');
};
exports.get_china_task3 = function(req, res){
    req.session.lastpage = 'china_task3';
    res.render('china_task3');
};
exports.get_glueck_start = function(req, res){
    req.session.lastpage = 'glueck_start';
    res.render('glueck_start');
};

exports.get_glueck_task1a = function(req, res){
    req.session.lastpage = 'glueck_task1a';
    res.render('glueck_task1a');
};

exports.get_glueck_task1b = function(req, res){
    req.session.lastpage = 'glueck_task1b';
    res.render('glueck_task1b');
};

exports.get_glueck_task3 = function(req, res){
    req.session.lastpage = 'glueck_task3';
    res.render('glueck_task3');
};

exports.get_glueck_task2 = function(req, res){
    req.session.lastpage = 'glueck_task2';
    res.render('glueck_task2');
};

exports.get_glueck_task4 = function(req, res){
    req.session.lastpage = 'glueck_task4';
    res.render('glueck_task4');
};

exports.get_handy_start = function(req,res) {
    req.session.lastpage = 'handy_start';
    res.render('handy_start')
};

exports.get_handy_text = function(req, res){
    req.session.lastpage = 'handy_text';
    res.render('handy_text');
};
exports.get_handy_task1 = function(req, res){
    req.session.lastpage = 'handy_task1';
    res.render('handy_task1');
};
exports.get_handy_task2 = function(req, res){
    req.session.lastpage = 'handy_task2';
    res.render('handy_task2');
};

exports.get_ersti_start = function(req, res) {
    req.session.lastpage = 'ersti_start';
    res.render('ersti_start');
};

exports.get_ersti_task1 = function(req, res){
    req.session.lastpage = 'ersti_task1';
    res.render('ersti_task1');
};

exports.get_ersti_task2 = function(req, res){
    req.session.lastpage = 'ersti_task2';
    res.render('ersti_task2');
};
exports.get_ersti_task2b = function(req, res){
    req.session.lastpage = 'ersti_task2b';
    res.render('ersti_task2b');
};
exports.get_ersti_task2c = function(req, res){
    req.session.lastpage = 'ersti_task2c';
    res.render('ersti_task2c');
};
exports.get_ersti_task2d = function(req, res){
    req.session.lastpage = 'ersti_task2d';
    res.render('ersti_task2d');
};
exports.get_ersti_task3 = function(req, res){
    req.session.lastpage = 'ersti_task3';
    res.render('ersti_task3');
};
exports.get_ersti_task3b = function(req, res){
    req.session.lastpage = 'ersti_task3b';
    res.render('ersti_task3b');
};
exports.get_ersti_task3c = function(req, res){
    req.session.lastpage = 'ersti_task3c';
    res.render('ersti_task3c');
};
exports.get_ersti_task4 = function(req, res){
    req.session.lastpage = 'ersti_task4';
    res.render('ersti_task4');
};
exports.get_ersti_end = function(req,res) {
    req.session.lastpage = 'ersti_end';
    res.render('ersti_end');
};
exports.get_veggieday_start = function(req, res){
    req.session.lastpage = 'veggieday_start';
    res.render('veggieday_start');
};
exports.get_veggieday_task1 = function(req, res){
    req.session.lastpage = 'veggieday_task1';
    res.render('veggieday_task1');
};
exports.get_veggieday_task3 = function(req, res){
    req.session.lastpage = 'veggieday_task3';
    res.render('veggieday_task3');
};

exports.get_veggieday_multi = function(req, res){
    req.session.lastpage = 'veggieday_multi';
    res.render('veggieday_multi');
};
exports.get_veggieday_task5 = function(req, res){
    req.session.lastpage = 'veggieday_task5';
    res.render('veggieday_task5');
};
exports.get_veggieday_task4 = function(req, res){
    req.session.lastpage = 'veggieday_task4';
    res.render('veggieday_task4');
};

exports.get_wertewandel_start = function(req, res) {
    req.session.lastpage = 'wertewandel_start';
    res.render('wertewandel_start');
};
exports.get_wertewandel_task1 = function(req, res){
    req.session.lastpage = 'wertewandel_task1';
    res.render('wertewandel_task1');
};
exports.get_wertewandel_task2 = function(req, res){
    req.session.lastpage = 'wertewandel_task2';
    res.render('wertewandel_task2');
};
exports.get_wertewandel_task3 = function(req, res){
    req.session.lastpage = 'wertewandel_task3';
    res.render('wertewandel_task3');
};
exports.get_wertewandel_task4 = function(req, res){
    req.session.lastpage = 'wertewandel_task4';
    res.render('wertewandel_task4');
};
exports.get_generationen_start = function(req, res){
    req.session.lastpage = 'generationen_start';
    res.render('generationen_start');
};

exports.get_generationen_text = function(req, res){
    req.session.lastpage = 'generationen_text';
    res.render('generationen_text');
};

exports.get_generationen_task1 = function(req, res){
    req.session.lastpage = 'generationen_task1';
    res.render('generationen_task1');
};

exports.get_generationen_task2 = function(req, res){
    req.session.lastpage = 'generationen_task2';
    res.render('generationen_task2');
};

exports.get_generationen_task3 = function(req, res){
    req.session.lastpage = 'generationen_task3';
    res.render('generationen_task3');
};
exports.get_zukunft_start = function(req, res){
    req.session.lastpage = 'zukunft_start';
    res.render('zukunft_start');
};
exports.get_zukunft_task1 = function(req, res){
    req.session.lastpage = 'zukunft_task1';
    res.render('zukunft_task1', {
        maxPoints: 0 ,
        maxfaults: 0});
};
exports.get_zukunft_task2 = function(req, res){
    req.session.lastpage = 'zukunft_task2';
    res.render('zukunft_task2');
};
exports.get_zukunft_task3 = function(req, res){
    req.session.lastpage = 'zukunft_task3';
    res.render('zukunft_task3');
};
exports.get_zukunft_task4 = function(req, res){
    req.session.lastpage = 'zukunft_task4';
    res.render('zukunft_task4');
};

exports.get_zukunft_task5 = function(req, res){
    req.session.lastpage = 'zukunft_task5';
    res.render('zukunft_task5');
};

exports.get_next = function(req, res){
    var nextsite = navigation.getnext(req.session.lastpage)
    req.session.lastpage = nextsite;
    res.redirect(nextsite);
};
exports.get_last = function(req, res){
    var lastsite = navigation.getlast(req.session.lastpage)
    req.session.lastpage = lastsite;
    res.redirect(lastsite);
};

exports.get_uindex = function(req, res){
    var indexsite = navigation.getindex(req.session.lastpage)
    req.session.lastpage = indexsite;
    res.redirect(indexsite);
};