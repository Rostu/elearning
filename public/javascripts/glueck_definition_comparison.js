glueck_definition_levelcount = {};

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

function validate_parse(tree, callback) {

    console.log("valenter");

    console.log(JSON.stringify(tree));

    glueck_definition_levelcount = {};

    var pruned_input_clone = prune_leaves($.extend(true, {}, tree));
    var enhanced_pruned_tree_clone = enhance_tree(pruned_input_clone, 0);

    get_comparison_data(enhanced_pruned_tree_clone, function(input_data) {

        console.log(JSON.stringify(input_data));

        $.getJSON("javascripts/glueck_definition_model_trees.json", function(model_trees) {

            console.log("glueck_definition_model_trees");

            var model_depths = $.map(model_trees, function(tree, tree_index) {
                return tree["depth"];
            });

            var relevant_indexes = $.map(model_depths, function (depth, index) {
                if (depth == enhanced_pruned_tree_clone["depth"]) {
                    return index;
                }
            });

            if (relevant_indexes.length == 0) {

                console.log("no indexes");

                if (enhanced_pruned_tree_clone["depth"] < Math.min.apply(Math, model_depths)) {
                    callback("Du hast keinen gültigen Nebensatz gebildet. Überprüfe, ob deine Eingabe die Definitionseinleitung mit einem vollständigen Konditional-, Infinitiv- oder Objektsatz ergänzt.");
                } else {
                    if (enhanced_pruned_tree_clone["depth"] > Math.max.apply(Math, model_depths)) {
                        callback("Dein Nebensatz ist zu komplex. Versuche es mit einer vereinfachten Variante deiner Eingabe, indem du z.B. Attribute oder Relativsätze weglässt.");
                    }
                }
            } else {
                console.log("relevant_indexes: " + JSON.stringify(relevant_indexes));

                $.getJSON("javascripts/glueck_definition_model_prunes.json", function(model_prunes) {

                    console.log("glueck_definition_model_prunes");

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
                        callback("Nebensatzkonstruktion stimmt leider nicht mit den Vorlagen überein, die du in der vorherigen Aufgabe kennengelernt hast.");
                    } else {
                        $.getJSON("javascripts/glueck_definition_model_subtrees.json", function (model_subtrees) {

                            console.log("glueck_definition_model_subtrees");

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
                                callback("Deine Nebensatzkonstruktion stimmt leider nicht mit den Vorlagen überein, die du in der vorherigen Aufgabe kennengelernt hast.");
                            }else {
                                callback();
                                console.log("Sentence is fine!");
                            }
                        });
                    }
                });
            }
        });
    });
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

    if (!glueck_definition_levelcount["level"]) {
        glueck_definition_levelcount["level"] = 0;
    }

    tree["level"] = level;
    if (!tree["count"]) {
        tree["count"] = glueck_definition_levelcount["level"];
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
            glueck_definition_levelcount["level"] += 1;

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
