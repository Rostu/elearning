exports.start = function(req, res){
    req.session.lastpage = '';
    res.render('start');
};


