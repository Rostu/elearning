/**
 * Created by s2daalft on 23.07.2014.
 */
// TASK 3

$(document).ready(function() {
    var t3w1 = ["anregend",  "ansprechend",  "einnehmend",  "einträglich",  "entwaffnend",  "erstaunlich",  "ertragreich",  "gewinnbringend",  "informativ",  "lohnend",  "reizvoll",  "unterhaltsam",  "vielsagend",  "wissenswert"];
    var t3w2 = ["alltäglich",  "belanglos",  "einfallslos", "einschläfernd",  "eintönig",  "ermüdend",  "fade",  "langweilig", "monoton",  "öde",  "phantasielos",  "reizlos",  "trist",  "unbedeutend",  "unwichtig"];
    var cont = $('.worddrag');
    var t3w = [];

    for (var i = 0; i < t3w1.length; i++) {
        t3w.push(makeDiv(t3w1[i], i));
    }
    for (i = 0; i < t3w2.length; i++) {
        t3w.push(makeDiv(t3w2[i], i));
    }
    //t3w = shuffle(t3w);

    for (i = 0; i < t3w.length; i++) {
        cont.append(t3w[i]);
    }

    $('.word').draggable({revert: "invalid"});

    $('.target').droppable({drop: function(e,ui) {
        $(ui.draggable).attr("style","").appendTo($(this));

    }});

    function makeDiv(a, i) {
        return "<div class='word' id='w"+ (i+1) +"'>" + a + "</div>";
    }

    function shuffle(array) {
        var counter = array.length, temp, index;
        while (counter > 0) {
            index = Math.floor(Math.random() * counter);
            counter--;
            temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
        return array;
    }


});

function validate () {
    var syn = $('#synonym');
    var ant = $('#antonym');
    var b1 = /anregend/.test(jvalidate($(syn[0])));
    var b2 = /öde/.test(jvalidate($(ant[0])));
    var b3 = !(kvalidate($('.worddrag')).length);
    if (!b3) {
        showModal("Bitte ordne alle Wörter zu!");
    }
    var b4 = ivalidate(kvalidate(syn));
    var b5 = ivalidate(kvalidate(ant));
    if (b1 && b2 && b3 && b4 && b5) {
        window.location.href = "/ersti_task3b";
    }
}

function ivalidate(b) {
    return b.reduce(function(a,e){
        if($.inArray(e.id, a) > -1){
            return false;
        }
        a.push(e.id);
        return a;
    },[]);
}

function jvalidate(c) {
    return c.children('.word').toArray().map(function(e){return $(e).text();}).join("");
}

function kvalidate(d) {
    return $(d[0]).children().toArray();
}

function showModal(msg) {
    alert(msg);
}