var wiki = require('de-wiktionary');
var wortschatz = require('wl-api');
var dbh = require('./../shared/routes/dbhandler');

exports.get_apitest = function(req, res){
    req.session.lastpage = '';
    res.render('apitest');
};

exports.get_wiktionary = function(req, res){
    var query = req.query.query;
    wiki.get_infos(query, function(err,data){
        res.send(data);
    });
};

exports.get_baseform = function(req, res){
    var query = req.query.query;
    wortschatz.baseform(query,function(err,data){
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }
    });
};

exports.get_frequencies = function(req, res){
    var query = req.query.query;
    wortschatz.frequencies(query,function(err,data){
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }
    });
};

exports.get_domain = function(req, res){
    var query = req.query.query;
    wortschatz.domain(query,function(err,data){
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }
    });
};
exports.get_wordforms = function(req, res){
    var query = req.query.query;
    var limit = req.query.limit;
    wortschatz.wordforms(query,limit,function(err,data){
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }
    });
};
exports.get_thesaurus = function(req, res){
    var query = req.query.query;
    var limit = req.query.limit;
    wortschatz.thesaurus(query,limit,function(err,data){
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }
    });
};
exports.get_synonyms = function(req, res){
    var query = req.query.query;
    var limit = req.query.limit;
    wortschatz.thesaurus(query,limit,function(err,data){
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }
    });
};
exports.get_sentences = function(req, res){
    var query = req.query.query;
    var limit = req.query.limit;

    wortschatz.sentences(query,limit,function(err,data){
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }
    });
};
exports.get_left_neighbours = function(req, res){
    var query = req.query.query;
    var limit = req.query.limit;
    res.send(data);
};
exports.get_right_neighbours = function(req, res){
    var query = req.query.query;
    var limit = req.query.limit;
    res.send(data);
};
exports.get_similarity = function(req, res){
    var query = req.query.query;
    var limit = req.query.limit;
    res.send(data);
};
exports.get_right_collocation = function(req, res){
    var query = req.query.query;
    var limit = req.query.limit;
    var tag = req.query.tag;
    res.send(data);
};
exports.get_left_collocation = function(req, res){
    var query = req.query.query;
    var limit = req.query.limit;
    var tag = req.query.tag;
    res.send(data);
};
exports.get_cooccurrences = function(req, res){
    var query = req.query.query;
    var limit = req.query.limit;
    var sig = req.query.sig;
    res.send(data);
};

exports.wordinfo = function(req, res){
    var query = req.query.query;
    dbh.finddml(query,function(err,data){
        if(err){
            res.send(err);
        }else{
            res.send(data);
        }
    });
};