var wiki = require('de-wiktionary');



exports.start = function(req, res){
    req.session.lastpage = '';
    res.render('start');
};

exports.get_apitest = function(req, res){
    res.render('apitest');
};

exports.get_wiktionary = function(req, res){
    var query = req.query;
    var qq = query.query;
    console.log(query.query);
    wiki.get_infos(qq, function(err,data){
        res.send(data);
    });
    //console.log(query.query);
    //res.send('apitest');
};
