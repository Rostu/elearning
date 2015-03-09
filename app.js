/**
 * Module dependencies.
 */
var io = require('socket.io');
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var start = require('./routes/start');
var ubung = require('./routes/ubung');
var http = require('http');
var impressum = require('./routes/impressum');
var signup = require('./routes/signup');
var path = require('path');
var app = express();
var index = require('./routes/index');
var dml = require('./routes/dml');
var dbhandler = require('./routes/dbhandler');
var pointshandler = require('./routes/pointshandler');
var points = require('./public/javascripts/points.json');
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
    //var edt = require("express-debug");
    //edt(app);
}

app.use('/', index.get_session);
app.get('/', routes.index);
app.get('/china_start', ubung.get_china_start);
app.get('/china_task1', ubung.get_china_task1);
app.get('/china_task2', ubung.get_china_task2);
app.get('/china_task3', ubung.get_china_task3);
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
app.get('/generationen_start', ubung.get_generationen_start);
app.get('/generationen_text', ubung.get_generationen_text);
app.get('/generationen_task1', ubung.get_generationen_task1);
app.get('/generationen_task2', ubung.get_generationen_task2);
app.get('/generationen_task3', ubung.get_generationen_task3);
app.get('/glueck_start', ubung.get_glueck_start);
app.get('/glueck_Textproduktion_Antonyme_A', ubung.get_glueck_Textproduktion_Antonyme_A);
app.get('/glueck_Textproduktion_Antonyme_B', ubung.get_glueck_Textproduktion_Antonyme_B);
app.get('/glueck_Kreuzwortraetsel', ubung.get_glueck_Kreuzwortraetsel);
app.get('/glueck_Textverstehen_Zeitangaben', ubung.get_glueck_Textverstehen_Zeitangaben);
app.get('/glueck_Textverstehen_Redensarten', ubung.get_glueck_Textverstehen_Redensarten);
app.get('/handy_start', ubung.get_handy_start);
app.get('/handy_text', ubung.get_handy_text);
app.get('/handy_task1', ubung.get_handy_task1);
app.get('/handy_task2', ubung.get_handy_task2);
app.get('/home', start.start);
app.get('/impressum', impressum.get_imp);
app.get('/neuanlegen', ubung.neu);
//app.get('/points', pointshandler.get_points);

app.get('/points', function(req, res){
    //console.log(req.session.lastpage);
    var site ={};
    points.sites.forEach(function(entry) {
        if (entry.name == req.session.lastpage ){site = entry}
    });
    res.json(site);
});
app.get('/signup', signup.get_signup);
app.get('/users', user.list);
app.get('/start', start.start);
app.get('/testing', index.get_testing);
app.get('/ubung', ubung.ubung);
app.get('/ubshow', ubung.ubshow);
app.get('/ubdata', routes.dbhandler.getubs);
app.get('/veggieday_task1', ubung.get_veggieday_task1);
app.get('/veggieday_start', ubung.get_veggieday_start);
app.get('/veggieday_task4', ubung.get_veggieday_task4);
app.get('/veggieday_task3', ubung.get_veggieday_task3);
app.get('/veggieday_multi', ubung.get_veggieday_multi);
app.get('/veggieday_task5', ubung.get_veggieday_task5);
app.post('/neuanlegen', ubung.createUebung);
app.get('/wertewandel_start', ubung.get_wertewandel_start);
app.get('/wertewandel_task1', ubung.get_wertewandel_task1);
app.get('/wertewandel_task2', ubung.get_wertewandel_task2);
app.get('/wertewandel_task3', ubung.get_wertewandel_task3);
app.get('/wertewandel_task4', ubung.get_wertewandel_task4);
app.get('/zukunft_start', ubung.get_zukunft_start);
app.get('/zukunft_task1', ubung.get_zukunft_task1);
app.get('/zukunft_task2', ubung.get_zukunft_task2);
app.get('/zukunft_task3', ubung.get_zukunft_task3);
app.get('/zukunft_task4', ubung.get_zukunft_task4);
app.get('/zukunft_task5', ubung.get_zukunft_task5);
app.get('/next', ubung.get_next);
app.get('/last', ubung.get_last);
app.get('/uindex', ubung.get_uindex);
app.get('/dml', function(req, res) {
    var query = req.query;
    var dml = require('./routes/dml');
    dml.validate(query, res);
});

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});


var sio = io.listen(server);
sio.sockets.on('connection', function (socket) {
    socket.on('userinput', function(data) {
        dml.validate(data, socket);
    });
});
