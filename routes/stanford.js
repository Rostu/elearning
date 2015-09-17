var NLP = require('stanford-corenlp');

exports.get_request = function(request, result) {

    var sentences = request.param("sentences");

    var options = {
        'nlpPath': __dirname + '/corenlp',
        "version": '3.5.2',
        annotators: ['tokenize', 'ssplit', 'pos', 'lemma', 'parse'],
        'extra' : {
            'tokenize.language': 'de',
            'pos.model': 'edu/stanford/nlp/models/pos-tagger/german/german-hgc.tagger',
            'parse.model': 'edu/stanford/nlp/models/lexparser/germanSR.ser.gz'
        }
    }

    var coreNLP = new NLP.StanfordNLP(options, function (error) {
        coreNLP.process(sentences, function(error, output) {
            //console.log(err,JSON.stringify(result));
            if(error){
                console.log(error);
            }else{
                result.send(output);
            }
        });
    });
}