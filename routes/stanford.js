var NLP = require('stanford-corenlp');

var stanford_corenlp_options = {
    'nlpPath': __dirname + '/../extensions/CoreNLP',
    "version": '3.5.2',
    annotators: ['tokenize', 'ssplit', 'pos', 'lemma', 'parse'],
    'extra' : {
        'tokenize.language': 'de',
        'pos.model': 'edu/stanford/nlp/models/pos-tagger/german/german-hgc.tagger',
        'parse.model': 'edu/stanford/nlp/models/srparser/germanSR.ser.gz'
    }
};

var stanford_coreNLP;

exports.startup = function() {
    stanford_coreNLP = new NLP.StanfordNLP(stanford_corenlp_options, function (error) {
        if(error){
            console.log("An error occurred during CoreNLP startup. Error data:");
            console.log(error);
        }else{
            console.log("Stanford CoreNLP started successfully.");
        }
    });
};

exports.get_parse = function(request, response) {
    waitForLoading(function() {
        stanford_coreNLP.process(request.param("text"), function (error, output) {
            if (error) {
                console.log("An error occurred during your parser request. Error data:");
                console.log(error);
                response.send(JSON.parse("{}"));
            } else {
                response.send(output);
            }
        });
    });
};

function waitForLoading(callback) {
    if (stanford_coreNLP.pipeline) {
        callback();
    } else {
        setTimeout(function () {
            console.log("Waiting for pipeline to load ...");
            waitForLoading(callback);
        }, 5000);
    }
}
