exports.get_imp = function(req, res){
    req.session.lastpage = '';
    res.render('impressum');
};