$(document).ready(function() {
    var a = ['Universität', 'Lageplan', 'A-Gebäude', 'Seminar', 'Studenten', 'Erstsemesterstudenten',
             'Unigelände', 'Unigebäude', 'Seminarraum', 'Uni', 'Campus', 'Erstis', 'Kommilitone', 'Dozenten', 'Veranstaltung', 'Unizeit', 'Unitag'];
    var w = $('.words');
    var b = [];
    for (var i = 0; i < a.length; i++) {
        b.push(makeDiv(a[i], i));
    }
    b = shuffle(b);
    for (i = 0; i < b.length; i++) {
        //w.append(makeDiv(a[i], i));
        w.append(b[i]);
    }
    var slots = $('.slot');
    slots.on("blur", function() {
        validate(this);
    });

    $('#weiter').on("click", function() {
        if (!checkSituation()) {
            alert("Bitte fülle alle Lücken aus!");
        } else {
            document.location.href = "/ersti_e  nd";
        }
    });
    function makeDiv(a, i) {
        return "<div class='word' id='w"+ (i+1) +"'>" + a + "</div>";
    }

    function validate(self) {
        var t = $(self).val();
        if (t.length == 0) return;
        // try get word div if present
        var id = self.id;
        var w = $('.word');
        for (var i = 0; i < w.length; i++) {

            if ($(w[i]).text()===t) {
                $(w[i]).addClass("passive");
                checkMark(w[i].id.substring(1), id.substring(1), self);

                return;
            }
        }
        // if we reach this point, the word didn't match any word
        $(self).effect("pulsate", "fast");

        $(self).animate({borderBottomColor: "#ff0000", borderTopColor: "#ff0000", backgroundColor: "#ff8484"},2000,"swing",function() {
            $(this).css({"border-top": "1px solid #c0c0c0",
                "border-bottom": "1px solid #c0c0c0", "background-color": "#fff"});
        });

    }

    function checkMark(a,b,m) {

        if(!(a-b)) {
            $(m).animate({borderBottomColor: "#7cfc00", borderTopColor: "#7cfc00", backgroundColor:"#fff"}, "slow");
            $(m).prop('disabled', true);
        }

    }

    function checkSituation () {
        var s = $('.slot');
        for (var i = 0; i < s.length; i++) {

            if (!$(s[i]).is(":disabled")) return false;
        }
        return true;
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