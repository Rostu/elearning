var dbh = require('./../shared/routes/dbhandler');
var http = require('http');


exports.get_feedback = function(req, res){
    var lastsite = req.param("feed");
    lastsite = lastsite.replace("/","");
    res.render('feedback',{feed:lastsite});
};

exports.new_feedback = function(req, res){
    var seite = req.body.seite;
    var design = req.body.design;
    var aufgabe = req.body.aufgabe;
    var zusatz = req.body.zusatz;
    var feedback = req.body.feedback;
    var anmerkung = req.body.anmerkung;
    console.log(req.body.seite);


    //even if classic codeinjection is not possible like in SQL-Databases we are cutting some chars just because :-)
    //for mongodb important to check if design, aufgabe and funtion are strings to prevent injection of json objects
    if (typeof anmerkung === "string") {
        anmerkung = anmerkung.replace(/[-+;:_\(\)!"§$%&\[\]\{\}#*']/g, '');
        dbh.save_feedback(seite,design,aufgabe,zusatz,feedback,anmerkung);
    }
    if(seite){
        res.render(seite);
    }else{
        res.render('showfeedback');
    }
}

exports.show_feedback = function(req, res){
    res.render('showfeedback');
};

exports.get_feedback_items = function(req, res){
    dbh.getfeedback(function(err,item){
        if(err){console.log(err);
        }else
        res.send(item);
    });
};
exports.deletefeedback = function(req, res){
    dbh.delfeedback(req.params.id);
    res.render('showfeedback');
};




