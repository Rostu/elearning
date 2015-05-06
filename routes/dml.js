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
    // misc
    'adj99': {
        'class': 'adjective',
        'congruence': 'noun2'
    },
    'adj98': {
        'class': 'adjective',
        'congruence': 'noun9'
    },
    'adj97': {
        'class': 'adjective',
        'congruence': 'noun11'
    },
    'adj96': {
        'class': 'adjective',
        'congruence': 'noun14'
    },
    'adj95': {
        'class': 'adjective',
        'congruence': 'noun15'
    },
    'adj94': {
        'class': 'adjective',
        'congruence': 'noun16'
    },
    'adj93': {
        'class': 'adjective',
        'congruence': 'noun17'
    },
    // start poem
    'adv1': {
        'class': 'adverb',
        'answers' : ['nirgendwo','nirgens']
    },
    'adv2':{
        'class': 'adverb',
        'answers' : ['weniges','Weniges']
    },
    // ende absatz 1
    'adj1':{
        'class': 'adjective',
        'answers' : ['heiß','brühheiß','glühheiß','glutheiß','kochend','sehr warm','siedend']
    },
    'noun1': {
        'class': 'noun',
        'gender': 'mas',
        'number': 'sin',
        'case': 'nom',
        'answers' : ['Hagel']
    },
    'pro1': {
        'class': 'pronoun',
        'answers' : ['kein']
    },
    // ende absatz 2
    'adj2':{
        'class': 'adjective',
        'answers' : ['laute','dröhnende','schallende','unüberhörbare','ohrenbetäubende','lautstarke']
    },
    'adj3':{
        'class': 'adjective',
        'answers' : ['schlechtes','fehlerhaftes','geringwertiges','minderwertiges','mangelhaftes','niveauloses','schwaches','ungenügendes','unzureichendes','unzulängliches','beschissenes','grottenschlechtes','grottiges','armseliges','dilettantisches','dürftiges','kümmerliches','lausiges','schäbiges','mieses','miserabeles']
    },
    'adj4':{
        'class': 'adjective',
        'gender': 'fem',
        'number': 'sin',
        'case': 'nom',
        'answers' : ['triste','abwechslungslose', 'bedrückende', 'deprimierende', 'dunkle', 'einförmige', 'eintönige', 'ereignislose', 'freudlose', 'gleichförmige', 'graue', 'langweilige', 'monotone', 'öde', 'reizlose', 'traurige', 'trostlose', 'trübe', 'uninteressante','fade','tupide']
    },
    'adj5':{
        'class': 'adjective',
        'answers' : ['nerviger', 'anstrengender', 'beschwerlicher', 'lästiger', 'störender', 'strenger', 'unliebsamer', 'verdrießlicher']
    },
    // ende absatz 3
    'adv3':{
        'class': 'adverb',
        'answers' : ['niemals','auf keinen Fall', 'ausgeschlossen', 'beileibe nicht','bei Weitem nicht','bestimmt nicht', 'Gott behüte','Gott bewahre', 'keinesfalls', 'nie','nie und nimmer', 'um keinen Preis', 'unter keinen Umständen', 'zu keiner Zeit','im Leben nicht', 'mein Lebtag nicht', 'nie im Leben', 'zu keiner Sekunde', 'nimmer']
    },
    'pro2': {
        'class': 'pronoun',
        'answers' : ['niemand','keiner', 'kein Einziger', 'keine einzige Person', 'keine Menschenseele', 'kein Mensch', 'nicht einer', 'nicht ein Einziger', 'kein Aas', 'kein Schwanz', 'kein Schwein', 'kein Teufel', 'kine Sau', 'keine lebendige Seele']
    },
    'adv4':{
        'class': 'adverb',
        'answers' : ['niemals','auf keinen Fall', 'ausgeschlossen', 'beileibe nicht','bei Weitem nicht','bestimmt nicht', 'Gott behüte','Gott bewahre', 'keinesfalls', 'nie','nie und nimmer', 'um keinen Preis', 'unter keinen Umständen', 'zu keiner Zeit','im Leben nicht', 'mein Lebtag nicht', 'nie im Leben', 'zu keiner Sekunde', 'nimmer']
    }
    /*
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
        'gender': ['mas','neu'],
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
    }*/
    // end
};
function validate(query, io) {
    var w = query.word;
    var fi = query.field;
    var iGold = gold[fi];
    var loesung = iGold['answers'];
    f = fi;
    if (/clause\d+/.test(fi)) {
        io.emit("update",createResponse(200, {word:w,status:11}));
        return;
    }
    if (loesung.indexOf(w)>-1){
        io.emit("update",createResponse(200, {word:w,status:13}));
        return;
    }else{
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
                io.emit("update",createResponse(200, {word:w,status:6}));
                return;
            }
            // else not in database, doesn't look like it should
            io.emit("update",createResponse(200, {word:w,status:7,gold:gold[f].class}));
        }
    });
    }
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

function createResponse(statusCode, attr) {
    var o = {
        'statusCode': statusCode
    };
    o.attr = attr;
    o.field = f;
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
                return switcher(gold[0]);
            }
        } else if (gold.length == 2) {
            if (!(contains(flat, gold[0]) || contains(flat, gold[1]))) {
                if (!contains(flat, gold[0])) {
                    return switcher(gold[0]);
                } else {
                    return switcher(gold[1]);
                }
            }
        }
    }
    return createResponse(200, {status:1});
}

function switcher (gold) {
    switch(gold) {
        case "noun":
        case "verb":
        case "adverb":
        case "adjective": return createResponse(200, {status:2, gold:gold});
        case "fem":
        case "mas":
        case "neu": return createResponse(200, {status:3, gold:gold});
        case "nom":
        case "akk":
        case "dat":
        case "gen": return createResponse(200, {status:4, gold:gold});
        case "sin":
        case "plu": return createResponse(200, {status: 5, gold:gold});
        case "prä":
        case "prt":
        case "kj1":
        case "kj2": return createResponse(200, {status:8, gold:gold});
        case "1":
        case "2":
        case "3": return createResponse(200, {status:9, gold:gold});
        case "pa1":
        case "pa2":
        case "inf":
        case "eiz":
        case "imp": return createResponse(200, {status: 10, gold:gold});
        default: return createResponse(200, {status:12, gold:gold});
    }
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