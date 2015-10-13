glueck_definition_levelcount = {};

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

        $.getJSON("javascripts/glueck_definition_model_trees.json", function(model_trees) {

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

                $.getJSON("javascripts/glueck_definition_model_prunes.json", function(model_prunes) {

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
                        $.getJSON("javascripts/glueck_definition_model_subtrees.json", function (model_subtrees) {
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



//helper functions

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