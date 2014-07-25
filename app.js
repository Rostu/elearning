/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var start = require('./routes/start');
var ubung = require('./routes/ubung');
var http = require('http');
var impressum = require('./routes/impressum');
var path = require('path');
var app = express();
var index = require('./routes/index');
var dbhandler = require('./routes/dbhandler');


//lockit vars
var config = require('./config.js');
var Lockit = require('lockit');
var cookieSession = require('cookie-session');

var edt = require("express-debug");
edt(app);
// all environments
app.set('port', process.env.PORT || 3000);
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
}
app.use('/', index.get_session);
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/start', start.start);
app.get('/ubung', ubung.ubung);
app.get('/neuanlegen', ubung.neu);
app.get('/ubshow', ubung.ubshow);
app.get('/deleteub/:id', ubung.deleteub);
app.post('/neuanlegen', ubung.createUebung);
app.get('/home', start.start);
app.get('/ubdata', routes.dbhandler.getubs);
app.get('/testing', index.get_testing);
app.get('/china', ubung.get_china);
app.get('/china2', ubung.get_china2);
app.get('/china3', ubung.get_china3);
app.get('/zukunft', ubung.get_zukunft);
app.get('/zukunft_task1', ubung.get_zukunft_task1);
app.get('/glueck', ubung.get_glueck);
app.get('/glueck_gedicht', ubung.get_glueck_gedicht);
app.get('/handy', ubung.get_handy);
app.get('/ersti', ubung.get_ersti);
app.get('/veggieday', ubung.get_veggieday);
app.get('/veggieday_inhalt', ubung.get_veggieday_inhalt);
app.get('/veggieday_drag', ubung.get_veggieday_drag);
app.get('/veggieday_met', ubung.get_veggieday_met);
app.get('/veggieday_multi', ubung.get_veggieday_multi);
app.get('/veggieday_u5', ubung.get_veggieday_u5);
app.get('/ersti_task1', ubung.get_ersti_task1);
app.get('/ersti_task2', ubung.get_ersti_task2);
app.get('/ersti_task2b', ubung.get_ersti_task2b);
app.get('/ersti_task2c', ubung.get_ersti_task2c);
app.get('/ersti_task2d', ubung.get_ersti_task2d);
app.get('/ersti_task3', ubung.get_ersti_task3);
app.get('/ersti_task3b', ubung.get_ersti_task3b);
app.get('/ersti_task4', ubung.get_ersti_task4);
app.get('/wertewandel', ubung.get_wertewandel);
app.get('/generationen', ubung.get_generationen);
app.get('/generationen2', ubung.get_generationen2);
app.get('/impressum', impressum.get_imp);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

