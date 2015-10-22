var NLP = require('stanford-corenlp');

var stanford_corenlp_options = {
    'nlpPath': __dirname + '/corenlp',
    "version": '3.5.2',
    annotators: ['tokenize', 'ssplit', 'pos', 'lemma', 'parse'],
    'extra' : {
        'tokenize.language': 'de',
        'pos.model': 'edu/stanford/nlp/models/pos-tagger/german/german-hgc.tagger',
        'parse.model': 'edu/stanford/nlp/models/lexparser/germanSR.ser.gz'
    }
};

var stanford_coreNLP;

exports.startUp = function() {
    stanford_coreNLP = new NLP.StanfordNLP(stanford_corenlp_options, function (error) {
        if(error){
            console.log(error);
        }else{
            console.log("Stanford CoreNLP started successfully.");
        }
    });
};

exports.get_parse = function(request, result) {

    var sentences = request.param("text");

    stanford_coreNLP.process(sentences, function(error, output) {
        //console.log(err,JSON.stringify(result));
        if(error){
            console.log(error);
        } else {
            result.send(output);
        }
    });
};
