/**
 * Created by David on 05.08.2014.
 */
var dbh = require('./dbhandler');
var io = require('socket.io')();
var f;
function wordinfo (a, cb) {
    dbh.finddml(a, function(data) {
        cb(data);
    });
}

var gold = {
    'adv1': {
        'class': 'adjective',
    },
    'verb1': {
        'class': 'verb',
        'form': 'pa2'
    },
    // ende absatz 1
    'adj1': {
        'class': 'adjective',
        'congruence': 'noun1'
    },
    'noun1': {
        'class': 'noun',
        'gender': 'mas',
        'number': 'sin',
        'case': 'nom'
    },
    'noun2': {
        'class': 'noun',
        'case': 'nom'
    },
    'noun3': {
        'class': 'noun'
    },
    'adv2': { // NOT ADV? -> lachen?
        'class': 'adjective'
    },
    'verb2': {
        'class': 'verb',
        'person': '3',
        'tempus': 'prä',
        'number': 'sin'
    },
    // ende absatz 2
    'noun4': {
        'class': 'noun',
        'case': 'nom',
        'number': 'sin'
    },
    'adv3': {
        'class': 'adjective'
    },
    'noun5': {
        'class': 'noun',
        'case': 'nom',
        'number': 'sin'
    },
    'noun6': {
        'class': 'noun',
        'case': 'dat',
        'number': 'sin',
        'gender': ['mas', 'neu']
    },
    'noun7': {
        'class': 'noun',
        'case': ['nom', 'akk'],
        'number': 'sin',
        'gender': ['mas', 'neu']
    },
    'noun8': {
        'class': 'noun',
        'case': ['nom', 'akk'],
        'number': 'sin',
        'gender': 'neu'
    },
    'verb3': {
        'class': 'verb',
        'number': 'sin',
        'person': '3',
        'tempus': 'prä'
    },
    'noun9': {
        'class': 'noun',
        'case': 'nom',
        'gender': ['mas', 'neu'],
        'number': 'sin'
    },
    // ende absatz 3
    'noun10': {
        'class': 'noun',
        'case': 'nom',
        'number': 'sin'
    },
    'adv4': {
        'class': 'adjective'
    },
    'noun11': {
        'class': 'noun',
        'case': 'nom',
        'number': 'sin'
    },
    'noun12': {
        'class': 'noun',
        'case': 'nom',
        'number': 'sin'
    },
    'clause1': {

    },
    'noun13': {
        'class': 'noun',
        'gender': 'fem',
        'number': 'sin',
        'case': 'nom'
    },
    // ende absatz 4
    'noun14': {
        'class': 'noun',
        'gender': 'fem',
        'number': 'sin',
        'case': 'nom'
    },
    'noun15': {
        'class': 'noun',
        'number': 'sin',
        'case': 'nom'
    },
    'noun16': {
        'class': 'noun',
        'gender': 'fem',
        'number': 'sin',
        'case': 'nom'
    },
    'noun17': {
        'class': 'noun',
        'number': 'sin',
        'case': 'nom'
    },
    // ende absatz 5
    'adv5': {
        'class': 'adjective'
    },
    'clause2': {

    },
    // ende absatz 6
    'clause3': {

    },
    'clause4': {

    },
    'adv6': {
        'class': 'adjective'
    },
    'adv7': {
        'class': 'adjective'
    },
    'adj2': {
        'class': 'adjective',
        'congruence': 'noun18'
    },
    'noun18': {
        'class': 'noun',
        'gender': 'neu',
        'number': 'sin',
        'case': 'nom'
    },
    'noun19': {
        'class': 'noun',
        'gender': 'neu',
        'case': 'akk',
        'number': 'sin'
    }
    // end
};
function validate(query, io) {
    var w = query.word;
    var fi = query.field;
    var iGold = gold[fi];
    f = fi;
    if (/clause\d+/.test(fi)) {
        io.emit("update",createResponse(202, w, "clause", 0, fi));
        return;
    }
    var status = wordinfo(w, function(data) {
        if (data !== null) {
            var morphologyArray = data.morphology;
            // get gold information
            var goldclass = iGold.class;
            var goldcases, goldgenders, goldnumber,
                goldtempus, goldperson, goldform;

            // get silver information
            var silvercases, silvergenders, silvernumbers,
                silvertempora, silverpersons, silverform;

            var silverclasses = extractParam(morphologyArray,"wordclass");
            if (goldclass === "noun") {
                silvercases = extractParam(morphologyArray,"case");
                silvergenders = extractParam(morphologyArray, "gender");
                silvernumbers = extractParam(morphologyArray, "number");
                goldcases = iGold.case;
                goldgenders = iGold.gender;
                goldnumber = iGold.number;
                io.emit("update",check(silverclasses, goldclass, silvercases, goldcases, silvergenders, goldgenders, silvernumbers, goldnumber));
            } else if (goldclass === "adjective") {
                silvercases = extractParam(morphologyArray,"case");
                silvergenders = extractParam(morphologyArray, "gender");
                silvernumbers = extractParam(morphologyArray, "number");
                if (iGold.hasOwnProperty("congruence")) {
                    var congruentWord = gold[iGold.congruence];
                    goldcases = congruentWord.case;
                    goldgenders = congruentWord.gender;
                    goldnumber = congruentWord.number;
                } else {
                    goldcases = iGold.case;
                    goldgenders = iGold.gender;
                    goldnumber = iGold.number;
                }
                io.emit("update",check(silverclasses, goldclass, silvercases, goldcases, silvergenders, goldgenders, silvernumbers, goldnumber));
            } else if (goldclass === "verb") {
                if (iGold.hasOwnProperty("form")) {
                    silverform = extractParam(morphologyArray, "form");
                    goldform = iGold.form;
                    io.emit("update",check(silverclasses, goldclass, silverform, goldform));
                    return;
                }
                silvertempora = extractParam(morphologyArray, "tempus");
                silverpersons = extractParam(morphologyArray, "person");
                silvernumbers = extractParam(morphologyArray, "number");
                goldtempus = iGold.tempus;
                goldperson = iGold.person;
                goldnumber = iGold.number;
                io.emit("update",check(silverclasses, goldclass, silvertempora, goldtempus, silverpersons, goldperson, silvernumbers, goldnumber));
            } else {
                io.emit("update",check(silverclasses, goldclass));
            }
        } else {
            // not in database
            if (looksLike(gold[f].class, w)) {
                io.emit("update",createResponse(202, w, iGold.class, 0,f));
                return;
            }
            // else not in database, doesn't look like it should
            io.emit("update",createResponse(400, w, iGold.class, -1,f));
        }
    });
};

function looksLike (template, word) {
    switch(template) {
        case "noun": return /^[A-Z][a-za-zäöüß]+$/.test(word);
        case "adjective":
        case "adverb":
        case "verb": return /^[a-zäöüß]+$/.test(word);
        default: return false;
    }
}

function extractParam(array,param) {
    var re = new RegExp(param);
    return array.map(function(e) {
        return e.split(",").filter(function(f) {
            return (re.test(f));
        }).map(function(g){
            return (g.split(":")[1]).trim().toLowerCase();
        });
    });
}

function createResponse(statusCode, word, clazz, status, field) {
    var o = {
        'statusCode': statusCode
    };
    o.word = word;
    o.class = clazz;
    o.status = status;
    o.field = field;
    return o;
}

function check() {
    var args = Array.prototype.slice.call(arguments);

    if (arguments.length%2!==0) {
        throw "Wrong number of arguments! Expected paired list. Got: " + arguments;
    }

    while (args.length > 0) {

        var silver = args.shift();
        var gold = args.shift();


        if (!gold) continue;

        gold = [].concat(gold);

        var flat = flatten(silver);

        if (gold.length == 1) {
            if (!(contains(flat, gold[0]))) {
                return createResponse(400, "failure", gold[0], 2, f);
            }
        } else if (gold.length == 2) {
            if (!(contains(flat, gold[0]) || contains(flat, gold[1]))) {
                return createResponse(400, "failure", gold[0] + "/" + gold[1], 2, f);
            }
        }
    }
    return createResponse(200, "success", "good", 999,f);
}

var flatten = function(array) {
    var result = [], self = arguments.callee;
    array.forEach(function(item) {
        Array.prototype.push.apply(
            result,
            Array.isArray(item) ? self(item) : [item]
        );
    });
    return result;
};

function contains(a, obj) {
    return (a.indexOf(obj) > -1);
}

exports.validate = validate;