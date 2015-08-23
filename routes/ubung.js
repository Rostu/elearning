var dbhandler = require('./../shared/routes/dbhandler');
var navigation = require('./navbar');
var pointhandler = require('./pointshandler');

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
exports.get_TEST = function(req, res){
    res.render('TEST');
};
exports.deleteub = function(req, res){
    dbhandler.delUb(req.params.id);
    res.redirect('/ubshow');
};
exports.get_china_start = function(req, res){
    res.render('china_start');
};
exports.get_glueck_memory = function(req, res){
    res.render('glueck_Memory');
};

exports.get_glueck_Textverstehen_Wortspirale = function(req, res){
    res.render('glueck_Textverstehen_Wortspirale');
};

exports.get_china_Textverstehen_Wortfeld_Studium = function(req, res){
    res.render('china_Textverstehen_Wortfeld_Studium');
};
exports.get_china_Wortschatz_ordnen = function(req, res){
    res.render('china_Wortschatz_ordnen');
};
exports.get_china_Textverstehen_Redewiedergabe = function(req, res){
    res.render('china_Textverstehen_Redewiedergabe');
};

exports.get_energie_Wortfeld_Solarantrieb = function(req, res){
    res.render('energie_Wortfeld_Solarantrieb');
};
exports.get_energie_Wortfeld_Solarantrieb_A = function(req, res){
    res.render('energie_Wortfeld_Solarantrieb_A');
};

exports.get_energie_start = function(req, res){
    res.render('energie_start');
};

exports.get_glueck_start = function(req, res){
    res.render('glueck_start');
};

exports.get_glueck_Textproduktion_Antonyme_A = function(req, res){
    res.render('glueck_Textproduktion_Antonyme_A');
};

exports.get_glueck_Textproduktion_Antonyme_B = function(req, res) {
    res.render('glueck_Textproduktion_Antonyme_B');
};
exports.get_glueck_Kreuzwortraetsel = function(req, res){
    res.render('glueck_Kreuzwortraetsel');
};

exports.get_glueck_Textverstehen_Zeitangaben = function(req, res){
    res.render('glueck_Textverstehen_Zeitangaben');
};

exports.get_glueck_Zeitstrahl = function(req, res){
    res.render('glueck_Zeitstrahl.jade');
};

exports.get_glueck_video = function(req, res){
    res.render('glueck_video.jade');
};
exports.get_glueck_video_zuordnen = function(req, res){
    res.render('glueck_video_zuordnen.jade');
};

exports.get_glueck_video_kleeblatt = function(req, res){
    res.render('glueck_video_kleeblatt.jade');
}

exports.get_glueck_video_paraphrase = function(req, res){
    res.render('glueck_video_paraphrase.jade');
}

exports.get_glueck_Textverstehen_Redensarten = function(req, res){
    res.render('glueck_Textverstehen_Redensarten');
};

exports.get_glueck_silbermond = function(req, res){
    res.render('glueck_silbermond');
};

exports.get_handy_start = function(req,res) {
    res.render('handy_start')
};

exports.get_handy_text = function(req, res){
    res.render('handy_text');
};
exports.get_handy_task1 = function(req, res){
    res.render('handy_task1');
};
exports.get_handy_task2 = function(req, res){
    res.render('handy_task2');
};

exports.get_ersti_start = function(req, res) {
    res.render('ersti_start');
};

exports.get_ersti_Textverstehen_emotionale_Woerter = function(req, res){
    res.render('ersti_Textverstehen_emotionale_Woerter');
};
exports.get_ersti_Textverstehen_Wortfeld_Universitaet_A = function(req, res){
    res.render('ersti_Textverstehen_Wortfeld_Universitaet_A');
};
exports.get_ersti_Textverstehen_Wortfeld_Universitaet_B = function(req, res){
    res.render('ersti_Textverstehen_Wortfeld_Universitaet_B');
};
exports.get_ersti_Textverstehen_Wortfeld_Universitaet_C = function(req, res){
    res.render('ersti_Textverstehen_Wortfeld_Universitaet_C');
};
exports.get_ersti_Wortschatz_ordnen_A = function(req, res){
    res.render('ersti_Wortschatz_ordnen_A');
};
exports.get_ersti_Wortschatz_ordnen_B = function(req, res){
    res.render('ersti_Wortschatz_ordnen_B');
};
exports.get_ersti_Wortschatz_ordnen_C = function(req, res){
    res.render('ersti_Wortschatz_ordnen_C');
};
exports.get_ersti_Wortschatz_erweitern = function(req, res){
    res.render('ersti_Wortschatz_erweitern');
};
exports.get_ersti_task4 = function(req, res){
    res.render('ersti_task4');
};
exports.get_ersti_end = function(req,res) {
    res.render('ersti_end');
};
exports.get_veggieday_start = function(req, res){
    res.render('veggieday_start');
};
exports.get_veggieday_Textverstehen_Schluesselwoerter_in_Boulevardzeitungen = function(req, res){
    res.render('veggieday_Textverstehen_Schluesselwoerter_in_Boulevardzeitungen');
};
exports.get_veggieday_Textverstehen_Schluesselwoerter_in_Fachtexten_1 = function(req, res){
    res.render('veggieday_Textverstehen_Schluesselwoerter_in_Fachtexten_1');
};
exports.get_veggieday_Textverstehen_Schluesselwoerter_in_Fachtexten_2 = function(req, res){
    res.render('veggieday_Textverstehen_Schluesselwoerter_in_Fachtexten_2');
};
exports.get_wertewandel_start = function(req, res) {
    res.render('wertewandel_start');
};
exports.get_wertewandel_Textverstehen_Schluesselwoerter = function(req, res){
    res.render('wertewandel_Textverstehen_Schluesselwoerter');
};
exports.get_wertewandel_Wortbedeutung_verstehen = function(req, res){
    res.render('wertewandel_Wortbedeutung_verstehen');
};
exports.get_wertewandel_Textverstehen_Kernaussagen = function(req, res){
    res.render('wertewandel_Textverstehen_Kernaussagen');
};
exports.get_wertewandel_Textproduktion_Statistische_Angaben = function(req, res){
    res.render('wertewandel_Textproduktion_Statistische_Angaben');
};
exports.get_generationen_start = function(req, res){
    res.render('generationen_start');
};

exports.get_generationen_text = function(req, res){
    res.render('generationen_text');
};

exports.get_generationen_Textverstehen_Komposita = function(req, res){
    res.render('generationen_Textverstehen_Komposita');
};
exports.get_anleitung = function(req, res){
    res.render('anleitung');
};
exports.get_generationen_Wortschatz_ordnen = function(req, res){
    res.render('generationen_Wortschatz_ordnen');
};

exports.get_generationen_Textverstehen_Bedeutungserschliessung = function(req, res){
    res.render('generationen_Textverstehen_Bedeutungserschliessung');
};
exports.get_zukunft_start = function(req, res){
    res.render('zukunft_start',{last:'zukunft_start'});
};

exports.get_zukunft_start2 = function(req, res){
    res.render('zukunft_start2',{last:'zukunft_start2'});
};

exports.get_zukunft_Textverstehen_Wortfeld_Technik = function(req, res){
    res.render('zukunft_Textverstehen_Wortfeld_Technik');
};
exports.get_zukunft_Wortschatz_ordnen = function(req, res){
    res.render('zukunft_Wortschatz_ordnen');
};
exports.get_zukunft_Wortschatzerweiterung_fest_Wortverbindungen = function(req, res){
    res.render('zukunft_Wortschatzerweiterung_fest_Wortverbindungen');
};
exports.get_zukunft_Textproduktion = function(req, res){
    res.render('zukunft_Textproduktion');
};
exports.get_zukunft_Kreuzwortraetsel = function(req, res){
    res.render('zukunft_Kreuzwortraetsel');
};

exports.get_testy = function(req, res){
    res.render('testy');
};

exports.get_next = function(req, res){
    var lastsite = req.param("last");
    lastsite = lastsite.replace("/","");
    var nextsite = navigation.getnext(lastsite);
    res.locals.last = nextsite;
    res.render(nextsite);
};
exports.get_last = function(req, res){
    var lastsite = req.param("last");
    lastsite = lastsite.replace("/","");
    var lastsite = navigation.getlast(lastsite);
    res.locals.last = lastsite;
    res.render(lastsite);
};

exports.get_uindex = function(req, res){
    var lastsite = req.param("last");
    lastsite = lastsite.replace("/","");
    var indexsite = navigation.getindex(lastsite);
    res.locals.last = indexsite;
    res.render(indexsite);
};