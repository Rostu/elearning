/**
 * Created by David on 05.08.2014.
 */

$(document).ready(function() {
    var input = $('input');
    var socket = io.connect('/');
    input.toArray().map(function(e) {
        $(e).css({'width':((e.value.length + 1) * 10) + 'px'});
    });
    input.on("keyup", function() {
        $(this).css({'width':((this.value.length + 1) * 10) + 'px'});
    });
    input.on("blur", function() {
        if ($(this).val()) {
            var val = $(this).val();
            //console.log("word="+val+"&field="+this.id );
            //$.ajax({url:'/dml', data: "word="+val+"&field="+this.id });
            socket.emit("userinput", {word:val,field:this.id});
        }
    });


    socket.on('update', function(data) {
        var field = $("#"+data.field);
        console.log(data);
        switch(data.statusCode) {
            case 200:
                marktrue(field);
                // hide notice
                break;
            case 202:
                marktrue(field);
                // hide notice
                break;
            case 400:
                markwrong(field);
                var msg;
                switch(data.class) {
                    case "adjective":
                        msg = "Hier wird ein Adjektiv erwartet.";
                        break;
                    case "noun":
                        msg = "Hier wird ein Nomen/Substantiv erwartet.";
                        break;
                    case "verb":
                        msg = "Hier wird ein Verb erwartet.";
                        break;
                    case "adverb":
                        msg = "Hier wird ein Adverb erwartet.";
                        break;
                    case "pa2":
                        msg = "Das Verb ist leider nicht in der korrekten Konjugation.";
                        break;
                    case "nom":
                        msg = "Das ist leider nicht der richtige Kasus.";
                        break;
                    case "akk":
                        msg = "Das ist leider nicht der richtige Kasus.";
                        break;
                    default:
                        msg = "Das ist leider falsch.";
                        break;
                }
                // TODO try to put somewhere else, maybe separate column to the right of poem
                var box = $('#Antwortbox');
                box.append(makeNotice(msg, field));

                break;
            default: break;
        }
    });

    function makeNotice (msg, field) {
        // get position from field, position element
        return $("<div class='message' id='m"+ field.attr("id") +"'>" + msg + "</div>").css({'top':field.css("top")});
    }

    function marktrue (elem) {
        if (elem.hasClass("wrong")) elem.removeClass("wrong");
        elem.addClass("right");
    }

    function markwrong (elem) {
        if (elem.hasClass("right")) elem.removeClass("right");
        elem.addClass("wrong");
    }
});