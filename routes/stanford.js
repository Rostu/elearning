var NLP = require('stanford-corenlp');

var coreNLP = new NLP.StanfordNLP({"nlpPath": __dirname + "/corenlp","version":"3.5.2"},function(err) {
    coreNLP.process('This is so good.', function(err, result) {
        console.log(err,JSON.stringify(result));
    });
});

exports.get_request = function(req, res){

    console.log('test');

};