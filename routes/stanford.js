var NLP = require('stanford-corenlp');

exports.get_request = function(req, res) {

    var coreNLP = new NLP.StanfordNLP({"nlpPath": __dirname + "/corenlp", "version": "3.5.2"}, function (err) {
        var sentences = req.param("sentences");
        coreNLP.process(sentences, function(err, result) {
            //console.log(err,JSON.stringify(result));
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        });
    });
}