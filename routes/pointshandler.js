var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');
//mongoose.connect('mongodb://rostu:2balognom112@ds029828.mongolab.com:29828/testico');

var db = mongoose.connection;

function find (collec, query, callback) {
    mongoose.connection.db.collection(collec, function (err, collection) {
        collection.find(query).toArray(callback);
    });
}

var coll = mongoose.connection.db.collection('user');

