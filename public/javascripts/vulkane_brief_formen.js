$( init );

function init() {
    //search_lemma("beschreiben", function (result) {console.log(result)});
    //search_forms("[be]schreiben", function (result) {console.log(result)});
    
    var lemma_forms_associative;

    load_dropbox_data (function (dropbox_data) {
        lemma_forms_associative = dropbox_data;
        var dropboxes = $(".dropbox");
        var dbox_count = dropboxes.length;
        dropboxes.each(function() {
            var dbox = $(this);
            var dbox_name = this.name;
            //console.log(dbox_name);
            var dbn_regex = new RegExp(this.name, "i");
            $.each(dropbox_data, function(elem, forms_hash) {
                //console.log(elem);
                $.each(forms_hash, function(form, form_hash) {
                    //console.log(form_hash);
                    var current_forms = Object.keys(form_hash);
                    if (equals(current_forms, dbox_name)) {
                        var selected_item_str = elem.replace(/[\(\)\[\]]/g, '');
                        console.log(selected_item_str);
                        console.log(current_forms);
                        for (var i = 0; i < current_forms.length; i++) {
                            var opt = jQuery('<option>' + current_forms[i] + '</option>');
                            $(opt).attr('value', current_forms[i]);
                            $(opt).attr('selected', selected_item_str == current_forms[i]);
                            dbox.append(opt);                 
                        }
                        return;                        
                    }
                        //console.log(strstr);
                        //if (strstr.search(dbn_regex) != -1) {
                        //    console.log(elem);
                        //}
                });
            });
        });
        dropboxes.each(function() {
            var curr_width = $(this).children()[0].clientWidth;
            $(this).width(curr_width + 4);
            //console.log($($(this).children()[0]).current_width());
        });
    });
}

function load_dropbox_data (callback) {
    $.getJSON("javascripts/vulkane1_selection.json", function(json) {
        callback(json);
    });
}

function read_all_db(data, callback) {
    var dropboxes = $(".dropbox");
    var dbox_count = dropboxes.length;
    dropboxes.each(function() {
        read_dropbox(this.name, data, function (name) {
            console.log(name);
            if (--dbox_count === 0) {
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
    $.getJSON('/vollformlexikon_lemma', {
        filter: { lemma: lemma }
    }, function(data){
        callback([].concat.apply([], extractParam(data.morphology,"lemma"))[0]);
    });
}

function search_forms(lemma, callback) {
    $.getJSON('/vollformlexikon_forms', {
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

function equals(a, str){
    for(var i = 0; i < a.length; i++) {
        if(a[i] == str){
            return true;
        }
    }
    return false;
}

function send_json(data, callback) {
    $.post('/vulkane_json_save', {data: data}, function(result, err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result);
        }
    });
    callback();
}

