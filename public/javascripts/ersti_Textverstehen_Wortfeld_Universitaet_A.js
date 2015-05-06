    (function($)
{
    $(document).ready(function() {
        var a = ['Universität', 'Lageplan', 'A-Gebäude', 'Seminar', 'Studenten', 'Erstsemesterstudenten',
            'Unigelände', 'Unigebäude', 'Seminarraum', 'Uni', 'Campus', 'Erstis', 'Kommilitonen', 'Dozenten', 'Veranstaltung', 'Unizeit', 'Unitag', 'Semester'];

        var slots = $('.slot');
        slots.on("blur", function() {
            validate(this);
        });

        $("#info3").show();
        /**$('#weiter').on("click", function(e) {
            if (!checkSituation()) {
                e.preventDefault(); // Stops the browser from opening the next page, using the href attribute on the <a> element
                alert("Bitte fülle genügend Lücken aus! Es werden mindestens 13 richtige Antworten benötigt");
            }
        });**/

        function validate(self) {
            var t = $(self).val();
            var i = a.indexOf(t);
            console.log(t);
            console.log(a[i]);
            console.log(i);
            if (t.length == 0) return;
            if (a.indexOf(t) > -1 && t != "") {
                $(self).addClass("passive");
                $(self).animate({
                    borderBottomColor: "#7cfc00",
                    borderTopColor: "#7cfc00",
                    backgroundColor: "#fff"
                }, "slow");
                $(self).prop('disabled', true);
                $(".inline[id=" + a[i] + "]").css('color', 'green');
                a.splice(i, 1); // Delete the found word from the list of correct words
                raisepoints();
                removeNoticeIfPresent();

            } else {
                if (checkForSpelling(t)) {
                    removeNoticeIfPresent();
                    $("#info3").append("<p>ladidadida</p>");
                    console.log("wort halbrichtig")
                } else {
                    // if we reach this point, the word didn't match any word
                    removeNoticeIfPresent();
                    $(self).effect("pulsate", "fast");
                    raisefaults();
                    $(self).animate({
                        borderBottomColor: "#ff0000",
                        borderTopColor: "#ff0000",
                        backgroundColor: "#ff8484"
                    }, 2000, "swing", function () {
                        $(this).css({
                            "border-top": "1px solid #c0c0c0",
                            "border-bottom": "1px solid #c0c0c0", "background-color": "#fff"
                        });
                    });

                }


            }
        }
        function checkForSpelling(word) {
            var ret = false;
            a.forEach(function(elem) {
                if(getEditDistance(word,elem)<= 3){
                    //console.log(getEditDistance(word,testword) + " " +testword);
                    ret = true;
                }
            });

            return ret;
        }

        function checkSituation () {
            var allSlots = $('.slot');
            var disabledSlots = $('.slot:disabled');
            var requiredCorrectAnswers = allSlots.length - 4;

            return disabledSlots.length >= requiredCorrectAnswers;
        }
    });
})(jQuery);