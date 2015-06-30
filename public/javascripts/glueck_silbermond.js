$( init );

function init() {
   
    var srcid = 1;
    
    $(".srcelem").each(function () {
        var parentID = $(this).context.parentNode.id;
        //console.log(parentID);
        $(this).attr("id", parentID + "se" + srcid++);
        $(this).attr("draggable", "true");
        $(this).attr("ondragstart", "drag(event)");
        $(this).append($('<div class="handle">'));
    });

    $('.srcelem').mouseenter(function()
    {
        $($(this).children('.handle')[0]).css("backgroundColor", "#7AB3E3");
    });

    $('.srcelem').mouseleave(function()
    {
        $($(this).children('.handle')[0]).css("backgroundColor", "#005E9C");
    });

    $(".sourceline").each(function () {
        for (var i = $(this).children('.srcelem').length; i >= 0; i--) {
            $(this).append($(this).children('.srcelem')[Math.random() * i | 0]);
        }
    });

    var flexy = $("#flexybox");
    for (var i = $(flexy).children('.linebox').length; i >= 0; i--) {
        $(flexy).append($(flexy).children('.linebox')[Math.random() * i | 0]);
    }
    
    $('[class$="line"]').each(function() {
        $(this).attr("ondrop", "drop(event)");
        $(this).attr("ondragover", "allowDrop(event)");
    });

    $('[class$="srcelem"]').each(function() {
        $(this).attr("onclick", "setOne(event)");
        $(this).attr("oncontextmenu", "resetOne(event)");
    });

    $('[class$="panelarrow"]').each(function() {
        $(this).attr("onclick", "resetAll(event)");
    });
    
    $('[class$="select_buffer"]').each(function() {
        $(this).attr("onclick", "stopProp(event)");
        $(this).attr("oncontextmenu", "stopProp(event)");
    });
    
    load_dropbox_data (function (dropbox_data) {
        load_answer_data (function (answer_data) {
            var dropboxes = $(".dropbox");
            var dbox_count = dropboxes.length;
            dropboxes.each(function() {
                var dbox = $(this);
                var dbox_name = this.id;
                var corr_form;
                $.each(answer_data, function(elem, data) {
                    if (dbox_name == elem) {
                        corr_form = data.form;
                    }
                });
                corr_form_upper = (corr_form.charAt(0) == corr_form.charAt(0).toUpperCase());
                //console.log(corr_form_upper);
                if (corr_form_upper) {
                    console.log(corr_form);
                }
                $.each(dropbox_data, function(elem, forms_hash) {
                    $.each(forms_hash, function(form, form_hash) {
                        var current_forms = Object.keys(form_hash);
                        if (equals(current_forms, new RegExp('^' + corr_form + '$', 'i'))) {
                            var selected_item_str = elem.replace(/[\(\)\[\]]/g, '');
                            for (var i = 0; i < current_forms.length; i++) {
                                var strval = ((corr_form_upper) ? current_forms[i].charAt(0).toUpperCase() + current_forms[i].slice(1) : current_forms[i]);

                                var opt = jQuery('<option>' + strval + '</option>');
                                $(opt).attr('value', strval);
                                $(opt).attr('selected', selected_item_str == current_forms[i]);
                                dbox.append(opt);
                            }
                            return;
                        }
                    });
                });
                this.onchange = function() {
                    // access form and value properties via this (keyword)
                    if (corr_form == this.value) {
                        raisepoints();
                    }
                    else {
                        raisefaults();
                    }
                };
            });
            dropboxes.each(function() {
                var curr_width = $(this).children()[0].clientWidth;
                $(this).width(curr_width + 4);
                //console.log($($(this).children()[0]).current_width());
            });
        });
    });
}

function load_dropbox_data (callback) {
    $.getJSON("javascripts/glueck_ist_1.json", function(json) {
        callback(json);
    });
}

function load_answer_data (callback) {
    $.getJSON("javascripts/glueck_ist_1_correct.json", function(json) {
        callback(json);
    });
}

function equals(a, regex){
    for(var i = 0; i < a.length; i++) {
        if (a[i].match(regex)) {
            return true;
        }
    }
    return false;
}

function allowDrop(ev) {
    ev.preventDefault();
    var seID = 't' + ev.dataTransfer.getData("seID");
    if (!seID.match(new RegExp(ev.target.getAttribute("id"), "i"))) {
        ev.dataTransfer.dropEffect = "none";
    }
    else if (ev.target.getAttribute("draggable") == "true") {
        ev.dataTransfer.dropEffect = "none"; // dropping is not allowed
    }
    else if (ev.target.getAttribute("class") == "tgtelem") {
        ev.dataTransfer.dropEffect = "none";
    }
}

function stopProp(ev) {
    ev.preventDefault();
    ev.stopPropagation();
}

function drag(ev) {
    ev.dataTransfer.setData("seID", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("seID");
    ev.target.appendChild(document.getElementById(data));
}

function srcelemOnClick(ev) {
    var isRightMB;
    ev = ev || window.event;

    if ("which" in ev)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
        isRightMB = ev.which == 3;
    else if ("button" in ev)  // IE, Opera 
        isRightMB = ev.button == 2;

    isRightMB ? resetOne(ev) : setOne(ev)
}

function setOne(ev) {
    var src = ev.target.closest('.srcelem');
    var linebox = ev.target.closest('.linebox');
    var targetline = $(linebox).children('.targetline');
    targetline.append($(src));
    if (ev.target.getAttribute("class") == "handle") {
        $(ev.target).css("backgroundColor", "#005E9C");
    }
    else {
        console.log(ev.target.getAttribute("class"));
        $($(ev.target).children('.handle')[0]).css("backgroundColor", "#005E9C");
    }
}

function resetOne(ev) {
    ev.preventDefault();
    var src = ev.target.closest('.srcelem');
    var linebox = ev.target.closest('.linebox');
    var soureceline = $(linebox).children('.sourceline');
    soureceline.append($(src));
    if (ev.target.getAttribute("class") == "handle") {
        $(ev.target).css("backgroundColor", "#005E9C");
    }
    else {
        console.log(ev.target.getAttribute("class"));
        $($(ev.target).children('.handle')[0]).css("backgroundColor", "#005E9C");
    }
}

function resetAll(ev) {
    var linebox = ev.target.closest('.linebox');
    var sourceline = $(linebox).children('.sourceline');
    var src_regex = new RegExp($(sourceline).attr('id') + "se", "i");
    var srcs = $('.srcelem').filter(function () {
        return this.id.match(src_regex);});
    $(srcs).each(function() {
        sourceline.append(this);
    });
}