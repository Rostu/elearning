var mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/test');
mongoose.connect(process.env.CONNECTMONGOOSE);
//with this line it is needed that you define the environment variable CONNECTMONGOOSE on your system with the mongoose connection string
//please make sure to not push sensible data to github

var db = mongoose.connection;

//definieren eines Schemas für eine Übung
var ubungschema = mongoose.Schema({
    typ:  Number,
    date: { type: Date, default: Date.now },
    inhalt: Array,
    name: String
});

var dmlschema = mongoose.Schema({
    form: String,
    morphology: Array
});

var feedback_schema = mongoose.Schema({
    site: String,
    design: String,
    aufgabe: String,
    zusatz: String,
    feedback: String,
    anmerkung: String,
    date: { type: Date, default: Date.now }
});

//Compilieren des Schemas in ein Model
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log("Verbunden mit Datenbank!");
});

var Ubung = mongoose.model('ubungschema', ubungschema);

var DmlData = mongoose.model('dmldata', dmlschema, 'dmldata');
var Feedback = mongoose.model('feedbackschema',feedback_schema);

//Funktion zum speichern eines feedbacks in die Datenbank
save_feedback = function save_feedback(site,design,aufgabe,zusatz,feedback,anmerkung){
    var feed = new Feedback();
    feed.site = site;
    feed.design = design;
    feed.aufagbe = aufgabe;
    feed.zusatz = zusatz;
    feed.feedback = feedback;
    feed.anmerkung = anmerkung;
    feed.save(function (err, feed) {
        if (err) return console.error(err);
        else console.log("feedback gespeichert");
    });
}

exports.getfeedback = function(callback){
    var query = Feedback.find({});

    query.limit(20);
    //query.skip(randomIntFromInterval(0,12000));

    query.exec(function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            callback("", docs);
        }
    });
};

exports.delfeedback = function(id){
    Feedback.findByIdAndRemove(id, function (err, ub) {
        if (err) {console.log(err);}
        else {console.log("gelöscht")};
    });
};


//Funktion zum speichern in die Datenbank
savenew = function savenew(typ,inhalt,name){
    var ub = new Ubung();
    ub.name = name;
    ub.typ = typ;
    ub.inhalt = inhalt;
    ub.save(function (err, ub) {
        if (err) return console.error(err);
        else console.log("gespeichert");
    });
};

//Function um eine Übung aus der Datenbank zu lesen
getub = function getub(callback){
    Ubung.find(function (err, übungen) {
        if (err) {callback([])}
        else {callback (übungen)}
    });
};

getdml = function getdml(callback) {
  DmlData.find(function(err, data) {
      if (err) {callback([]);}
      else callback(data);
  })
};

finddml = function finddml (a, cb) {
    DmlData.findOne({form: a}, function(err,data) {
        if (err) {
            cb([]);
            return;
        }
        cb(data);
    });
};

// direkt als view registrieren, für XHR
getubs = function getubs(req, res){
    res.setHeader("Content-Type", "application/json");
    Ubung.find({}, {_id: 0, inhalt: 1}).lean().exec(function (err, ubungen) {

            if (err) {
                res.send(JSON.stringify([]));
            } else {
                var round = ubungen.length;

                res.send(JSON.stringify(ubungen[1]));
            }
    });
};

//Funktion zum löschen einer Übung
exports.delUb = function(id){
    Ubung.remove({_id: id},function (err, ub) {
        if (err) {console.log(err);}
        else {console.log(ub);
        };
    });
};

exports.getub = getub;
exports.getubs = getubs;
exports.savenew = savenew;
exports.getdml = getdml;
exports.finddml = finddml;
exports.save_feedback = save_feedback;