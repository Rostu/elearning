/**
 * Created by David on 03.08.2014.
 */
$(document).ready(function() {
    var a = ["alten Kompostis", "langweilig", "Abstellgreis", "Friedhofsgemüse", "Verwesungsanwärter", "jung im Kopf", "muffelig", "stark geprägt durch strenge Erziehung",
        "Respekt vor Autoritäten", "Leistungsbereitschaft", "Werteorientierung", "starken Zusammenhalt"
    ];
    var b = ["auf einem anderen Stern", "digitales Dauerdaddeln", "Kontaktfreude", "Freiheit", "Genussorientierung", "hedonistischer", "freiheitsorientierter",
        "egoistisch", "Nachwuchs", "Pubertät", "Sprösslinge", "pubertierenden Heranwachsenden"
    ];
    var c = $('#wordselect');
    var d = [];
    for (var i = 0; i < a.length; i++) {
        d.push(makeDiv(a[i],i));
    }
    for (i = 0; i < b.length; i++) {
        d.push(makeDiv(b[i],i));
    }
    d = shuffle(d);
    for (i = 0; i < d.length; i++) {
        c.append(d[i]);
    }
    $('.word').draggable({revert:'invalid'});
    $('.drop').droppable({drop: function(e,ui) {
        var elem = $(ui.draggable).attr("style","").addClass("revertable").attr("style","position:relative").detach();
        $(this).append(elem);
    }});

    $('#check').click(function() {
        $('#jung').children('.word').toArray().map(function(e) {
            if ($.inArray($(e).text(), a) > -1) {
                markfalse($(e));
            } else {
                marktrue($(e));
            }
        });
        $('#alt').children('.word').toArray().map(function(e) {
            if($.inArray($(e).text(), b) > -1) {
                markfalse($(e));
            } else {
                marktrue($(e));
            }
        });
    });

    $('#weiter').click(function() {
        $('#check').click();
        // TODO
        // Validierung verbessern
        if ($('.wrong').toArray().length > 0) {
            alert("Bitte entferne die falschen Antworten");
        } else {
            alert("Weiter so");
            document.location.href = "generationen_task4";
        }
    });

    $(document).on("contextmenu",".revertable",function(e){
        var ct = $(e.currentTarget);
        if (ct.hasClass("wrong")) ct.removeClass("wrong");
        c.append(ct.removeClass("revertable").detach());
        return false;
    });

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

    function markfalse (e) {
        if (e.hasClass("wrong")) return;
        if (e.hasClass("right")) e.removeClass("right");
        e.addClass("wrong");
    }

    function marktrue(elem) {
        if (elem.hasClass("right")) return;
        if (elem.hasClass("wrong")) elem.removeClass("wrong");
        elem.addClass("right");
    }
});
