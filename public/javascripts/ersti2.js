    (function($)
{
    $(document).ready(function() {
        var a = ['Universität', 'Lageplan', 'A-Gebäude', 'Seminar', 'Studenten', 'Erstsemesterstudenten',
            'Unigelände', 'Unigebäude', 'Seminarraum', 'Uni', 'Campus', 'Erstis', 'Kommilitonen', 'Dozenten', 'Veranstaltung', 'Unizeit', 'Unitag'];

        var slots = $('.slot');
        slots.on("blur", function() {
            validate(this);
        });

        $('#weiter').on("click", function(e) {
            if (!checkSituation()) {
                e.preventDefault(); // Stops the browser from opening the next page, using the href attribute on the <a> element
                alert("Bitte fülle genügend Lücken aus! Es werden mindestens 13 richtige Antworten benötigt");
            }
        });

        function validate(self) {
            var t = $(self).val();
            if (t.length == 0) return;
            for (var i = 0; i < a.length; i++) {

                if (a[i] === t) { // If word in array matches the word in the input field
                    $(self).addClass("passive");
                    $(self).animate({borderBottomColor: "#7cfc00", borderTopColor: "#7cfc00", backgroundColor:"#fff"}, "slow");
                    $(self).prop('disabled', true);
                    $(".inline[id=" + a[i]  + "]").css('color', 'green');
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
            var requiredCorrectAnswers = allSlots.length - 4;

            return disabledSlots.length >= requiredCorrectAnswers;
        }
    });
})(jQuery);