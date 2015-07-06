var dbh = require('./dbhandler');


exports.get_feedback = function(req, res){
    var lastsite = req.param("feed");
    lastsite = lastsite.replace("/","");
    res.render('feedback',{feed:lastsite});
};

exports.new_feedback = function(req, res){
    var seite = req.body.seite;
    var design = req.body.design;
    var aufgabe = req.body.aufgabe;
    var funktion = req.body.funktion;
    //even if classic codeinjection is not possible like in SQL-Databases we are cutting some chars just because :-)
    //for mongodb important to check if design, aufgabe and funtion are strings to prevent injection of json objects
    if ((typeof design === "string") && (typeof aufgabe === "string")&&(typeof funktion === "string"))    {

        design = design.replace(/[-+;:_\(\)!"§$%&\[\]\{\}#*']/g, '');
        aufgabe = aufgabe.replace(/[-+;:_\(\)!"§$%&\[\]\{\}#*']/g, '');
        funktion = funktion.replace(/[-+;:_\(\)!"§$%&\[\]\{\}#*']/g, '');
        dbh.save_feedback(seite,design,aufgabe,funktion);
    }

    res.render(seite);
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
