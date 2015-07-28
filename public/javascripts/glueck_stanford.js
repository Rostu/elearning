
$( init );

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function init() {

    var hideSpinner;
    $('#spinner').hide();

    clearTimeout(hideSpinner);
    $('#spinner').show(0, function(){
        $('#spinner').removeClass('close');
    });

    $.getJSON("javascripts/glueck_stanford_tree_example.json", function(json) {
        updateTree(json);
    });

    var sents = ["Glück ist, wenn man frei ist.", "Glück ist, wenn die Sonne scheint.", "Glück ist, wenn man die Augen aufmacht.", "Glück ist, dass man das Lachen nicht verliert.", "Glück ist, dass man nicht das Lachen verliert.", "Glück ist, wenn man mit sich selbst zufrieden ist.", "Glück ist, wenn man zufrieden mit sich selbst ist.", "Glück ist, wenn man zufrieden ist mit sich selbst.", "Glück ist, wenn ich etwas mit meinen Eltern machen kann.", "Glück ist, wenn ich etwas mit meinen Eltern mache.", "Glück ist, wenn ich mit meinen Eltern etwas machen kann.", "Glück ist, wenn ich mit meinen Eltern etwas mache.", "Glück ist, dass ich in Zukunft etwas aus mir machen werde.", "Glück ist, dass ich in Zukunft etwas aus mir mache.", "Glück ist, dass ich etwas aus mir machen werde in Zukunft.", "Glück ist, dass ich etwas aus mir mache in Zukunft.", "Glück ist, wenn ich jemanden habe, der mich liebt.", "Glück ist, wenn meine Tochter morgens aufwacht.", "Glück ist, wenn morgens meine Tochter aufwacht.", "Glück ist, an einem Tag wie heute hier stehen zu dürfen.", "Glück ist, an einem Tag wie heute hier zu stehen.", "Glück ist, hier an einem Tag wie heute stehen zu dürfen.", "Glück ist, hier an einem Tag wie heute zu stehen."]
    var selection = [];
    var random = getRandomInt(0, sents.length - 1);

    for(i = 0; i < 4; i++) {
        while ($.inArray(random, selection) > -1) {
            var random = getRandomInt(0, sents.length - 1);
        }
        selection.push(random);
        console.log(random);
        console.log(sents[random]);
    }

    var testtext = "";

    for(i = 0; i < selection.length; i++) {
        testtext += sents[selection[i]] + ' ';
    }
    $('#textbox').text(testtext);

    $.post( "/stanford_anfrage", { sentences: $('#textbox').text() }, function(json){

        $('#spinner').addClass('close');
        hideSpinner = setTimeout(function(){
            $('#spinner').hide();
        }, 450);

        var sentences = json.document.sentences.sentence;

        (function myLoop (i) {
            setTimeout(function () {
                var textarea = jQuery('<div/>', {
                    id: 'ta' + pad(i, 2),
                    class: 'textarea',
                    text: sentences[i].parse
                });
                var linebox = jQuery('<div/>', {
                    id: 'lb' + pad(i, 2),
                    class: 'linebox',
                });
                var loadarea = jQuery('<div/>', {
                    id: 'la' + pad(i, 2),
                    class: 'loadarea',
                });
                var loadbutton = jQuery('<div/>', {
                    id: 'lb' + pad(i, 2),
                    class: 'loadbutton',
                });
                var dataarea = jQuery('<div/>', {
                    id: 'da' + pad(i, 2),
                    class: 'dataarea',
                });
                var treedata = jQuery('<div/>', {
                    id: 'td' + pad(i, 2),
                    class: 'treedata',
                    text: JSON.stringify(sentences[i].parsedTree)
                });

                $(loadarea).append(loadbutton);
                $(linebox).append(textarea);
                $(linebox).append(loadarea);
                $(linebox).hide();
                $('#sentbox').append(linebox);
                $(linebox).fadeIn();
                $(dataarea).append(treedata);
                $(linebox).append(dataarea);

                $('.loadbutton').click(function(event) {
                    loadClick(event);
                });

                if (++i < sentences.length) myLoop(i);
            }, 50)
        })(0);

        for(i = 0; i < sentences.length; i++) {

        }
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