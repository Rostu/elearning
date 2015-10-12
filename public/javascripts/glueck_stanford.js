$( init );

glueck_stanford_levelcount = {};
glueck_definition_trees_enabled = true;

function init() {

    initialize();

    insertTestData();

}

function initialize() {

    $('#textoverlay').hide();
    $('#sentbox').hide();
    //$('#treebox').hide();

    $('#checkbutton').click(function() {
        checkClick();
    });

}

function insertTestData() {

    var test_sentences = [
        "wenn die Sonne scheint."
        /*"Fügen Sie hier Ihren Dr. text ein.",
        "Klicken Sie nach der Prüfung auf die farbig unterlegten Textstellen. Klicken Sie nach der Prüfung auf die farbig unterlegten Textstellen.",
        "Klicken Sie nach der Prüfung auf die farbig unterlegten Textstellen. oder nutzen Sie diesen Text als Beispiel für ein Paar Fehler , die LanguageTool erkennen kann: Ihm wurde Angst und bange, als er davon hörte.",
        "( Eine Rechtschreibprüfun findet findet übrigens auch statt.",
        "Fügen Sie hier Ihren text ein. Fügen Sie hier Ihren text ein."*/
    ];
    var selection = [0/*, 1, 2, 3, 4*/];
    var test_text = "";

    for(i = 0; i < selection.length; i++) {
        test_text += test_sentences[selection[i]] + ' ';
    }

    $('#editor').text(test_text);
    //console.log($('#editor').text());

}

function checkClick() {

    /*  get the text in the editor and and reinsert it, deleting all additional markup
     *
     *  TODO: smart markup removal (preserving intentional line breaks)
     */

    var editor_text = $('#editor').text();
    $('#editor').text(editor_text);

    //var editor_text = $('#editor').text();

    /*var test = document.getElementById("editor").innerHTML;

    console.log('innerHTML');
    console.log(test);

    var regex = /<br\s*[\/]?>/gi;
    test = test.replace(regex, "\n");

    console.log('test');
    console.log(test);

    $('#editor').html(test);

    var editor_text = $('#editor').text();

    console.log('editor_text');
    console.log(editor_text);*/

    //$('#editor').text(editor_text);

    //$('#editor').text(editor_text);

    /*var test = document.getElementById("editor");

    console.log(test.innerHTML);

    var regex = /<br\s*[\/]?>/gi;
    $("#mydiv").html(str.replace(regex, "\n"));

    console.log(test.innerHTML.replace('<br>', '\n'));

    test.innerHTML = test.innerHTML.replace('<br>', '\n');

    var editor_text = test.textContent || $('#editor').innerText;

    //console.log(test);

    console.log(test.textContent);
    console.log(test.innerText);

    //$('#editor').textContent || $('#editor').innerText;

    $('#editor').text(editor_text);

    //console.log($('#editor').html());*/

    var fixed_callback = function () {

        displayLines();

        $('#textbox').find('.spinner').fadeOut(25, function () {
            $(this).closest('.spinnerbox').slideUp(25, function () {
                $(this).closest('#textoverlay').fadeOut(25);
            });
        });
    };

    $('#textoverlay').fadeIn(25, function() {

        $('#textbox').find('.spinnerbox').slideDown(25, function() {

            $(this).find('.spinner').fadeIn(25);

            hideLines(function() {

                $('.errorbox').remove();
                $('.line').remove();

                checkErrors(editor_text, function (error_data) {

                    /*  filter error data in order to detect issues with sentence separation and only use
                     *  CoreNLP if no such issues occur; otherwise, display sentence-final errors;
                     */

                    if (error_data.final.length == 0) {

                        /*errorData.other = errorData.other.sort(function(a,b) {
                         return b.length - a.length;
                         });*/

                        if (error_data.other.length == 0) {
                            //TODO: add some form of positive feedback
                        }
                        checkSentences(editor_text, error_data.other, fixed_callback);

                    } else {

                        handleFinalErrors(error_data.final, fixed_callback);

                    }

                });

            });

        });

    });

}

function handleFinalErrors(final_errors, callback) {

    insertErrors(final_errors, $('#editor'), 0);
    generateErrors(final_errors, $('#textbox'));

    callback();

}

function checkErrors(editor_text, callback) {

    $.post("/langtool_anfrage", {sentence: editor_text}, function (json) {

        var final_errors = [];
        var other_errors = [];

        if (json.matches.error && json.matches.error.length > 0) {
            $.each(json.matches.error, function (index, error) {

                /*  restructure error data, adding some information
                 */

                var analysed_error = {
                    'number': index,
                    'coordinates': '' + error.attributes.fromx + error.attributes.tox,
                    'length': error.attributes.tox - error.attributes.fromx,
                    'attributes': error.attributes
                };

                if (error.attributes.msg === "Fügen Sie zwischen Sätzen ein Leerzeichen ein") {

                    final_errors.push(analysed_error);

                } else {

                    other_errors.push(analysed_error);
                    //console.log(analysed_error);

                }

            });
        }


        callback({final: final_errors, other: other_errors});

    });

}

function checkSentences(editor_text, other_errors, callback) {

    $.post("/stanford_anfrage", {sentences: editor_text}, function (json) {

        var sentence_data = json.document.sentences.sentence;
        var sentences = [];

        /*  restructure sentence data, adding some information
         */

        //console.log(json.document.sentences.sentence.length);

        /*  allow texts comprising one sentence only; needed because the parser removes one intermediate level of
         *  the returned data in this case
         */

        if (!json.document.sentences.sentence.length) {
            sentence_data = [sentence_data];
        }

        $.each(sentence_data, function (index, sentence) {

            //console.log(sentence);
            console.log(JSON.stringify(sentence.parsedTree));


            var sentence_start = sentence.tokens.token[0].CharacterOffsetBegin;
            var sentence_end = sentence.tokens.token[sentence.tokens.token.length - 1].CharacterOffsetEnd;

            var sentence_string = editor_text.substring(sentence_start, sentence_end)  + ' ';
            sentences.push({start: sentence_start, end: sentence_end, string: sentence_string, parse: sentence.parsedTree});

            //console.log(sentence.parse);

        });

        //console.log(sentence_data);
        //console.log(sentences);

        generateLines(sentence_data, sentences, other_errors, $('#sentbox'), function() {

            /*  clone lines and replace editor text with them
             */

            $('#editor').text('');

            $.each($(".sentence[id^='ss']"), function(index, span) {
                $(span).clone(true, true).attr('id',$(this).attr('id').replace('ss', 'tbss')).appendTo('#editor');
            });

            $.each($('#textbox').find(".mistake[id^='esco']"), function(index, span) {
                $(span).attr('id', 't' + $(this).attr('id'));
            });

            $('#sentbox').slideDown(25, function() {
                callback();
            });

        });

    });

}

function displayLines() {

    /*  displays sentences and their errors (if any) one at a time with some delay once they are generated dynamically
     */

    var lines = $('.line');

    (function lineLoop(index) {
        setTimeout(function () {

            $(lines[index]).slideDown(25);

            if (++index < lines.length) {

                lineLoop(index);

            } else {

                var errorboxes = $('.errorbox');

                (function errorboxLoop(index) {
                    setTimeout(function () {

                        $(errorboxes[index]).slideDown(25);

                        if (++index < errorboxes.length) {
                            errorboxLoop(index);
                        }

                    }, 25)
                })(0);

                var errors = $('.error');

                (function errorLoop(index) {
                    setTimeout(function () {

                        $(errors[index]).slideDown(25);

                        if (++index < errors.length) {
                            errorLoop(index);
                        }

                    }, 25)
                })(0);

            }

        }, 25)
    })(0);

}

function hideLines(callback) {

    /*  hides sentences and their errors one at a time with some delay before another check is performed
     */

    var errorboxes = $('.errorbox');

    (function errorboxLoop(index) {
        setTimeout(function () {

            $(errorboxes[index]).slideDown(25);

            if (++index < errorboxes.length) {

                errorboxLoop(index);

            } else {

                var lines = $('.line');

                if (lines) {

                    (function lineLoop (index) {
                        setTimeout(function () {

                            $(lines[index]).slideUp(25);

                            if (++index < lines.length) {

                                lineLoop(index);

                            }else{

                                $('#sentbox').slideUp(25);

                                callback();

                            }

                        }, 5)
                    })(0);

                }

            }

        }, 25)
    })(0);

}

function generateLines(sentence_data, sentences, other_errors, target, callback) {

    /*  loop for dynamically generating divs for display of sentence data
     *
     *  TODO: variable sentence not used yet
     */

    $.each(sentences, function (index, sentence) {

        var parse = $.extend(true, {}, sentence.parse);
        //translation_test(parse);

        validate_parse(parse);

        var line_data = generateLine(index, sentence, target);
        var relevant_errors = [];

        $.each(other_errors, function(err_index, error) {
            if (error.attributes.fromx - line_data.start >= 0 && error.attributes.tox - line_data.end <= 0) {
                relevant_errors.push(error);
            }
        });

        if(relevant_errors.length > 0) {

            /*  highlight erroneous substrings by inserting coloured spans and generate divs for display of
             *  error data if any errors are present in the current sentence
             */

            var sentence_span = $(line_data.line).find("span[id^='ss']");

            insertErrors(relevant_errors, sentence_span, line_data.start);
            generateErrors(relevant_errors, line_data.line);

            /*var sentence_span = $(line_data.line).find('.textarea').children().first();

             insertErrors(relevant_errors, textspan, line_data.start);

             generateErrors(relevant_errors, line_data.line);*/

        }

    });

    callback();

}

function generateLine(index, sentence, target) {

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

    var sentence_span = jQuery('<span/>', {
        id: 'ss' + pad(index, 2),
        class: 'sentence',
        text: sentence.string,
    });
    $(sentence_span).attr('start', sentence.start);
    $(sentence_span).attr('end', sentence.end);

    var textarea = jQuery('<div/>', {
        id: 'ta' + pad(index, 2),
        class: 'textarea',
    });
    $(textarea).append(sentence_span);

    var treedata = jQuery('<div/>', {
     id: 'td' + pad(i, 2),
     class: 'treedata',
     text: JSON.stringify(sentence.parse)
     });

    var dataarea = jQuery('<div/>', {
        id: 'da' + pad(index, 2),
        class: 'dataarea'
    });
    $(dataarea).append(treedata);

    var linebox = jQuery('<div/>', {
        id: 'lb' + pad(index, 2),
        class: 'linebox'
    });
    $(linebox).append(textarea);
    $(linebox).append(loadarea);
    $(linebox).append(dataarea);

    var line = jQuery('<div/>', {
        id: 'll' + pad(index, 2),
        class: 'line',
    });
    $(line).append(linebox);
    $(line).hide();

    $(target).append(line);

    return {start: sentence.start, end: sentence.end, line: line };

}

function generateErrors(errlist, target) {

    var errorbox = jQuery('<div/>', {
        id: $(target).attr('id') + 'eb',
        class: 'errorbox',
    });
    $(errorbox).hide();
    $(target).append(errorbox);

    $.each(errlist, function(index, error) {
        generateError(error, errorbox);
    });

}

function generateError(data, target) {

    var additional = false;

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
        errorClick(event.target, true);
    });
    $(errmsg).prepend(errcat);
    //$(errmsg).hide();
    err_info.push(errmsg);
    $(error).append(errmsg);

    if(data.attributes.replacements) {

        additional = true;

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
            $(rep).hover(
                function() {
                    $("span[id$='esco" + data.coordinates + "']").text($(rep).text());
                }, function() {
                    var reset = $("span[id$='esco" + data.coordinates + "']").attr('chosen') ?
                        $("span[id$='esco" + data.coordinates + "']").attr('chosen') :
                        $("span[id$='esco" + data.coordinates + "']").attr('original');
                    $("span[id$='esco" + data.coordinates + "']").text(reset);
                }
            );
            $(rep).click(
                function() {
                    $("span[id$='esco" + data.coordinates + "']").attr('chosen', '' + $(rep).text());
                    $("span[id$='esco" + data.coordinates + "']").text($(rep).text());
                }
            );
            //$(rep).hide();
            //err_info.push(rep);
            $(errrep).append(rep);

        });
    }

    if(data.attributes.url) {

        additional = true;

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

    /*var errdat = jQuery('<div/>', {
        class: 'errdat',
        text: JSON.stringify(data.attributes)
    });
    $(errdat).hide();
    //err_info.push(errdat);
    $(error).append(errdat);*/

    if(additional) {
        $(errmsg).addClass('closed');
    }

    $(target).append(error);

    /*$(error).slideDown(25, function() {

     (function infoLoop (index) {
     setTimeout(function () {

     $(err_info[index]).slideDown(25);

     if (++index < err_info.length) infoLoop(index);
     }, 25)
     })(0);

     });*/

}

function insertErrors(errlist, target, offset) {

    /*  insert coloured error spans based on position data provided by LanguageTool; offset is needed to compute the
     *  correct positions for the current sentence only since the coordinates taken from the results of LanguageTool
     *  are based on the entire text;
     */

    var original = target.text();
    target.text('');

    var last_end = 0;

    $.each(errlist, function(index, error) {

        insertError(error, target, original, last_end, offset);
        last_end = errlist[index].attributes.tox - offset;

        ////console.log('last');
        ////console.log(last_end);

    });

    var text = jQuery('<span/>', {
        class: 'text',
        text: original.substring(last_end, original.length)
    });
    $(target).append(text);

}

function insertError(data, target, original, last_end, offset) {

    var err_start = data.attributes.fromx - offset;
    var err_end = data.attributes.tox - offset;

    var err_string = original.substring(err_start, err_end);

    ////console.log('computed');
    ////console.log(err_start - last_end);

    if(err_start - last_end > 0) {

        /*  insert span with pristine substring, separating the current error from the previous one if needed; the
         *  end position of the previous error is tracked by insertErrors(...) and passed on as the parameter "last_end"
         */

        var text = jQuery('<span/>', {
            class: 'text',
            text: original.substring(last_end, err_start)
        });
        $(target).append(text);

    }else{

        console.log("Uh, oh! We've hit a snag!!");

    }

    if($('#' + 'esco' + data.coordinates).length == 0) {

        /*  the insertion of coloured error spans needs to keep track of error coordinates since LanguageTool may have
         *  several error suggestions for the same substring; if overlapping errors occur, they are linked to the same
         *  error span;
         */

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
        $(mistake).dblclick(function(event) {
            $('html, body').animate({
                scrollTop: $(".error[id$='co" + data.coordinates + "']").offset().top
            }, 25);
            errorClick($(".error[id$='co" + data.coordinates + "']").find('.errmsg'), false);
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

//event handling
function errorClick(target, toggle) {
    if($(target).hasClass('closed')) {
        $(target).removeClass('closed');
        $(target).addClass('open');
        $(target).closest('.error').children(':not(.errmsg)').slideDown(25);
    }else if($(target).hasClass('open')){
        if (toggle) {
            $(target).removeClass('open');
            $(target).addClass('closed');
            $(target).closest('.error').children(':not(.errmsg)').slideUp(25);
        }
    }
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

//helper functions
function pad (str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}

function translation_test(parse) {

    var output = {};

    var pruned_enhanced_parse = enhance_tree(prune_leaves(parse), 0);
    //console.log(get_root_string(pruned_enhanced_parse));

    var prunes = prune_tree(pruned_enhanced_parse);
    prunes.sort(dynamic_sort("depth"));

    $.each(prunes, function(index, prune) {

        var key_string = get_root_string(prune, true, false);

        output[key_string] = {};
        //output[key_string]["prune"] = prune;
        output[key_string]["prune"] = print_tree(prune, true, true);
        console.log(print_tree(prune, true, true));

        output[key_string]["subset_trees"] = [];
        var subtree_hashes = get_subtree_hashes(prune);

        $.each(subtree_hashes, function(index, sthp) {
            enhance_tree(sthp, sthp["level"]);
        });

        subtree_hashes.sort(dynamic_sort("desc"));
        subtree_hashes.sort(dynamic_sort("depth"));

        $.each(subtree_hashes, function(index, sthp) {

            //output[key_string]["subset_trees"].push(sthp);
            output[key_string]["subset_trees"].push(print_tree(sthp, true, true));
            console.log(print_tree(sthp, true, true));

        });
     });

    //console.log(JSON.stringify(output));

         /*$.each(get_subtree_hashes(prune), function(index, sthp) {
     subtrees.push(sthp);
     });
     });

     $.each(subtrees, function(index, st) {
     console.log(print_tree(st));
     });

     var line_data = generateLine(index, sentence, target);
     var relevant_errors = [];

     $.each(other_errors, function(err_index, error) {
     if (error.attributes.fromx - line_data.start >= 0 && error.attributes.tox - line_data.end <= 0) {
     relevant_errors.push(error);
     }
     });

     //console.log(line_data);
     //console.log(relevant_errors);*/
}

function get_comparison_data(enhanced_pruned_tree_clone, callback) {

    var data = {};

    data["prunes"] = prune_tree(enhanced_pruned_tree_clone);
    data["prunes"].sort(dynamic_sort("depth"));

    data["subtrees"] = $.map(data["prunes"], function(prune, prune_index) {
        var sth_array = $.map(get_subtree_hashes(prune), function( sth, sth_index) {
            return enhance_tree(sth, sth["level"]);
        });
        sth_array.sort(dynamic_sort("desc")).sort(dynamic_sort("depth"));
        /*$.each(sth_array, function(index, sth) {
            console.log(print_tree(sth));
        });*/
        return [sth_array];
    });

    callback(data);
}

function validate_parse(tree) {

    glueck_stanford_levelcount = {};

    var pruned_input_clone = prune_leaves($.extend(true, {}, tree));
    var enhanced_pruned_tree_clone = enhance_tree(pruned_input_clone, 0);

    get_comparison_data(enhanced_pruned_tree_clone, function(input_data) {

        $.getJSON("javascripts/glueck_stanford_model_trees.json", function(model_trees) {

            var model_depths = $.map(model_trees, function(tree, tree_index) {
                return tree["depth"];
            });
            console.log(model_depths);

            var relevant_indexes = $.map(model_depths, function (depth, index) {
                if (depth == enhanced_pruned_tree_clone["depth"]) {
                    return index;
                }
            });

            if (relevant_indexes.length == 0) {

                if (enhanced_pruned_tree_clone["depth"] < model_depths.min) {
                    console.log("Du hast keinen gültigen Nebensatz gebildet. Überprüfe, ob deine Eingabe die Definitionseinleitung mit einem vollständigen Konditional-, Infinitiv- oder Objektsatz ergänzt.");
                } else {
                    if (enhanced_pruned_tree_clone["depth"] > model_depths.max) {
                        console.log("Dein Nebensatz ist zu komplex. Versuche es mit einer vereinfachten Variante deiner Eingabe, indem du z.B. Attribute oder Relativsätze weglässt.");
                    } else {

                    }
                }
            } else {
                console.log("relevant_indexes: " + JSON.stringify(relevant_indexes));

                $.getJSON("javascripts/glueck_stanford_model_prunes.json", function(model_prunes) {

                    relevant_indexes = relevant_indexes.filter(function (tree_index) {

                        console.log("-x- processing tree #" + tree_index + ":");

                        var model_prune_root_strings = $.map(model_prunes[tree_index], function (prune, prune_index) {
                            return get_root_string(prune, true, false);
                        });
                        console.log("-|- model_prunes:" + JSON.stringify(model_prune_root_strings));

                        var input_prune_root_strings = $.map(input_data["prunes"], function (prune, prune_index) {
                            return get_root_string(prune, true, false);
                        });
                        console.log("-|- input_prunes:" + JSON.stringify(input_prune_root_strings));

                        var to_diff = [model_prune_root_strings, input_prune_root_strings]
                        to_diff.sort(function(a, b){
                            return a.length - b.length;
                        });

                        var prune_diff = to_diff[1].filter(function(mprs) {
                            return to_diff[0].indexOf(mprs) < 0;
                        });
                        console.log("-|- prune_diff: " + JSON.stringify(prune_diff));

                        return prune_diff.length == 0;

                    });

                    console.log("relevant_indexes: " + JSON.stringify(relevant_indexes));

                    if (relevant_indexes.length == 0) {
                        console.log("--- Deine Nebensatzkonstruktion stimmt leider nicht mit den Vorlagen überein, die du in der vorherigen Aufgabe kennengelernt hast.");
                    } else {
                        $.getJSON("javascripts/glueck_stanford_model_subtrees.json", function (model_subtrees) {
                            relevant_indexes = relevant_indexes.filter(function (tree_index) {

                                var index_status = true;
                                console.log("--- -x- processing tree \##{tree_index}:");

                                var shallow_prune_indexes = $.map(model_prunes[tree_index], function (prune, prune_index) {
                                    if (model_prunes[tree_index][prune_index]["depth"] == 1) {
                                        return prune_index;
                                    }
                                });
                                console.log("--- -|- shallow_prune_indexes: " + JSON.stringify(shallow_prune_indexes));

                                $.each(model_prunes[tree_index], function (prune_index, prune) {
                                    $.each(model_subtrees[tree_index][prune_index], function (sth_index, sth) {

                                        console.log("--- -|x " + print_tree(sth, true, false));
                                        console.log("--- -|x " + print_tree(input_data["subtrees"][prune_index][sth_index], true, false));

                                        if (print_tree(sth, true, true) === (print_tree(input_data["subtrees"][prune_index][sth_index], true, true))) {
                                            console.log("--- -|| Comparison is fine!");
                                        } else {
                                            var relevant_shallow_prunes = shallow_prune_indexes.filter(function (prune_index) {

                                                var prune_root_str = get_root_string(model_prunes[tree_index][prune_index], true, false);

                                                console.log("--- -|x prune_root_str:" + prune_root_str);
                                                return print_tree(sth, true, false).indexOf(prune_root_str) > -1;
                                            });

                                            console.log("--- -|| relevant_shallow_prunes: " + JSON.stringify(relevant_shallow_prunes));

                                            if (relevant_shallow_prunes && relevant_shallow_prunes.length == 0) {
                                                console.log("--- -|| No exception!");
                                                index_status = false;
                                            } else {
                                                console.log("--- -|| Exception!");
                                            }
                                        }
                                    });
                                });
                                return index_status;
                            });

                            console.log("--- --- relevant_indexes: " + JSON.stringify(relevant_indexes));

                            if (relevant_indexes.length == 0) {
                                console.log("--- --- Deine Nebensatzkonstruktion stimmt leider nicht mit den Vorlagen überein, die du in der vorherigen Aufgabe kennengelernt hast.");
                            }else {
                                console.log("Sentence is fine!");
                            }
                        });
                    }
                });
            }
        });
    });

    /*
    var input_depths = $.map( model_trees, function( tree, tree_index ) {
        return tree["depth"];
    });
    console.log(input_depths.inspect);
    console.log(input_clone["depth"]);

    relevant_indexes = input_depths.each_index.select{ |i| input_depths[i] == input_clone["depth"] }
    */
}

function prune_tree(tree) {

    var output = [];

    if (tree["children"]) {

        output.push(tree);

        $.each(tree["children"], function (index, child) {
            output = output.concat(prune_tree(child));
        });
        return output;
    } else {
        return output;
    }
}

function get_subtree_hashes(tree) {

    var base = $.extend(true, {}, tree);
    delete base["children"];

    if (tree["children"]) {

        var collection = [];

        $.each(tree["children"], function (index, child) {
            var callback = get_subtree_hashes(child);
            collection[index] = callback;
        });

        var cartesian_product = cartesianProduct_old(collection);
        cartesian_product = cartesian_product.map(function(cp) {
            var new_op = $.extend(true, {}, base);
            new_op["children"] = cp;
            return new_op;
        });

        cartesian_product.push(base);
        return cartesian_product;

    } else {
        var output = [];
        output.push(base);
        return output;
    }

}

function enhance_tree(tree, level) {

    if (!glueck_stanford_levelcount["level"]) {
        glueck_stanford_levelcount["level"] = 0;
    }

    tree["level"] = level;
    if (!tree["count"]) {
        tree["count"] = glueck_stanford_levelcount["level"];
    }
    if (!tree["index"]) {
        tree["index"] = 0;
    }
    tree["depth"] = 0;
    tree["desc"] = 0;

    if (tree["children"]) {

        level += 1;
        tree["desc"] = tree["children"].length;

        $.each(tree["children"], function (index, child) {

            var callback = enhance_tree(child, level);
            glueck_stanford_levelcount["level"] += 1;

            callback["index"] = index;
            if (child["depth"] + 1 > tree["depth"]) {
                tree["depth"] = child["depth"] + 1;
            }
            tree["desc"] += child["desc"];
        });
    }
    return tree;
}

function prune_leaves(tree) {
    if (tree["children"]) {
        $.each(tree["children"], function (index, child) {
            if (child["children"]) {
                var callback = prune_leaves(child);
            } else {
                if (child["word"]) {
                    delete tree["children"];
                }
            }
        });
    }
    return tree;
}

function print_tree(tree, with_depth, with_desc) {

    var output = [];
    output.push(get_root_string(tree, with_depth, with_desc));

    if (tree["children"]) {
        $.each(tree["children"], function(index, child) {
            output.push(print_tree(child, with_depth, with_desc));
        });
        return ["(", output.join(""), ")"].join("");
    } else {
        return ["(", output.join(""), ")"].join("");
    }

}

function get_root_string(tree, with_depth, with_desc) {

    output = [];

    output.push("[");
    output.push(tree["level"]);
    output.push(":");
    output.push(tree["index"]);
    output.push("]");

    if (with_depth) {
        output.push("{");
        output.push(tree["depth"]);
        output.push("}");
    }

    if (with_desc) {
        output.push("<");
        output.push(tree["desc"]);
        output.push(">");
    }

    output.push(tree["type"]);
    return output.join("");
}

function cartesianProduct(a) { // a = array of array
    var i, j, l, m, a1, o = [];
    if (!a || a.length == 0) return a;

    a1 = a.splice(0,1);
    a = cartesianProduct(a);
    for (i = 0, l = a1[0].length; i < l; i++) {
        if (a && a.length) for (j = 0, m = a.length; j < m; j++)
            o.push([a1[0][i]].concat(a[j]));
        else
            o.push([a1[0][i]]);
    }
    return o;
}

function cartesianProduct_old(two_dim_arr) {
    var i, j, l, m, head, o = [];
    if (!two_dim_arr || two_dim_arr.length == 0) return two_dim_arr;

    head = two_dim_arr.splice(0,1);
    two_dim_arr = cartesianProduct(two_dim_arr);
    for (i = 0, l = head[0].length; i < l; i++) {
        if (two_dim_arr && two_dim_arr.length) for (j = 0, m = two_dim_arr.length; j < m; j++)
            o.push([head[0][i]].concat(two_dim_arr[j]));
        else
            o.push([head[0][i]]);
    }
    return o;
}

function dynamic_sort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

$.fn.getPreText = function () {
    var ce = $("<pre />").html(this.html());
    if ($.browser.webkit)
        ce.find("div").replaceWith(function() { return "\n" + this.innerHTML; });
    if ($.browser.msie)
        ce.find("p").replaceWith(function() { return this.innerHTML + "<br>"; });
    if ($.browser.mozilla || $.browser.opera || $.browser.msie)
        ce.find("br").replaceWith("\n");

    return ce.text();
};
