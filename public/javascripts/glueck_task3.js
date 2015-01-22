/**
 * Created by s2daalft on 19.08.2014.
 */

var Cell = function (i,j,k) {
    var x = i;
    var y = j;
    var char;
    var visible;
    var ofSol = -1 || k;
    var dir;
    var messageh;
    var messagev;

    this.setDirection = function (d) {
        dir = d;
    };

    this.getDirection = function () {
        return dir;
    };

    this.toString = function () {
        return "input type='text' maxlength=1 class='cell"+(visible?"":" invisible")+(this.isOfSol()?" ofsol":"")+"' id='" + i +"z"+ j + "'"+(this.isOfSol()?"alt='"+ofSol+"'":"");
    };

    this.setChar = function (c) {
        char = c;
    };

    this.getChar = function () {
        return char;
    };

    this.setVisible = function (b) {
        visible = b;
    };

    this.isVisible = function () {
        return visible;
    };

    this.isOfSol = function () {
        return (ofSol > -1);
    };

    this.getOfSol = function () {
        return ofSol;
    };

    this.setOfSol = function (s) {
        ofSol = s;
    };

    this.addMessage = function(m, dir) {
        if (dir === 'h') {
            messageh = m;
        } else {
            messagev = m;
        }
    };

    this.getMessages = function () {
        return [messageh, messagev];
    };

    this.getX = function () {
        return x;
    };

    this.getY = function () {
        return y;
    }
};

var XBreak = function () {
    this.toString = function () {
        return "break";
    }
};

var Grid = function (dimh, dimv) {
    var cells = [[]];
    var sizeh = dimh;
    var sizev = dimv;

    for (var i = 0; i < dimh; i++) {
        for (var j = 0; j < dimv; j++) {
            if (!cells[i]) {
                cells[i] = [];
            }
            cells[i][j] = new Cell(i,j);
        }
    }

    this.toString = function () {
        var out = "";
        for (var i = 0; i < cells.length; i++) {
            for (var j = 0; j < cells[i].length; j++) {
                out += "<"+cells[i][j].toString()+">";
            }
            out += "<br/>";
        }
        return out;
    };

    this.addWord = function (word, posx, posy, dir, message) {

        for (var i = 0; i < word.length; i++) {
            var deltah, deltav;

            if (dir === 'h') {
                deltah = posx ;
                deltav = posy + i;
            } else {
                deltah = posx + i;
                deltav = posy;
            }

            var current = cells[deltah][deltav];
            current.addMessage(message, dir);
            if (current.getChar()) continue;
            current.setDirection(dir);
            current.setVisible(true);
            current.setChar(word[i]);
        }
    };

    this.getNext = function (cell) {
        /.*(\d{1,2})z(\d{1,2}).*/.exec($(cell).attr("id"));
        var i = RegExp.$1;
        var j = RegExp.$2;

        var realCell = this.getCell(i,j);

        var dir = realCell.getDirection();

        if (dir === 'h') {
            j++;
        } else {
            i++;
        }
        if (i >= cells.length) {
            j++;
            i = i%cells.length;
        }
        if (j >= cells[i].length) {
            i++;
            j = j%cells[i].length;
        }
        return i+"z"+j;
    };

    this.getCell = function (i,j) {
        return cells[i][j];
    };

    this.existsLeftRight = function(i,j) {
        // TODO check for i j > 0 and i j < sizeh sizev
        // return true if there is a cell to the left or the right of these coordinates
    };

    this.existsUpDown = function(i,j) {
        // TODO check for i j > 0 and i j < sizeh sizev
        // return true if there is a cell to the top or the bottom of these coordinates
    };

    this.getCells = function() {
        return cells;
    }
};

var KWRController = function (model) {
    var grid = model;

    this.addWord = function (word, x, y, dir, m) {
        grid.addWord(word, x, y, dir, m);
    };

    this.getCell = function (x, y) {
        return grid.getCell(x, y);
    };

    this.getView = function () {
        return grid.toString();
    };

    this.getNext = function (cell) {
        return grid.getNext(cell);
    };

    this.setValue = function (v, x, y) {
        $('#' + x + "z" + y).val(v).attr("readonly", true);
    };

    this.getMessages = function (cell) {
        var x, y;
        /(\d{1,2})z(\d{1,2}).*/.exec($(cell).attr("id"));
        x = RegExp.$1;
        y = RegExp.$2;
        return grid.getCell(x, y).getMessages();
    };

    this.solveAll = function () {
        var array = grid.getCells();
        for (var i = 0; i < array.length; i++) {
            for (var j = 0; j < array[i].length; j++) {
                var cell = array[i][j];
                var ch = cell.getChar();
                var vc = $('#' + cell.getX() + "z" + cell.getY());
                vc.val(ch);
            }
        }
        for (var k = 0; k < 14; k++) {
            $('#'+(k+1)).val(r[r.length-1-k]);
        }
    };

    this.check = function () {
        var array = grid.getCells();
        for (var i = 0; i < array.length; i++) {
            for (var j = 0; j < array[i].length; j++) {
                var cell = array[i][j];
                var ch = cell.getChar();
                var vc = $('#' + cell.getX() + "z" + cell.getY());
                if (vc.is(":visible")) {
                    var ui = vc.val();
                    if (ui) {
                        if (new RegExp(ch, "i").test(ui)) {
                            if (vc.is(":read-only")) {}
                            else {
                                marktrue(vc);
                            }
                        } else {
                            markfalse(vc);
                        }
                    }
                }
            }
        }
    };

    function marktrue (cell) {
        if(cell.hasClass("wrong")) cell.removeClass("wrong");
        cell.addClass("right");
    }

    function markfalse (cell) {
        if(cell.hasClass("right")) cell.removeClass("right");
        cell.addClass("wrong");
    }
};

var r = ["T", "B", "A", "H", "E", "G", "N", "I", "E", "W", "H", "C", "S"];

$(document).ready(function() {
    var m = [
        "Wer fegt den Kamin?",
        "Wie viele Blätter muss ein Kleeblatt haben, um Glück zu bringen?",
        "Woraus bestehen die essbaren Schweine, die man an Neujahr verschenkt?",
        "\"Glück hat immer der gefunden, der sich seines Lebens ...\"",
        "Ein anderes Wort für \"schief gehen\" ist ...?",
        "Studenten der Uni Mannheim wünschen sich ein \"Ministerium für Glück und ...\"",
        "Welcher Glücksbringer ist der Schuh des Pferdes?",
        "In welchem Königreich gibt es ein Glücksministerium?",
        "Das Gegenteil von glücklich ist ...?",
        "Wodurch verschafft sich der Regisseur Harald Friedl einen Glücksmoment?",
        "Das Adjektiv zu Glück ist ...?",
        "Das Antonym von Glück ist ...?"
    ];
    var grid = new Grid(14,18);
    var controller = new KWRController(grid);
    controller.addWord("SCHORNSTEINFEGER",4,0,"h",m[0]);
    controller.addWord("VIER",1,4,"h",m[1]);
    controller.addWord("MARZIPAN",1,9,"h",m[2]);
    controller.addWord("FREUT",0,7,"v",m[3]);
    controller.addWord("MISSGLÜCKEN",0,13,"v",m[4]);
    controller.addWord("WOHLBEFINDEN",2,2,"v",m[5]);
    controller.addWord("HUFEISEN",8,0,"h",m[6]);
    controller.addWord("BHUTAN",6,2,"h",m[7]);
    controller.addWord("TRAURIG",3,4,"v",m[8]);
    controller.addWord("MUSIK",1,9,"v",m[9]);
    controller.addWord("GLÜCKLICH",8,9,"h",m[10]);
    controller.addWord("PECH",5,17,"v",m[11]);
    controller.getCell(1,6).setOfSol(9);
    controller.getCell(2,2).setOfSol(4);
    controller.getCell(4,0).setOfSol(1);
    controller.getCell(4,1).setOfSol(2);
    controller.getCell(4,2).setOfSol(10);
    controller.getCell(3,4).setOfSol(13);
    controller.getCell(5,4).setOfSol(11);
    controller.getCell(6,2).setOfSol(12);
    controller.getCell(7,2).setOfSol(5);
    controller.getCell(10,13).setOfSol(7);
    controller.getCell(8,9).setOfSol(8);
    controller.getCell(8,0).setOfSol(3);
    controller.getCell(9,2).setOfSol(6);

    $('#kwr').append(controller.getView());

    controller.setValue("Ü", 6 , 13);
    controller.setValue("Ü", 8 , 11);

    var sell = $('.cell');

    $('#info1').show().hover(
        function() {
            var a = $('<a href="#" class="redlink">Hilfe</a>');
            a.on("click", help);
            $(this).append(a);
        },
        function() {
            $(this).find("a:last").remove();
        }
    );

    $('#info2').show().hover(
        function() {
            var a = $('<a href="#" class="redlink">Lösung zeigen</a>');
            a.on("click", controller.solveAll);
            $(this).append(a);
        },
        function() {
            $(this).find("a:last").remove();
        }
    );

    sell.on("keyup", function(e) {
        var inp = String.fromCharCode(e.keyCode);
        if (/[a-zA-Zäöüß]/.test(inp))
            $("#"+controller.getNext(this)).focus();
    });

    $('.ofsol').on("blur", function() {
        var e = $(this);
        var n = e.attr("alt");
        var val = e.val();
        $('#'+n).val(val);
    });

    sell.on("contextmenu", function (e) {
        e.preventDefault();
        $(this).val("");
    });

    sell.on("focus", function() {
        removeMessages();
        showMessage(controller.getMessages(this));
    });

    function showMessage (array) {
        if (array[0]) {
            $('#hint').append($("<div class='hint' id='m"+ hash(array) +"'>"
                    + "<p class='dhead'><i class='fa fa-arrows-h'></i>&nbsp;HORIZONTAL&nbsp;<i class='fa fa-arrows-h'></i></p>"
                    +    "<p class='dbody'>"
                    + array[0]
                    +    "</p>"
                    + "</div>"
            ));
        }
        if (array[1]) {
            $('#hint').append($("<div class='hint' id='m"+ hash(array) +"'>"
                    + "<p class='dhead'><i class='fa fa-arrows-v'></i>&nbsp;VERTIKAL&nbsp;<i class='fa fa-arrows-v'></i></p>"
                    +    "<p class='dbody'>"
                    + array[1]
                    +    "</p>"
                    + "</div>"
            ));
        }
    }

    function removeMessages () {
        $('.hint').detach();
    }

    function hash(array) {
        var hashsum = 0;
        var i;
        if (array[0]) {
            for (i = 0; i < array[0].length; i++) {
                hashsum += 37*array[0].charCodeAt(i);
            }
        }
        if (array[1]) {
            for (i = 0; i < array[1].length; i++) {
                hashsum += 103*array[1].charCodeAt(i);
            }
        }
        return hashsum;
    }

    $('#balken').click(function() {
        controller.solveAll();
    });

    $('.scell').on("keyup", function(e) {
        var inp = String.fromCharCode(e.keyCode);
        if (/[a-zA-Zäöüß]/.test(inp)) {
            $("#"+(parseInt(this.id)+1)).focus();
        }
        if(checkScell()) {
            showConfirmSolution();
        } else {
            hideConfirmSolution();
        }
    });

    $('#check').click(function() {
        controller.check();
    });

    function checkScell() {
        var scells = $('.scell').toArray();
        for (var i = 0; i < scells.length; i++) {
            if (!$(scells[i]).val()) {
                return false;
            }
        }
        return true;
    }

    function hideConfirmSolution() {
        var cs = $('#cs');
        if(cs.length) cs.detach();
    }

    function showConfirmSolution() {
        var cs = $('#cs');
        if(cs.length) return;
        $('#solve').after("<div class='buttondiv' id='cs'>LÖSUNG BESTÄTIGEN</div>");
        $('#cs').on("click", function() {
           if(checkSolution()) {
               $.jqDialog.alert("Gut gemacht!", function() {}); // add callback with effects?
           } else {
               $.jqDialog.alert("Das ist leider nicht die richtige Lösung!", function() {});
           }
        });
    }

    function checkSolution() {
        var scells = $('.scell').toArray();
        var ms = r.reverse();
        for (var i = 0; i < scells.length; i++) {
            if ($(scells[i]).val().toUpperCase() !== ms[i]) {
                return false;

            }
        }
        return true;
    }

    function help () {
        $.jqDialog.alert(null, "bla");
    }
});