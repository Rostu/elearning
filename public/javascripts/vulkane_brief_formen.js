$( init );

function init() {
    //search_lemma("beschreiben", function (result) {console.log(result)});
    //search_forms("[be]schreiben", function (result) {console.log(result)});

    var lemma_forms_associative;

    load_latest_dropboxes (function (latest_dropboxes) {
        lemma_forms_associative = latest_dropboxes;
        console.log(lemma_forms_associative);
        read_all_db(lemma_forms_associative, function () {
            console.log(lemma_forms_associative);
            fs.writeFile("javascripts/vulkane1_selection.json", JSON.stringify(lemma_forms_associative), function(err) {
                if(err) {
                    console.log(err);
                }
                else {
                    console.log("dropbox data saved to 'javascripts/vulkane1_selection.json'");
                }
            });
        });
    });
}

function load_latest_dropboxes (callback) {
    $.getJSON("javascripts/vulkane1_selection.json", function(json) {
        callback(json);
    });
}

function read_all_db(data, callback) {
    var dropboxes = $(".dropbox");
    var left = dropboxes.length;
    dropboxes.each(function() {
        read_dropbox(this.name, data, function (name) {
            console.log(name);
            if (--left === 0) {
                callback();
            }
        });
    });
}

function read_dropbox(name, data, callback) {
    var retrieved_lemma;
    var retrieved_forms;
    search_lemma(name, function (lemma_result) {
        retrieved_lemma = lemma_result;
        //console.log(retrieved_lemma);
        search_forms(retrieved_lemma, function (result) {
            retrieved_forms = result;
            data[name] = retrieved_forms;
            callback(name);
            //console.log(dropbox_data);
        });
    });
}

function search_lemma(lemma, callback) {
    $.getJSON('/vollformlexikon/lemma', {
        filter: { lemma: lemma }
    }, function(data){
        callback([].concat.apply([], extractParam(data.morphology,"lemma"))[0]);
    });
}

function search_forms(lemma, callback) {
    $.getJSON('/vollformlexikon/forms', {
        filter: { lemma: lemma }
    }, function(data){
        callback((JSON.stringify($.map(data, function (index) { return index.form; }))));
    });
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