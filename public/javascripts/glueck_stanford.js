
$( init );

teb_count = 0;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function init() {

    var sents = [
        "Fügen Sie hier Ihren text ein.",
        "Klicken Sie nach der Prüfung auf die farbig unterlegten Textstellen.Klicken Sie nach der Prüfung auf die farbig unterlegten Textstellen.",
        "Klicken Sie nach der Prüfung auf die farbig unterlegten Textstellen.oder nutzen Sie diesen Text als Beispiel für ein Paar Fehler , die LanguageTool erkennen kann: Ihm wurde Angst und bange, als er davon hörte.",
        "( Eine Rechtschreibprüfun findet findet übrigens auch statt.",
        "Fügen Sie hier Ihren text ein.Fügen Sie hier Ihren text ein."  
    ];
    var selection = [0, 1, 2, 3, 4];
    /*var random = getRandomInt(0, sents.length - 1);

    for(i = 0; i < 4; i++) {
        while ($.inArray(random, selection) > -1) {
            var random = getRandomInt(0, sents.length - 1);
        }
        selection.push(random);
    }*/
    
    var testtext = "";

    for(i = 0; i < selection.length; i++) {
        testtext += sents[selection[i]] + ' ';
    }
        
    var textlines = testtext.match( /[^\.!\?]+[\.!\?]+/g );
    var check_end = testtext.match( /[ ]?[^\.!\?]+[\.!\?]+/g ).map(function(str) {return str.charAt(0) === ' '});
    console.log(check_end);

    for(i = 0; i < textlines.length; i++) {

        var prep_text;
        
        if (i > 0 && !check_end[i]) {
            
            var split_text = textlines[i].split(/\s+/);

            var enderr = jQuery('<span/>', {
                id: 'tl' + pad(i, 2),
                class: 'enderr',
                text: split_text[0]
            });            
            $('#textboxarea').append(enderr);

            prep_text = ' ' + split_text.splice(1, split_text.length).join(' ');
            
            var errorbox;
            
            if(!$('#textbox').children('.errorbox').length > 0) {
                errorbox = jQuery('<div/>', {
                    id: 'teb',
                    class: 'errorbox',
                });
                $('#textbox').append(errorbox);
            }else{
                errorbox = $('#textbox').children('.errorbox')[0];
            }

            var error = jQuery('<div/>', {
                id: 'tei' + pad(teb_count, 2),
                class: 'error'
            });

            var errmsg = jQuery('<div/>', {
                id: 'tem' + pad(teb_count, 2),
                class: 'errmsg',
                text: 'Fügen Sie zwischen Sätzen ein Leerzeichen ein'
            });
            var errcat = jQuery('<b/>', {
                text: 'Sonstiges' + ': '
            });
            $(errmsg).prepend(errcat);
            $(error).append(errmsg);

            var errrep = jQuery('<div/>', {
                id: 'tep' + pad(teb_count, 2),
                class: 'errrep',
            });
            var rep = jQuery('<div/>', {
                id: 'tep' + pad(teb_count, 2) + 'rp' + pad(0, 2),
                class: 'rep',
                text: ' ' + split_text[0]
            });
            $(errrep).append(rep);
            $(error).append(errrep);
            
            $(errorbox).append(error);
            
        }else{
            prep_text = ' ' + textlines[i];
        }
        
        var textline = jQuery('<span/>', {
            id: 'tl' + pad(i, 2),
            class: 'textline',
            text: prep_text
        });
        $('#textboxarea').append(textline);
    }

    
    //$('#textbox').text(testtext);

    $('#spinner').addClass('close');
    hideSpinner = setTimeout(function(){
        $('#spinner').hide();
    }, 450);

    (function myLoop (i) {
        setTimeout(function () {

            var line = jQuery('<div/>', {
                id: 'll' + pad(i, 2),
                class: 'line',
            });
            $(line).hide();

            var dataarea = jQuery('<div/>', {
                id: 'da' + pad(i, 2),
                class: 'dataarea',
            });

            var errorbox = jQuery('<div/>', {
                id: 'eb' + pad(i, 2),
                class: 'errorbox',
            });

            $.post( "/langtool_anfrage", { sentence: textlines[i] }, function(json){
                var langdata = jQuery('<div/>', {
                    id: 'ld' + pad(i, 2),
                    class: 'langdata',
                    text: JSON.stringify(json)
                });
                $(dataarea).append(langdata);

                if(json.matches.error) {
                    (function errorLoop (index) {
                        setTimeout(function () {
                            var value = json.matches.error[index];

                            var error = jQuery('<div/>', {
                                id: 'er' + pad(i, 2) + 'ei' + pad(index, 2),
                                class: 'error'
                            });

                            var errmsg = jQuery('<div/>', {
                                id: 'em' + pad(i, 2) + 'ei' + pad(index, 2),
                                class: 'errmsg',
                                text: value.attributes.msg
                            });
                            var errcat = jQuery('<b/>', {
                                text: value.attributes.category + ': '
                            });
                            $(errmsg).prepend(errcat);
                            $(error).append(errmsg);

                            if(value.attributes.replacements) {

                                var errrep = jQuery('<div/>', {
                                    id: 'ep' + pad(i, 2) + 'ei' + pad(index, 2),
                                    class: 'errrep',
                                });
                                
                                var reps = value.attributes.replacements.split('#');

                                (function repLoop (j) {
                                    setTimeout(function () {
                                        var rep = jQuery('<div/>', {
                                            id: 'er' + pad(i, 2) + 'rp' + pad(j, 2),
                                            class: 'rep',
                                            text: reps[j]
                                        });

                                        $(errrep).append(rep);
                                        
                                        if (++j < reps.length) repLoop(j);
                                    }, 10)
                                })(0);
                                
                                $(error).append(errrep);
                            }
                            
                            if(value.attributes.url) {
                                var errurl = jQuery('<div/>', {
                                    id: 'eu' + pad(i, 2),
                                    class: 'errurl',
                                });
                                var url = jQuery('<a/>', {
                                    target: 'blank',
                                    text: 'Mehr Informationen',
                                    href: value.attributes.url
                                });
                                $(errurl).append(url);
                                $(error).append(errurl);
                            }
                            
                            var errdat = jQuery('<div/>', {
                                id: 'ed' + pad(i, 2) + 'ei' + pad(index, 2),
                                class: 'errdat',
                                text: JSON.stringify(value)
                            });
                            $(error).append(errdat);

                            $(errorbox).append(error);

                            if (++index < json.matches.error.length) errorLoop(index);
                        }, 10)
                    })(0);
                    $(line).append(errorbox);
                }
            });
            
            var linebox = jQuery('<div/>', {
                id: 'lb' + pad(i, 2),
                class: 'linebox',
            });
            
            var textarea = jQuery('<div/>', {
                id: 'ta' + pad(i, 2),
                class: 'textarea',
                text: textlines[i]
            });
            
            var loadarea = jQuery('<div/>', {
                id: 'la' + pad(i, 2),
                class: 'loadarea',
            });
            
            var loadbutton = jQuery('<div/>', {
                id: 'lo' + pad(i, 2),
                class: 'loadbutton',
            });
            
            /*var treedata = jQuery('<div/>', {
                id: 'td' + pad(i, 2),
                class: 'treedata',
                text: JSON.stringify(sentences[i].parsedTree)
            });*/

            $(linebox).append(textarea);
            
            $(loadarea).append(loadbutton);
            $('.loadbutton').click(function(event) {
                loadClick(event);
            });
            $(linebox).append(loadarea);
            $(line).prepend(linebox);            
            
            $('#sentbox').append(line);
            $(line).fadeIn();           
            
            //$(dataarea).append(treedata);
            
            

            $(line).append(dataarea);

            if (++i < textlines.length) myLoop(i);
        }, 10)
    })(0);

    $.getJSON("javascripts/glueck_stanford_tree_example.json", function(json) {
        updateTree(json);
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