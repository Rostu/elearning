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

    this.addWord = function (word, posx, posy, dir) {

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
    }
};

$(document).ready(function() {
    var grid = new Grid(14,18);
    grid.addWord("SCHORNSTEINFEGER",4,0,"h");
    grid.addWord("VIER",1,4,"h");
    grid.addWord("MARZIPAN",1,9,"h");
    grid.addWord("FREUT",0,7,"v");
    grid.addWord("MISSGLÜCKEN",0,13,"v");
    grid.addWord("WOHLBEFINDEN",2,2,"v");
    grid.addWord("HUFEISEN",8,0,"h");
    grid.addWord("BHUTAN",6,2,"h");
    grid.addWord("TRAURIG",3,4,"v");
    grid.addWord("MUSIK",1,9,"v");
    grid.addWord("GLÜCKLICH",8,9,"h");
    grid.addWord("PECH",5,17,"v");
    grid.getCell(1,6).setOfSol(9);
    grid.getCell(2,2).setOfSol(4);
    grid.getCell(4,0).setOfSol(1);
    grid.getCell(4,1).setOfSol(2);
    grid.getCell(4,2).setOfSol(10);
    grid.getCell(3,4).setOfSol(13);
    grid.getCell(5,4).setOfSol(11);
    grid.getCell(6,2).setOfSol(12);
    grid.getCell(7,2).setOfSol(5);
    grid.getCell(10,13).setOfSol(7);
    grid.getCell(8,9).setOfSol(8);
    grid.getCell(8,0).setOfSol(3);
    grid.getCell(9,2).setOfSol(6);
    $('#kwr').append(grid.toString());
    var sell = $('.cell');
    sell.on("keyup", function(e) {
        var inp = String.fromCharCode(e.keyCode);
        if (/[a-zA-Zäöüß]/.test(inp))
            $("#"+grid.getNext(this)).focus();
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

});