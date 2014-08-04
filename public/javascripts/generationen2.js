/**
 * Created by David on 03.08.2014.
 */
$(document).ready(function() {
    var a = ["Friedhofs-",
    "Erwachsen-",
    "Auseinander-",
    "Schul-",
    "Leistungs-",
    "Kontakt-",
    "Flucht-",
    "Steh-",
    "Party-"];
    var b = ["-gemüse",
        "-werden",
        "-klaffen",
        "-zeit",
        "-bereitschaft",
        "-freude",
        "-röhre",
        "-vermögen",
        "-fummel"];
    var c = [];
    for (var i = 0; i < a.length; i++) {
        c.push(makeTok(a[i], i));
    }
    c = shuffle(c);
    for (i = 0; i < c.length; i++) {
        $('#ltext').append(c[i]);
    }
    c = [];
    for (i = 0; i < b.length; i++) {
        c.push(makeTok(b[i],i));
    }
    c = shuffle(c);
    for (i = 0; i < c.length; i++) {
        $('#rtext').append(c[i]);
    }

    $('.tok').draggable({revert:'invalid'});
    $('.drop2').droppable({drop: function(e,ui) {
        var drag = $(ui.draggable).attr("style","").attr("style","position:relative");
        var parent = drag.parent();
        drag.detach();
        var num = this.id.substring(1);
        var other = "a" + (num==2?"1":"2");
        if (parent[0].id.substring(0,1)==="l") {
            if (num == 2) {
                // flash red
                parent.append(drag);
                return;
            }
        }
        if (parent[0].id.substring(0,1)==="r") {
            if(num == 1) {
                // flash red
                parent.append(drag);
                return;
            }
        }
        $(this).text(drag.text());

        // check if other box is filled
        // -> get this box name

        if ($('#'+other).text()) {
            // validate

        }
        console.log(other);
        // if wrong, return drag to container

    }});
    function shuffle(array) {
        var counter = array.length, temp, index;
        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            index = Math.floor(Math.random() * counter);
            // Decrease counter by 1
            counter--;
            // And swap the last element with it
            temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
        return array;
    }

    function makeTok(a, i) {
        return "<div class='tok' id='t" + (i+1) + "'>" + a + "</div>";
    }
});