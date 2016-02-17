/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var start = require('./routes/start');
var ubung = require('./routes/ubung');
var feed = require('./routes/feedback');
var http = require('http');
var impressum = require('./routes/impressum');
var signup = require('./routes/signup');
var path = require('path');
var app = express();
var index = require('./routes/index');
var dml = require('./routes/dml');
var dbhandler = require('./shared/routes/dbhandler');
var pointshandler = require('./routes/pointshandler');
var points = require('./public/javascripts/points.json');
var nav = require('./routes/navbar.js');
//lockit vars
var config = require('./config.js');
var Lockit = require('lockit');
var cookieSession = require('cookie-session');

// all environments
app.set('port', process.env.PORT || 3555);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

//lockit------------------------------------------
app.use(express.cookieParser('The greatest Secret of Mankind'));
app.use(cookieSession({secret: 'The greatest Secret of Mankind'}));
var lockit = new Lockit(config);
app.use(lockit.router);
//------------------------------------------------

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
    var edt = require("express-debug");
    edt(app);
}
app.use(function(req, res, next){
    //console.log(req.path);
    var newpath = req.path;
    /*if (!nav.check_ausnahmen(newpath)){
        newpath = newpath.replace("/","");
        res.locals.last = newpath;
    }*/
    newpath = newpath.replace("/","");
    res.locals.last = newpath;
    console.log(req.url);
    next();
});
app.use('/', index.get_session);
app.get('/', routes.index);
app.get('/Begriffe_aus_Text', ubung.get_Begriffe_aus_Text);
app.get('/fuba_Textproduktion', ubung.get_fuba_Textproduktion);
app.get('/liveticker_fussball_redewendungen', ubung.get_liveticker_fussball_redewendungen);
app.get('/Textverstehen_Fussball', ubung.get_Textverstehen_Fussball);
app.get('/fuba_Polyseme', ubung.get_fuba_Polyseme);
app.get('/fuba_Komposita', ubung.get_fuba_Komposita);
app.get('/china_start', ubung.get_china_start);
app.get('/china_Textverstehen_Wortfeld_Studium', ubung.get_china_Textverstehen_Wortfeld_Studium);
app.get('/china_Wortschatz_ordnen', ubung.get_china_Wortschatz_ordnen);
app.get('/china_Textverstehen_Redewiedergabe', ubung.get_china_Textverstehen_Redewiedergabe);
app.get('/deleteub/:id', ubung.deleteub);
app.get('/ersti_start', ubung.get_ersti_start);
app.get('/ersti_Textverstehen_emotionale_Woerter', ubung.get_ersti_Textverstehen_emotionale_Woerter);
app.get('/ersti_Textverstehen_Wortfeld_Universitaet_A', ubung.get_ersti_Textverstehen_Wortfeld_Universitaet_A);
app.get('/ersti_Textverstehen_Wortfeld_Universitaet_B', ubung.get_ersti_Textverstehen_Wortfeld_Universitaet_B);
app.get('/ersti_Textverstehen_Wortfeld_Universitaet_C', ubung.get_ersti_Textverstehen_Wortfeld_Universitaet_C);
app.get('/ersti_Wortschatz_ordnen_A', ubung.get_ersti_Wortschatz_ordnen_A);
app.get('/ersti_Wortschatz_ordnen_B', ubung.get_ersti_Wortschatz_ordnen_B);
app.get('/ersti_Wortschatz_ordnen_C', ubung.get_ersti_Wortschatz_ordnen_C);
app.get('/ersti_Wortschatz_erweitern', ubung.get_ersti_Wortschatz_erweitern);
app.get('/ersti_end', ubung.get_ersti_end);
app.get('/energie_start', ubung.get_energie_start);
app.get('/energie_Wortfeld_Solarantrieb', ubung.get_energie_Wortfeld_Solarantrieb);
app.get('/energie_Wortfeld_Solarantrieb_A', ubung.get_energie_Wortfeld_Solarantrieb_A);
app.get('/energie_Wortfeld_Solarantrieb_B', ubung.get_energie_Wortfeld_Solarantrieb_B);
app.get('/feedback:last?', feed.get_feedback);
app.post('/new_feedback', feed.new_feedback);
app.get('/show_feedback',feed.show_feedback);
app.get('/delfeedback:id', feed.deletefeedback);
app.get('/get_feedback_items',feed.get_feedback_items);
app.get('/generationen_start', ubung.get_generationen_start);
app.get('/generationen_text', ubung.get_generationen_text);
app.get('/generationen_Textverstehen_Komposita', ubung.get_generationen_Textverstehen_Komposita);
app.get('/generationen_Wortschatz_ordnen', ubung.get_generationen_Wortschatz_ordnen);
app.get('/generationen_Textverstehen_Bedeutungserschliessung', ubung.get_generationen_Textverstehen_Bedeutungserschliessung);
app.get('/glueck_start', ubung.get_glueck_start);
app.get('/glueck_Textproduktion_Antonyme_A', ubung.get_glueck_Textproduktion_Antonyme_A);
app.get('/glueck_Textproduktion_Antonyme_B', ubung.get_glueck_Textproduktion_Antonyme_B);
app.get('/glueck_Kreuzwortraetsel', ubung.get_glueck_Kreuzwortraetsel);
app.get('/glueck_Textverstehen_Zeitangaben', ubung.get_glueck_Textverstehen_Zeitangaben);
app.get('/glueck_Textverstehen_Redensarten', ubung.get_glueck_Textverstehen_Redensarten);
app.get('/glueck_Zeitstrahl', ubung.get_glueck_Zeitstrahl);
app.get('/glueck_video', ubung.get_glueck_video);
app.get('/glueck_video_zuordnen', ubung.get_glueck_video_zuordnen);
app.get('/glueck_video_kleeblatt', ubung.get_glueck_video_kleeblatt);
app.get('/glueck_video_paraphrase', ubung.get_glueck_video_paraphrase);
app.get('/glueck_silbermond', ubung.get_glueck_silbermond);
app.get('/handy_start', ubung.get_handy_start);
app.get('/handy_text', ubung.get_handy_text);
app.get('/handy_task1', ubung.get_handy_task1);
app.get('/handy_task2', ubung.get_handy_task2);
app.get('/home', start.start);
app.get('/liveticker_fussball_redewendungen', ubung.get_liveticker_fussball_redewendungen);
app.get('/testy', ubung.get_testy);
app.get('/impressum', impressum.get_imp);
app.get('/glueck_Memory', ubung.get_glueck_memory);
app.get('/glueck_Textverstehen_Wortspirale', ubung.get_glueck_Textverstehen_Wortspirale);
app.get('/neuanlegen', ubung.neu);
app.get('/Begriffe_aus_Text', ubung.get_Begriffe_aus_Text);
app.get('/Textverstehen_FuBa', ubung.get_Textverstehen_FuBa);
app.get('/BaBa_Textproduktion', ubung.get_BaBa_Textproduktion);
app.get('/liveticker_basketball_synonyme', ubung.get_liveticker_basketball_synonyme);
app.get('/BaBa_Komposita_a', ubung.get_BaBa_Komposita_a);

//app.get('/points', pointshandler.get_points);

app.get('/points:last?', function(req, res){
    var site ={};
    points.sites.forEach(function(entry) {
        if (entry.name == req.param('last') ){site = entry}
    });
    res.json(site);
});
app.get('/signup', signup.get_signup);
app.get('/anleitung', ubung.get_anleitung);
app.get('/users', user.list);
app.get('/start', start.start);
app.get('/testing', index.get_testing);
app.get('/ubung', ubung.ubung);
app.get('/ubshow', ubung.ubshow);
app.get('/ubdata', routes.dbhandler.getubs);
app.get('/veggieday_start', ubung.get_veggieday_start);
app.get('/veggieday_Textverstehen_Schluesselwoerter_in_Boulevardzeitungen', ubung.get_veggieday_Textverstehen_Schluesselwoerter_in_Boulevardzeitungen);
app.get('/veggieday_Textverstehen_Schluesselwoerter_in_Fachtexten_1', ubung.get_veggieday_Textverstehen_Schluesselwoerter_in_Fachtexten_1);
app.get('/veggieday_Textverstehen_Schluesselwoerter_in_Fachtexten_2', ubung.get_veggieday_Textverstehen_Schluesselwoerter_in_Fachtexten_2);
app.post('/neuanlegen', ubung.createUebung);
app.get('/wertewandel_start', ubung.get_wertewandel_start);
app.get('/wertewandel_Textverstehen_Schluesselwoerter', ubung.get_wertewandel_Textverstehen_Schluesselwoerter);
app.get('/wertewandel_Wortbedeutung_verstehen', ubung.get_wertewandel_Wortbedeutung_verstehen);
app.get('/wertewandel_Textverstehen_Kernaussagen', ubung.get_wertewandel_Textverstehen_Kernaussagen);
app.get('/wertewandel_Textproduktion_Statistische_Angaben', ubung.get_wertewandel_Textproduktion_Statistische_Angaben);
app.get('/zukunft_start', ubung.get_zukunft_start);
app.get('/zukunft_start2', ubung.get_zukunft_start2);
app.get('/zukunft_Textverstehen_Wortfeld_Technik', ubung.get_zukunft_Textverstehen_Wortfeld_Technik);
app.get('/zukunft_Wortschatz_ordnen', ubung.get_zukunft_Wortschatz_ordnen);
app.get('/zukunft_Wortschatzerweiterung_fest_Wortverbindungen', ubung.get_zukunft_Wortschatzerweiterung_fest_Wortverbindungen);
app.get('/zukunft_Textproduktion', ubung.get_zukunft_Textproduktion);
app.get('/zukunft_Kreuzwortraetsel', ubung.get_zukunft_Kreuzwortraetsel);
app.get('/next:last?', ubung.get_next);
app.get('/last:last?', ubung.get_last);
app.get('/uindex', ubung.get_uindex);
app.get('/dml', function(req, res) {
    var query = req.query;
    var dml = require('./routes/dml');
    dml.validate(query, res);
});

var server = http.createServer(app);
var io = require('socket.io');

var sio = io.listen(server);
if ('production' == app.get('env')) {
    sio.set({path: '/lernplattform-daf-cl/socket.io/'});
}
console.log(app.get('env'));
sio.sockets.on('connection', function (socket) {
    socket.on('userinput', function(data) {
        dml.validate(data, socket);
    });
});

server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});