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
exports.get_china_task1 = function(req, res){
    res.render('china_task1');
};

exports.get_china_task2 = function(req, res){
    res.render('china_task2');
};
exports.get_china_task3 = function(req, res){
    res.render('china_task3');
};
exports.get_glueck_start = function(req, res){
    res.render('glueck_start');
};

exports.get_glueck_task1a = function(req, res){
    res.render('glueck_task1a');
};

exports.get_glueck_task1b = function(req, res){
    res.render('glueck_task1b');
};

exports.get_glueck_task3 = function(req, res){
    res.render('glueck_task3');
};

exports.get_glueck_task2 = function(req, res){
    res.render('glueck_task2');
};

exports.get_glueck_task4 = function(req, res){
    res.render('glueck_task4');
};

exports.get_handy_start = function(req,res) {
    res.render('handy_start')
}
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
}
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
exports.get_ersti_end = function(req,res) {
    res.render('ersti_end');
};
exports.get_veggieday_start = function(req, res){
    res.render('veggieday_start');
};
exports.get_veggieday_task1 = function(req, res){
    res.render('veggieday_task1');
};
exports.get_veggieday_task3 = function(req, res){
    res.render('veggieday_task3');
};

exports.get_veggieday_multi = function(req, res){
    res.render('veggieday_multi');1
};
exports.get_veggieday_task5 = function(req, res){
    res.render('veggieday_task5');
};
exports.get_veggieday_task4 = function(req, res){
    res.render('veggieday_task4');
};

exports.get_wertewandel_start = function(req, res) {
    res.render('wertewandel_start');
}
exports.get_wertewandel_task1 = function(req, res){
    res.render('wertewandel_task1');
};
exports.get_wertewandel_task2 = function(req, res){
    res.render('wertewandel_task2');
};
exports.get_wertewandel_task3 = function(req, res){
    res.render('wertewandel_task3');
};
exports.get_wertewandel_task4 = function(req, res){
    res.render('wertewandel_task4');
};
exports.get_generationen_start = function(req, res){
    res.render('generationen_start');
}
exports.get_generationen_text = function(req, res){
    res.render('generationen_text');
};

exports.get_generationen_task1 = function(req, res){
    res.render('generationen_task1');
};

exports.get_generationen_task2 = function(req, res){
    res.render('generationen_task2');
};

exports.get_generationen_task3 = function(req, res){
    res.render('generationen_task3');
};
exports.get_zukunft_start = function(req, res){
    res.render('zukunft_start');
}
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

exports.get_zukunft_task5 = function(req, res){
    res.render('zukunft_task5');
};
