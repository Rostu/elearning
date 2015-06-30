(function($)
{
    $(document).ready(function() {
        var a_Veranstaltung = ["Seminar", "Übung", "Vorlesung", "Tutorium", "Kolloquium", "Konferenz", "Workshop"];
        var a_Personal = ["Dozent", "Professor", "Sekretärin", "Prof", "HiWi", "Tutor", "Lehrer", "Hausmeister"];
        var a_Lerner = ["Lerner", "Bachelor", "Master", "Absolvent", "Student", "Erstsemesterstudent", "Ersti", "Kommilitone"];
        var a_shortcut = ["Prof", "HiWi", "Ersti"];
        var g = ["Prof", "HiWi", "Ersti", "Lerner", "Bachelor", "Master", "Absolvent", "Student", "Erstsemesterstudent", "Ersti", "Kommilitone", "Dozent", "Professor", "Sekretärin", "Prof", "HiWi", "Tutor", "Lehrer", "Hausmeister","Seminar", "Übung", "Vorlesung", "Tutorium", "Kolloquium", "Konferenz", "Workshop"];

        var slots = $('.slot');
        slots.on("blur", function() {
            validate(this);
        });

        /**$('#weiter').on("click", function(e) {
            if (!checkSituation()) {
                e.preventDefault(); // Stops the browser from opening the next page, using the href attribute on the <a> element
                alert("Bitte fülle genügend Lücken aus! Es werden mindestens 21 korrekte Antworten benötigt.");
            }
        });**/
        $("#info3").show();


        function validate(self) {
            var a = g;
            var t = $(self).val();
            if (t.length == 0) return;
            if(checkForSpelling(t)){
                removeNoticeIfPresent();
                if ($(self).hasClass("Veranstaltung")) {
                    a = a_Veranstaltung;
                }
                else if ($(self).hasClass("Personal")) {
                    a = a_Personal;
                }
                else if ($(self).hasClass("Lerner")) {
                    a = a_Lerner;
                }
                else if ($(self).hasClass("shortcut")) {
                    a = a_shortcut;
                    var t_a = $(self).val();
                    if (t_a.length == 0) return;
                    for (var i = 0; i < a.length; i++) {

                        if (a[i] === t_a) { // If word in array matches the word in the input field
                            raisepoints();
                            $(self).prop('disabled', true);
                            $(".inline_big.hidden[id=" + a[i] + "]").css("visibility", "visible").css("color", "green"); // marks the correct written word green in the Text and set it to visible
                            a.splice(i, 1); // Delete the found word from the list of correct words
                            return;
                        }
                    }
                }
            }

            for (var i = 0; i < a.length; i++) {

                if (a[i] === t) { // If word in array matches the word in the input field
                    raisepoints();
                    $(self).addClass("passive");
                    $(self).animate({
                        borderBottomColor: "#7cfc00",
                        borderTopColor: "#7cfc00",
                        backgroundColor: "#fff"
                    }, "slow");
                    $(self).prop('disabled', true);
                    $(".inline_big[id=" + a[i] + "]").css('color', 'green'); // marks the correct written word green in the Text
                    a.splice(i, 1); // Delete the found word from the list of correct words
                    return;
                }
            }

            if(checkForExactWord(t)){
                $("#info3").append("<p>Das Wort gehört nicht in diese Spalte</p>");
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
                return;
            }

            if(checkForSpelling(t)){
                $("#info3").append("<p>Überprüfe nocheinmal deine Rechtschreibung</p>");
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
                return;
            }

            // if we reach this point, the word didn't match any word
            removeNoticeIfPresent();
            $("#info3").append("<p>Diese Antwort gehört nicht zum Wortfeld Universität</p>");
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

        function checkForSpelling(word) {
            var ret = false;
            g.forEach(function(elem) {
                if(getEditDistance(word,elem)<= 3){
                    //console.log(getEditDistance(word,testword) + " " +testword);
                    ret = true;
                }
            });

            return ret;
        }
        function checkForExactWord(word) {
            var ret = false;
            g.forEach(function(elem) {
                if(getEditDistance(word,elem) == 0){
                    //console.log(getEditDistance(word,testword) + " " +testword);
                    ret = true;
                }
            });

            return ret;
        }

        function checkSituation () {
            var allSlots = $('.slot');
            var disabledSlots = $('.slot:disabled');
            var requiredCorrectAnswers = allSlots.length - 5;

            if(disabledSlots.length >= requiredCorrectAnswers) // Enough correct answers
            {
                return true;
            }
            else // Not enough answers
            {
                return false;
            }
        }
    });
})(jQuery);