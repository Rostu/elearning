(function($)
{
    $(document).ready(function() {
        var a_Veranstaltung = ["Seminar", "Übung", "Vorlesung", "Tutorium", "Kolloqium", "Konferenz", "Workshop"];
        var a_Personal = ["Dozent", "Professor", "Sekretärin", "Prof", "HiWi", "Tutor", "Lehrer", "Hausmeister"];
        var a_Lerner = ["Lerner", "Bachelor", "Master", "Absolvent", "Student", "Erstsemesterstudent", "Ersti", "Kommilitone"];
        var a_shortcut = ["Prof", "HiWi", "Ersti"];

        var slots = $('.slot');
        slots.on("blur", function() {
            validate(this);
        });

        $('#weiter').on("click", function(e) {
            if (!checkSituation()) {
                e.preventDefault(); // Stops the browser from opening the next page, using the href attribute on the <a> element
                alert("Bitte fülle genügend Lücken aus!");
            }
        });

        function validate(self) {
            // Find out which answers array to use, based on the input field's group css class
            var a;
            if($(self).hasClass("Veranstaltung"))
            {
                a = a_Veranstaltung;
            }
            else if($(self).hasClass("Personal"))
            {
                a = a_Personal;
            }
            else if($(self).hasClass("Lerner"))
            {
                a = a_Lerner;
            }
            else if($(self).hasClass("shortcut"))
            {
                a = a_shortcut;
            }
            var t = $(self).val();
            if (t.length == 0) return;
            for (var i = 0; i < a.length; i++) {

                if (a[i] === t) { // If word in array matches the word in the input field
                    $(self).addClass("passive");
                    $(self).animate({borderBottomColor: "#7cfc00", borderTopColor: "#7cfc00", backgroundColor:"#fff"}, "slow");
                    $(self).prop('disabled', true);
                    $(".inline_big[id=" + a[i]  + "]").css('color', 'orange'); // marks the correct written word orange in the Text
                    a.splice(i,1); // Delete the found word from the list of correct words
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