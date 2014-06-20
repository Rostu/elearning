

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.get_session = function(req, res, next){
    res.locals.session = req.session;
    next();
};

exports.dbhandler = require("./dbhandler");

exports.get_testing = function(req, res){
    res.render('testing');
}