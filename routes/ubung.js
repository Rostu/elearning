var dbhandler = require('./dbhandler');
var navigation = require('./navbar');
var pointhandler = require('./pointshandler');

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
exports.get_china_Textverstehen_Wortfeld_Studium = function(req, res){
    req.session.lastpage = 'china_Textverstehen_Wortfeld_Studium';
    res.render('china_Textverstehen_Wortfeld_Studium');
};
exports.get_china_Wortschatz_ordnen = function(req, res){
    req.session.lastpage = 'china_Wortschatz_ordnen';
    res.render('china_Wortschatz_ordnen');
};
exports.get_china_Textverstehen_Redewiedergabe = function(req, res){
    req.session.lastpage = 'china_Textverstehen_Redewiedergabe';
    res.render('china_Textverstehen_Redewiedergabe');
};
exports.get_glueck_start = function(req, res){
    req.session.lastpage = 'glueck_start';
    res.render('glueck_start');
};

exports.get_glueck_Textproduktion_Antonyme_A = function(req, res){
    req.session.lastpage = 'glueck_Textproduktion_Antonyme_A';
    res.render('glueck_Textproduktion_Antonyme_A');
};

exports.get_glueck_Textproduktion_Antonyme_B = function(req, res){
    req.session.lastpage = 'glueck_Textproduktion_Antonyme_B';
    res.render('glueck_Textproduktion_Antonyme_B');
};

exports.get_glueck_Kreuzwortraetsel = function(req, res){
    req.session.lastpage = 'glueck_Kreuzwortraetsel';
    res.render('glueck_Kreuzwortraetsel');
};

exports.get_glueck_Textverstehen_Zeitangaben = function(req, res){
    req.session.lastpage = 'glueck_Textverstehen_Zeitangaben';
    res.render('glueck_Textverstehen_Zeitangaben');
};

exports.get_glueck_Textverstehen_Redensarten = function(req, res){
    req.session.lastpage = 'glueck_Textverstehen_Redensarten';
    res.render('glueck_Textverstehen_Redensarten');
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

exports.get_ersti_Textverstehen_emotionale_Woerter = function(req, res){
    req.session.lastpage = 'ersti_Textverstehen_emotionale_Woerter';
    res.render('ersti_Textverstehen_emotionale_Woerter');
};
exports.get_ersti_Textverstehen_Wortfeld_Universitaet_A = function(req, res){
    req.session.lastpage = 'ersti_Textverstehen_Wortfeld_Universitaet_A';
    res.render('ersti_Textverstehen_Wortfeld_Universitaet_A');
};
exports.get_ersti_Textverstehen_Wortfeld_Universitaet_B = function(req, res){
    req.session.lastpage = 'ersti_Textverstehen_Wortfeld_Universitaet_B';
    res.render('ersti_Textverstehen_Wortfeld_Universitaet_B');
};
exports.get_ersti_Textverstehen_Wortfeld_Universitaet_C = function(req, res){
    req.session.lastpage = 'ersti_Textverstehen_Wortfeld_Universitaet_C';
    res.render('ersti_Textverstehen_Wortfeld_Universitaet_C');
};
exports.get_ersti_Wortschatz_ordnen_A = function(req, res){
    req.session.lastpage = 'ersti_Wortschatz_ordnen_A';
    res.render('ersti_Wortschatz_ordnen_A');
};
exports.get_ersti_Wortschatz_ordnen_B = function(req, res){
    req.session.lastpage = 'ersti_Wortschatz_ordnen_B';
    res.render('ersti_Wortschatz_ordnen_B');
};
exports.get_ersti_Wortschatz_ordnen_C = function(req, res){
    req.session.lastpage = 'ersti_Wortschatz_ordnen_C';
    res.render('ersti_Wortschatz_ordnen_C');
};
exports.get_ersti_Wortschatz_erweitern = function(req, res){
    req.session.lastpage = 'ersti_Wortschatz_erweitern';
    res.render('ersti_Wortschatz_erweitern');
};
exports.get_ersti_end = function(req,res) {
    req.session.lastpage = 'ersti_end';
    res.render('ersti_end');
};
exports.get_veggieday_start = function(req, res){
    req.session.lastpage = 'veggieday_start';
    res.render('veggieday_start');
};
exports.get_veggieday_Textverstehen_Schluesselwoerter_in_Boulevardzeitungen = function(req, res){
    req.session.lastpage = 'veggieday_Textverstehen_Schluesselwoerter_in_Boulevardzeitungen';
    res.render('veggieday_Textverstehen_Schluesselwoerter_in_Boulevardzeitungen');
};
exports.get_veggieday_Textverstehen_Schluesselwoerter_in_Fachtexten_1 = function(req, res){
    req.session.lastpage = 'veggieday_Textverstehen_Schluesselwoerter_in_Fachtexten_1';
    res.render('veggieday_Textverstehen_Schluesselwoerter_in_Fachtexten_1');
};
exports.get_veggieday_Textverstehen_Schluesselwoerter_in_Fachtexten_2 = function(req, res){
    req.session.lastpage = 'veggieday_Textverstehen_Schluesselwoerter_in_Fachtexten_2';
    res.render('veggieday_Textverstehen_Schluesselwoerter_in_Fachtexten_2');
};
exports.get_wertewandel_start = function(req, res) {
    req.session.lastpage = 'wertewandel_start';
    res.render('wertewandel_start');
};
exports.get_wertewandel_Textverstehen_Schluesselwoerter = function(req, res){
    req.session.lastpage = 'wertewandel_Textverstehen_Schluesselwoerter';
    res.render('wertewandel_Textverstehen_Schluesselwoerter');
};
exports.get_wertewandel_Wortbedeutung_verstehen = function(req, res){
    req.session.lastpage = 'wertewandel_Wortbedeutung_verstehen';
    res.render('wertewandel_Wortbedeutung_verstehen');
};
exports.get_wertewandel_Textverstehen_Kernaussagen = function(req, res){
    req.session.lastpage = 'wertewandel_Textverstehen_Kernaussagen';
    res.render('wertewandel_Textverstehen_Kernaussagen');
};
exports.get_wertewandel_Textproduktion_Statistische_Angaben = function(req, res){
    req.session.lastpage = 'wertewandel_Textproduktion_Statistische_Angaben';
    res.render('wertewandel_Textproduktion_Statistische_Angaben');
};
exports.get_generationen_start = function(req, res){
    req.session.lastpage = 'generationen_start';
    res.render('generationen_start');
};

exports.get_generationen_text = function(req, res){
    req.session.lastpage = 'generationen_text';
    res.render('generationen_text');
};

exports.get_generationen_Textverstehen_Komposita = function(req, res){
    req.session.lastpage = 'generationen_Textverstehen_Komposita';
    res.render('generationen_Textverstehen_Komposita');
};

exports.get_generationen_Wortschatz_ordnen = function(req, res){
    req.session.lastpage = 'generationen_Wortschatz_ordnen';
    res.render('generationen_Wortschatz_ordnen');
};

exports.get_generationen_Textverstehen_Bedeutungserschliessung = function(req, res){
    req.session.lastpage = 'generationen_Textverstehen_Bedeutungserschliessung';
    res.render('generationen_Textverstehen_Bedeutungserschliessung');
};
exports.get_zukunft_start = function(req, res){
    req.session.lastpage = 'zukunft_start';

    res.render('zukunft_start',{title:'zukunft_start', maxpoints: 0,maxfaults: 0});
};
exports.get_zukunft_Textverstehen_Wortfeld_Technik = function(req, res){
    req.session.lastpage = 'zukunft_Textverstehen_Wortfeld_Technik';
    res.render('zukunft_Textverstehen_Wortfeld_Technik');
};
exports.get_zukunft_Wortschatz_ordnen = function(req, res){
    req.session.lastpage = 'zukunft_Wortschatz_ordnen';
    res.render('zukunft_Wortschatz_ordnen');
};
exports.get_zukunft_Wortschatzerweiterung_fest_Wortverbindungen = function(req, res){
    req.session.lastpage = 'zukunft_Wortschatzerweiterung_fest_Wortverbindungen';
    res.render('zukunft_Wortschatzerweiterung_fest_Wortverbindungen');
};
exports.get_zukunft_Textproduktion = function(req, res){
    req.session.lastpage = 'zukunft_Textproduktion';
    res.render('zukunft_Textproduktion');
};
exports.get_zukunft_Kreuzwortraetsel = function(req, res){
    req.session.lastpage = 'zukunft_Kreuzwortraetsel';
    res.render('zukunft_Kreuzwortraetsel');
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