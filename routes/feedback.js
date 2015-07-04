var dbh = require('./dbhandler');

exports.get_feedback = function(req, res){
    var lastsite = req.param("feed");
    lastsite = lastsite.replace("/","");
    res.render('feedback',{feed:lastsite});
};