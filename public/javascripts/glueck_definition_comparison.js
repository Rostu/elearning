glueck_definition_levelcount = {};

function getComparisonData(enhanced_pruned_tree_clone, callback) {

    /*  acquire data from input parse for comparison with model data
     */

    var data = {};

    data["subtrees"] = getSubtrees(enhanced_pruned_tree_clone);
    data["subtrees"].sort(dynamicSort("depth"));

    data["subset_trees"] = $.map(data["subtrees"], function(prune, prune_index) {
        var sth_array = $.map(getSubsetTrees(prune), function( sth, sth_index) {
            return enhanceTree(sth, sth["level"]);
        });
        sth_array.sort(dynamicSort("desc")).sort(dynamicSort("depth"));

        return [sth_array];
    });

    callback(data);
}

function validateParse(tree, callback) {

    /*  validate parse by comparing it with the model data
     */

    glueck_definition_levelcount = {};

    var pruned_input_clone = pruneLeaves($.extend(true, {}, tree));
    var enhanced_pruned_tree_clone = enhanceTree(pruned_input_clone, 0);

    getComparisonData(enhanced_pruned_tree_clone, function(input_data) {
        /*  compare tree depths first and store relevant indexes
         */
        $.getJSON("javascripts/glueck_definition_model_trees.json", function(model_trees) {

            var model_depths = $.map(model_trees, function(tree, tree_index) {
                return tree["depth"];
            });

            var relevant_indexes = $.map(model_depths, function (depth, index) {
                if (depth == enhanced_pruned_tree_clone["depth"]) {
                    return index;
                }
            });

            if (relevant_indexes.length == 0) {
                if (enhanced_pruned_tree_clone["depth"] < Math.min.apply(Math, model_depths)) {
                    callback("Du hast keinen gültigen Nebensatz gebildet. Überprüfe, ob deine Eingabe die Definitionseinleitung mit einem vollständigen Konditional-, Infinitiv- oder Objektsatz ergänzt.");
                } else {
                    if (enhanced_pruned_tree_clone["depth"] > Math.max.apply(Math, model_depths)) {
                        callback("Dein Nebensatz ist zu komplex. Versuche es mit einer vereinfachten Variante deiner Eingabe, indem du z.B. Attribute oder Relativsätze weglässt.");
                    }
                }
            } else {
                /*  compare subtrees and store remaining relevant indexes
                 */
                $.getJSON("javascripts/glueck_definition_model_subtrees.json", function(model_subtrees) {

                    relevant_indexes = relevant_indexes.filter(function (tree_index) {

                        var model_subtree_root_strings = $.map(model_subtrees[tree_index], function (subtree, subtree_index) {
                            return getRootString(subtree, true, false);
                        });

                        var input_subtree_root_strings = $.map(input_data["subtrees"], function (subtree, subtree_index) {
                            return getRootString(subtree, true, false);
                        });

                        var to_diff = [model_subtree_root_strings, input_subtree_root_strings]
                        to_diff.sort(function(a, b){
                            return a.length - b.length;
                        });

                        var subtree_diff = to_diff[1].filter(function(mprs) {
                            return to_diff[0].indexOf(mprs) < 0;
                        });
                        return subtree_diff.length == 0;
                    });
                    if (relevant_indexes.length == 0) {
                        callback("Nebensatzkonstruktion stimmt leider nicht mit den Vorlagen überein, die du in der vorherigen Aufgabe kennengelernt hast.");
                    } else {
                        /*  compare subset_trees and store remaining relevant indexes,
                         *  only allowing deviations where shallow subset trees allow it
                         */
                        $.getJSON("javascripts/glueck_definition_model_subset_trees.json", function (model_subset_trees) {

                            relevant_indexes = relevant_indexes.filter(function (tree_index) {

                                var index_status = true;

                                var shallow_subtree_indexes = $.map(model_subtrees[tree_index], function (subtree, subtree_index) {
                                    if (model_subtrees[tree_index][subtree_index]["depth"] == 1) {
                                        return subtree_index;
                                    }
                                });

                                $.each(model_subtrees[tree_index], function (subtree_index, subtree) {
                                    $.each(model_subset_trees[tree_index][subtree_index], function (sst_index, sst) {

                                        if (!(printTree(sst, true, true) === (printTree(input_data["subset_trees"][subtree_index][sst_index], true, true)))) {
                                            var relevant_shallow_subtrees = shallow_subtree_indexes.filter(function (subtree_index) {
                                                var subtree_root_str = getRootString(model_subtrees[tree_index][subtree_index], true, false);
                                                return printTree(sst, true, false).indexOf(subtree_root_str) > -1;
                                            });
                                            if (relevant_shallow_subtrees && relevant_shallow_subtrees.length == 0) {
                                                index_status = false;
                                            }
                                        }
                                    });
                                });
                                return index_status;
                            });

                            if (relevant_indexes.length == 0) {
                                callback("Deine Nebensatzkonstruktion stimmt leider nicht mit den Vorlagen überein, die du in der vorherigen Aufgabe kennengelernt hast.");
                            }else {
                                callback();
                            }
                        });
                    }
                });
            }
        });
    });
}

function validateParseWithLogs(tree, callback) {

    /*  validate parse by comparing it with the model data
     */

    console.log("valenter");

    console.log(JSON.stringify(tree));

    glueck_definition_levelcount = {};

    var pruned_input_clone = pruneLeaves($.extend(true, {}, tree));
    var enhanced_pruned_tree_clone = enhanceTree(pruned_input_clone, 0);

    getComparisonData(enhanced_pruned_tree_clone, function(input_data) {

        /*  compare tree depths first and store relevant indexes
         */

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
                if (enhanced_pruned_tree_clone["depth"] < Math.min.apply(Math, model_depths)) {
                    callback("Du hast keinen gültigen Nebensatz gebildet. Überprüfe, ob deine Eingabe die Definitionseinleitung mit einem vollständigen Konditional-, Infinitiv- oder Objektsatz ergänzt.");
                } else {
                    if (enhanced_pruned_tree_clone["depth"] > Math.max.apply(Math, model_depths)) {
                        callback("Dein Nebensatz ist zu komplex. Versuche es mit einer vereinfachten Variante deiner Eingabe, indem du z.B. Attribute oder Relativsätze weglässt.");
                    }
                }
            } else {


                console.log("relevant_indexes: " + JSON.stringify(relevant_indexes));

                /*  compare subtrees and store remaining relevant indexes
                 */

                $.getJSON("javascripts/glueck_definition_model_subtrees.json", function(model_subtrees) {

                    console.log("glueck_definition_model_subtrees");

                    relevant_indexes = relevant_indexes.filter(function (tree_index) {

                        console.log("-x- processing tree #" + tree_index + ":");

                        var model_subtree_root_strings = $.map(model_subtrees[tree_index], function (subtree, subtree_index) {
                            return getRootString(subtree, true, false);
                        });
                        console.log("-|- model_subtrees:" + JSON.stringify(model_subtree_root_strings));

                        var input_subtree_root_strings = $.map(input_data["subtrees"], function (subtree, subtree_index) {
                            return getRootString(subtree, true, false);
                        });
                        console.log("-|- input_subtrees:" + JSON.stringify(input_subtree_root_strings));

                        var to_diff = [model_subtree_root_strings, input_subtree_root_strings]
                        to_diff.sort(function(a, b){
                            return a.length - b.length;
                        });

                        var subtree_diff = to_diff[1].filter(function(mprs) {
                            return to_diff[0].indexOf(mprs) < 0;
                        });
                        console.log("-|- subtree_diff: " + JSON.stringify(subtree_diff));

                        return subtree_diff.length == 0;

                    });

                    console.log("relevant_indexes: " + JSON.stringify(relevant_indexes));

                    if (relevant_indexes.length == 0) {
                        callback("Nebensatzkonstruktion stimmt leider nicht mit den Vorlagen überein, die du in der vorherigen Aufgabe kennengelernt hast.");
                    } else {

                        /*  compare subset_trees and store remaining relevant indexes,
                         *  only allowing deviations where shallow subset trees allow it
                         */

                        $.getJSON("javascripts/glueck_definition_model_subset_trees.json", function (model_subset_trees) {

                            console.log("glueck_definition_model_subtrees");

                            relevant_indexes = relevant_indexes.filter(function (tree_index) {

                                var index_status = true;
                                console.log("--- -x- processing tree \##{tree_index}:");

                                var shallow_subtree_indexes = $.map(model_subtrees[tree_index], function (subtree, subtree_index) {
                                    if (model_subtrees[tree_index][subtree_index]["depth"] == 1) {
                                        return subtree_index;
                                    }
                                });
                                console.log("--- -|- shallow_subtree_indexes: " + JSON.stringify(shallow_subtree_indexes));

                                $.each(model_subtrees[tree_index], function (subtree_index, subtree) {
                                    $.each(model_subset_trees[tree_index][subtree_index], function (sst_index, sst) {

                                        console.log("--- -|x " + printTree(sst, true, false));
                                        console.log("--- -|x " + printTree(input_data["subset_trees"][subtree_index][sst_index], true, false));

                                        if (printTree(sst, true, true) === (printTree(input_data["subset_trees"][subtree_index][sst_index], true, true))) {
                                            console.log("--- -|| Comparison is fine!");
                                        } else {
                                            var relevant_shallow_subtrees = shallow_subtree_indexes.filter(function (subtree_index) {

                                                var subtree_root_str = getRootString(model_subtrees[tree_index][subtree_index], true, false);

                                                console.log("--- -|x subtree_root_str:" + subtree_root_str);
                                                return printTree(sst, true, false).indexOf(subtree_root_str) > -1;
                                            });

                                            console.log("--- -|| relevant_shallow_subtrees: " + JSON.stringify(relevant_shallow_subtrees));

                                            if (relevant_shallow_subtrees && relevant_shallow_subtrees.length == 0) {
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

function getSubtrees(tree) {

    /*  collect every node with all of its descendants if it has any
     */

    var output = [];

    if (tree["children"]) {

        output.push(tree);

        $.each(tree["children"], function (index, child) {
            output = output.concat(getSubtrees(child));
        });
        return output;
    } else {
        return output;
    }
}

function getSubsetTrees(tree) {

    /*  recursively collecting all subset trees by generating
     *  all possible inspection variants of descendants
     */

    var base = $.extend(true, {}, tree);
    delete base["children"];

    if (tree["children"]) {

        var collection = [];

        /*  divide: for current node:
         *      - get variants of children
         */
        $.each(tree["children"], function (index, child) {
            collection[index] = getSubsetTrees(child);
        });

        /*  divide: for current node:
         *      - set current node as the parent of these combinations
         */
        var cartesian = cartesianProduct(collection);

        /*  conquer:
         *      - get all unique combinations of these variants
         */
        cartesian = cartesian.map(function(cp) {
            var new_op = $.extend(true, {}, base);
            new_op["children"] = cp;
            return new_op;
        });

        /*  conquer:
         *      - add current node with 'collapsed' descendants
         */
        cartesian.push(base);
        /*  conquer:
         *      - pass these variants on to the children-variant collection
         *        of the next ancestor
         */
        return cartesian;

    } else {
        var output = [];
        output.push(base);
        return output;
    }

}

function enhanceTree(tree, level) {

    /*  add several indexes to each node for sake of comparison:
     *      - level
     *      - horizontal index/position on tree level
     *      - child index(relative to parent node)
     *      - depth of subtree belonging to current node
     *      - number of descendants
     */

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

            var callback = enhanceTree(child, level);
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

function pruneLeaves(tree) {

    /*  cut off word level from tree
     */

    if (tree["children"]) {
        $.each(tree["children"], function (index, child) {
            if (child["children"]) {
                var callback = pruneLeaves(child);
            } else {
                if (child["word"]) {
                    delete tree["children"];
                }
            }
        });
    }
    return tree;
}

function printTree(tree, with_depth, with_desc) {

    var output = [];
    output.push(getRootString(tree, with_depth, with_desc));

    if (tree["children"]) {
        $.each(tree["children"], function(index, child) {
            output.push(printTree(child, with_depth, with_desc));
        });
        return ["(", output.join(""), ")"].join("");
    } else {
        return ["(", output.join(""), ")"].join("");
    }

}

function getRootString(tree, with_depth, with_desc) {

    var output = [];

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
function cartesianProduct(two_dim_arr) {
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

function dynamicSort(property) {
    var sort_order = 1;
    if(property[0] === "-") {
        sort_order = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sort_order;
    }
}
