/**
 * Created by s2daalft on 23.07.2014.
 */
$(document).ready(function() {
    // TASK 4
    var a = ['planlos','auf Anhieb','strömen','reibungslos verläuft','flach fällt',
        'herumgeistern','mitteilungsbedürftig','sehr klein vorkommen','bevorstehende'];
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
        switch(checkSituation()) {
            case 0:
                alert("Bitte fülle alle Lücken aus!");
                return;
            case 1:
                alert("Die Lösung ist leider nicht richtig!");
                return;
            case 2:

            default: break;
        }

            var right = $('.slot').toArray().filter(function(e){return $(e).is(":disabled")});
            var wrong = $('.slot').toArray().filter(function(e){return !$(e).is(":disabled")});
            var percent = (right/(right+wrong)) * 100;
            setScore("4", percent);
            document.location.href = "/ersti_end";

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
            if (!$(s[i]).is(":disabled") && !$(s[i]).val()) {
                return 0;
            } else if (!$(s[i]).is(":disabled")) {
                return 1;
            }
        }
        return 2;
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