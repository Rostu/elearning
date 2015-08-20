$( init );

var test_sentences = [
    "Fügen Sie hier Ihren Dr. text ein.",
    "Klicken Sie nach der Prüfung auf die farbig unterlegten Textstellen. Klicken Sie nach der Prüfung auf die farbig unterlegten Textstellen.",
    "Klicken Sie nach der Prüfung auf die farbig unterlegten Textstellen. oder nutzen Sie diesen Text als Beispiel für ein Paar Fehler , die LanguageTool erkennen kann: Ihm wurde Angst und bange, als er davon hörte.",
    "( Eine Rechtschreibprüfun findet findet übrigens auch statt.",
    "Fügen Sie hier Ihren text ein. Fügen Sie hier Ihren text ein."
];
var selection = [0, 1, 2, 3, 4];
var test_text = "";

for(i = 0; i < selection.length; i++) {
    test_text += test_sentences[selection[i]] + ' ';
}

var sentences;
var valid_sentences = [];

function init() {

    $('#textboxarea').text(test_text);

    $.post( "/langtool_anfrage", { sentence: test_text }, function(json){

        var sf_ws_errors = [];
        var other_errors = [];
        var other_errors_hash = [];

        var other_error_count = 0;
        var other_error_coordinates = [];

        $.each(json.matches.error, function(index, error) {

            if(error.attributes.msg === "Fügen Sie zwischen Sätzen ein Leerzeichen ein") {
                sf_ws_errors.push(error);
            }else{

                var analysed_error = {
                    'number': other_error_count,
                    'coordinates': '' + error.attributes.fromx + error.attributes.tox,
                    'length': error.attributes.tox - error.attributes.fromx,
                    'attributes': error.attributes
                };

                console.log(analysed_error);

                other_errors.push(analysed_error);

                other_errors_hash[other_error_count++] = analysed_error;


            }

        });

        if(sf_ws_errors.length == 0) {

            other_errors_hash.sort(function(a,b) {
                return b.length - a.length;
            });

            console.log(other_errors_hash);

            handleSentences(other_errors);

        }else{

            insertErrors(sf_ws_errors, $('#textboxarea'), 0);
            generateErrors(sf_ws_errors, $('#textbox'));

        }
    });
}

function insertErrors(errlist, target, offset) {

    var original = target.text();
    target.text('');

    var last_end = 0;

    (function errorLoop (index) {
        setTimeout(function () {

            insertError(errlist[index], target, original, last_end, offset);
            last_end = errlist[index].attributes.tox - offset;
            ////console.log('last');
            ////console.log(last_end);

            if (++index < errlist.length) {
                errorLoop(index);
            }else{
                var text = jQuery('<span/>', {
                    class: 'text',
                    text: original.substring(last_end, original.length)
                });
                $(target).append(text);
            }
        }, 0)
    })(0);

}

function insertError(data, target, original, last_end, offset) {

    var err_start = data.attributes.fromx - offset;
    var err_end = data.attributes.tox - offset;

    var err_string = original.substring(err_start, err_end);

    ////console.log('computed');
    ////console.log(err_start - last_end);

    if(err_start - last_end > 0) {

        var text = jQuery('<span/>', {
            class: 'text',
            text: original.substring(last_end, err_start)
        });
        $(target).append(text);

    }else{

        console.log("Uh, oh! We've hit a snag!!");

    }

    if($('#' + 'esco' + data.coordinates).length == 0) {

        var mistake = jQuery('<span/>', {
            id: 'esco' + data.coordinates,
            class: 'mistake',
            original: err_string,
            text: err_string
        });
        $(mistake).hover(
            function() {
                $(".error[id$='co" + data.coordinates + "']").addClass( "hover" );
            }, function() {
                $(".error[id$='co" + data.coordinates + "']").removeClass( "hover" );
            }
        );
        $(mistake).click(function() {
            $('html, body').animate({
                scrollTop: $(".error[id$='co" + data.coordinates + "']").offset().top
            }, 75)
            $(".error[id$='co" + data.coordinates + "']").children(':not(.errmsg)').slideDown(75);
        });
        $(target).append(mistake);

        //var old_target_id = $(target).attr('id');
        //var tbs_target_id = 'ts' + old_target_id.slice(2, old_target_id.length);

        //console.log(old_target_id);
        //console.log(tbs_target_id);

    }

    //console.log('start');
    //console.log(err_start);
    //console.log('end');
    //console.log(err_end);
    //console.log('err');
    //console.log(err_string);

}

function generateErrors(errlist, target) {

    var errorbox = jQuery('<div/>', {
        id: $(target).attr('id') + 'eb',
        class: 'errorbox',
    });
    $(errorbox).hide();

    $(target).append(errorbox);

    $(errorbox).slideDown(25, function() {

        (function errorLoop (index) {
            setTimeout(function () {

                generateError(errlist[index], errorbox);

                if (++index < errlist.length) errorLoop(index);
            }, 15)
        })(0);

    });

}

function generateError(data, target) {

    var error = jQuery('<div/>', {
        id: 'er' + pad(data.number, 2) + 'co' + data.coordinates,
        class: 'error'
    });
    $(error).hover(
        function() {
            $("span[id$='esco" + data.coordinates + "']").addClass( "hover" );
        }, function() {
            $("span[id$='esco" + data.coordinates + "']").removeClass( "hover" );
        }
    );
    $(error).hide();

    var err_info = [];

    var errcat = jQuery('<b/>', {
        text: data.attributes.category + ': '
    });

    var errmsg = jQuery('<div/>', {
        class: 'errmsg',
        text: data.attributes.msg
    });
    $(errmsg).click(function(event) {
        errorClick(event);
    });
    $(errmsg).prepend(errcat);
    $(errmsg).hide();
    err_info.push(errmsg);
    $(error).append(errmsg);

    if(data.attributes.replacements) {

        var errrep = jQuery('<div/>', {
            class: 'errrep',
        });
        $(errrep).hide();
        //err_info.push(errrep);
        $(error).append(errrep);

        var reps = data.attributes.replacements.split('#');

        $.each(reps, function(rep_index, replacement){

            var rep = jQuery('<div/>', {
                id: 'er' + pad(data.number, 2) + 'rp' + pad(rep_index, 2),
                class: 'rep',
                text: replacement
            });
            //$(rep).hide();
            //err_info.push(rep);
            $(errrep).append(rep);

        });
    }

    if(data.attributes.url) {

        var url = jQuery('<a/>', {
            target: 'blank',
            text: 'Mehr Informationen',
            href: data.attributes.url
        });

        var errurl = jQuery('<div/>', {
            class: 'errurl',
        });
        $(errurl).append(url);
        $(errurl).hide();
        //err_info.push(errurl);
        $(error).append(errurl);

    }

    var errdat = jQuery('<div/>', {
        class: 'errdat',
        text: JSON.stringify(data.attributes)
    });
    $(errdat).hide();
    //err_info.push(errdat);
    $(error).append(errdat);

    $(target).append(error);

    $(error).slideDown(15, function() {

        (function infoLoop (index) {
            setTimeout(function () {

                $(err_info[index]).slideDown(15);

                if (++index < err_info.length) infoLoop(index);
            }, 15)
        })(0);

    });

}

function errorClick(ev) {
    $(ev.target).closest('.error').children(':not(.errmsg)').slideToggle(75);
}

function handleSentences(other_errors) {

    var sent_strings = [];

    $.post("/stanford_anfrage", {sentences: test_text}, function (json) {

        $('#spinner').addClass('close');
        $('#spinnerbox').slideUp();
        hideSpinner = setTimeout(function () {
            $('#spinner').hide();
        }, 450);

        var sent_data = json.document.sentences.sentence;

        insertSentences(sent_data, sent_strings, $('#textboxarea'));
        generateLines(sent_data, sent_strings, other_errors, $('#sentbox'));

    });

}

function generateLines(sent_data, sent_strings, other_errors, target) {

    //console.log(sent_strings);

    var testtest = 0;

    (function sentLoop (index) {
        setTimeout(function () {

            var line_data = generateLine(index, sent_strings[index], target);
            var relevant_errors = [];

            $.each(other_errors, function(err_index, error) {
                if (error.attributes.fromx - line_data.start >= 0 && error.attributes.tox - line_data.end <= 0) {
                    relevant_errors.push(error);
                    ////console.log('haha!' + index + ':' + err_index);
                }
            });

            if(relevant_errors.length > 0) {

                var textspan = $(line_data.line).find('.textarea').children().first();
                insertErrors(relevant_errors, textspan, line_data.start);

                /*$(".span[id^='tsc']").each(function(error_span) {
                    $(error_span).attr('id', $(error_span).attr('id').replace('tsc', 'ta'));
                    //console.log($(error_span).attr('id'));
                });*/
                generateErrors(relevant_errors, line_data.line);

            }



            //var latest_sent = $(".sent[id^='tsc']")[index];
            //var DOMclone = latest_sent.cloneNode(true);
            //$(DOMclone).attr('id', $(DOMclone).attr('id').replace('tsc', 'tbsc'));
            //var latest_sent_clone = jQuery.extend(true, var dummy, latest_sent);
            //var latest_sent_clone = $(latest_sent).clone(true, true).appendTo('#textboxarea');

            //console.log(latest_sent);
            //test_sent_clone);
            //$(latest_sent_clone).appendTo('#textboxarea');

            if (++index < sent_strings.length) {
                sentLoop(index);
            }else{
                if(testtest++ == 0) {
                    $(".sent[id^='tsc']").each(function(){
                        $(this).clone().attr('id',$(this).attr('id').replace('tsc', 'tbsc')).appendTo('#textboxarea');
                    });
                }
            }
        }, 0)
    })(0);

}

function generateLine(index, sent_string, target) {

    var loadbutton = jQuery('<div/>', {
        id: 'lo' + pad(index, 2),
        class: 'loadbutton',
    });
    $(loadbutton).click(function(event) {
        loadClick(event);
    });

    var loadarea = jQuery('<div/>', {
        id: 'la' + pad(index, 2),
        class: 'loadarea',
    });
    $(loadarea).append(loadbutton);

    var sent_span = $('#ts' + pad(index, 2)).clone();
    $(sent_span).attr('id', 'tsc' + pad(index, 2));
    $(sent_span).text(sent_string);

    var textarea = jQuery('<div/>', {
        id: 'ta' + pad(index, 2),
        class: 'textarea',
    });
    $(textarea).append(sent_span);

    /*var treedata = jQuery('<div/>', {
     id: 'td' + pad(i, 2),
     class: 'treedata',
     text: JSON.stringify(sentences[i].parsedTree)
     });*/

    var linebox = jQuery('<div/>', {
        id: 'lb' + pad(index, 2),
        class: 'linebox',
    });
    $(linebox).append(textarea);
    $(linebox).append(loadarea);

    var line = jQuery('<div/>', {
        id: 'll' + pad(index, 2),
        class: 'line',
    });
    $(line).append(linebox);
    $(line).hide();

    $(target).append(line);

    $(line).slideDown(25);

    return {'start': $(sent_span).attr('start'), 'end': $(sent_span).attr('end'), 'line': line };

}

function insertSentences(sent_data, sent_strings, target) {

    var original = target.text();
    target.text('');

    $.each(sent_data, function (index, sent) {

        var sent_start = sent.tokens.token[0].CharacterOffsetBegin;
        var sent_end = sent.tokens.token[sent.tokens.token.length - 1].CharacterOffsetEnd;

        var sent = original.substring(sent_start, sent_end)  + ' ';
        sent_strings.push(sent);

        var sent_span = jQuery('<span/>', {
            id: 'ts' + pad(index, 2),
            class: 'sent',
            text: sent,
        });
        $(sent_span).attr('start', sent_start);
        $(sent_span).attr('end', sent_end);
        $(target).append(sent_span);

    });

}

function loadClick(ev) {
    $('.linebox').removeClass('active');
    var linebox = ev.target.closest('.linebox');
    $(linebox).addClass('active');

    var treedata = $(linebox).children('.dataarea').children('.treedata')[0];
    updateTree(JSON.parse($(treedata).text()));
}

function updateTree(json) {
    $('.tree').children('svg').remove();

    var margin = {top: 20, right: 20, bottom: 20, left: 20},
        width = 685 - margin.right - margin.left,
        height = 400 - margin.top - margin.bottom;

    var i = 0,
        duration = 250,
        root;

    var tree = d3.layout.tree()
        .size([width, height]);

    var diagonal = d3.svg.diagonal()
        .projection(function (d) {
            return [d.x, d.y];
        });

    var svg = d3.select(".tree").append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var parse_tree = traverseParseTree(json);

    root = parse_tree;
    root.x0 = width / 2;
    root.y0 = 0;

    function collapse(d) {
        if (d.children) {
            d._children = d.children;
            d._children.forEach(collapse);
            d.children = null;
        }
    }

    //root.children.forEach(collapse);
    update(root);

    function update(source) {

        // Compute the new tree layout.
        var nodes = tree.nodes(root).reverse(),
            links = tree.links(nodes);

        // Normalize for fixed-depth.
        nodes.forEach(function (d) {
            d.y = d.depth * 50;
        });

        // Update the nodes…
        var node = svg.selectAll("g.node")
            .data(nodes, function (d) {
                return d.id || (d.id = ++i);
            });

        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", function (d) {
                return "translate(" + source.x0 + "," + source.y0 + ")";
            })
            .on("click", click);

        nodeEnter.append("circle")
            .attr("r", 1e-6)
            .style("fill", function (d) {
                return d._children ? "lightsteelblue" : "#fff";
            });

        nodeEnter.append("text")
            .attr("x", function (d) {
                return d.children || d._children ? -10 : 10;
            })
            .attr("dy", ".35em")
            .attr("text-anchor", function (d) {
                return d.children || d._children ? "end" : "start";
            })
            .text(function (d) {
                return d.name;
            })
            .style("fill-opacity", 1e-6);

        // Transition nodes to their new position.
        var nodeUpdate = node.transition()
            .duration(duration)
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

        nodeUpdate.select("circle")
            .attr("r", 4.5)
            .style("fill", function (d) {
                return d._children ? "lightsteelblue" : "#fff";
            });

        nodeUpdate.select("text")
            .style("fill-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function (d) {
                return "translate(" + source.x + "," + source.y + ")";
            })
            .remove();

        nodeExit.select("circle")
            .attr("r", 1e-6);

        nodeExit.select("text")
            .style("fill-opacity", 1e-6);

        // Update the links…
        var link = svg.selectAll("path.link")
            .data(links, function (d) {
                return d.target.id;
            });

        // Enter any new links at the parent's previous position.
        link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", function (d) {
                var o = {x: source.x0, y: source.y0};
                return diagonal({source: o, target: o});
            });

        // Transition links to their new position.
        link.transition()
            .duration(duration)
            .attr("d", diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
            .duration(duration)
            .attr("d", function (d) {
                var o = {x: source.x, y: source.y};
                return diagonal({source: o, target: o});
            })
            .remove();

        // Stash the old positions for transition.
        nodes.forEach(function (d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

// Toggle children on click.
    function click(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        update(d);
    }
}

function traverseParseTree(tree){
    if(tree.children !== undefined) {
        tree.name = tree.type;
        $.each($(tree.children), function(index, child) {
            tree.children[index] = traverseParseTree(child);
        });
    }else{
        return {"name": tree.word};
    }
    return tree;
}

function pad (str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}