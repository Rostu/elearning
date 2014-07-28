(function($)
{
    $(document).ready(function() {
        var a = ['Seminar', 'Übung', 'Vorlesung', 'Tutorium', 'Kolloqium', 'Workshop', 'Konzert', 'Festival',
            'Konferenz', 'Sportereignis', 'Party', 'Theaterstück', 'Oper', 'Fest', 'Tanzkurs', 'Demonstration',
            'Dozent', 'Professor', 'Praktikant', 'Lehrer', 'Trainer', 'Ober', 'Hausmeister', 'Sekretärin', 'Prof',
            'HiWi', 'Chauffeur', 'Zimmermädchen', 'Student', 'Erstsemesterstudent', 'Ersti', 'Kommilitone',
            'Schüler', 'Lerner', 'Bachelor', 'Master', 'Gymnasiast', 'Abiturient', 'Klassenkamerad', 'Auszubildender',
            'Absolvent', 'Lehrling', 'Schulabgänger'];

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
            var t = $(self).val();
            if (t.length == 0) return;
            for (var i = 0; i < a.length; i++) {

                if (a[i] === t) { // If word in array matches the word in the input field
                    $(self).addClass("passive");
                    $(self).animate({borderBottomColor: "#7cfc00", borderTopColor: "#7cfc00", backgroundColor:"#fff"}, "slow");
                    $(self).prop('disabled', true);
                    $(".inline_big[id=" + a[i]  + "]").css('color', 'orange');
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