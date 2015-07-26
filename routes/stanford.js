var NLP = require('stanford-corenlp');

var coreNLP = new NLP.StanfordNLP({"nlpPath": __dirname + "/corenlp","version":"3.5.2"}, function(err) {
    coreNLP.process('Glück ist, wenn die Sonne scheint.', function(err, result) {
        console.log(err,JSON.stringify(result));
        console.log('out')
    });
});

exports.get_request = function(req, res){

    console.log('test');

};