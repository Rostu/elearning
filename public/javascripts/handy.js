(function($)
{
    $(document).ready(function() {
        $('#info1').show().html("<a href='#' id='textov' class='redlink'>Text</a>").on('click',function(){
            $('#helpdi').dialog("open");
        });

        $('#helpdi').dialog({autoOpen: false,
            show: {
                effect: "fade",
                duration: 1000
            },
            hide: {
                effect: "fade",
                duration: 1000
            },
            modal: true,
            title: "Handy Text",
            buttons: [
                {
                    text: "OK",
                    icons: {
                        primary: "null"
                    },
                    click: function() {
                        $( this ).dialog( "close" );
                    }
                }
            ],
            draggable: false
        });

        var antworten = ["telefoniert","mobil","zu verzichten","Technik","Smartphone","leerer","Handysucht","hoch frequente","elektromagnetische"]
        var count = 0;
        var fehlermappe = [];

        $('input').on("blur", function(){if ($(this).val()) return validate(this);});


        function validate(obj){
            // TODO reset points on each try!
            fehlermappe = [];
            var fehler = "";
            var i = obj.id-1;
            var val = obj.value;
            if(val == antworten [i]){
                $("input[id="+(i+1)+"]").css('background-color','rgba(144, 238, 144, 0.73)').prop('disabled', true);
                count++;
                raisepoints();
            }else{
                raisefaults();
                $("input[id="+(i+1)+"]").css('background-color','rgba(240, 128, 128, 0.76)');
                if(val == ""){
                    fehler = "nicht ausgefüllt";
                }else if(val.toUpperCase() == antworten[i].toUpperCase()){
                    fehler = "Groß-und Kleinschreibung beachten"
                } else{fehler = "Das ist nicht richtig";}
                fehlermappe[i] = fehler;
                $("input[id="+(i+1)+"]").mouseenter(showinfo).mouseleave(clearinfo);
            }
        };

        function showinfo(){
            $("a#infotext").text(fehlermappe[this.id-1]);
        };

        function clearinfo(){
            $("a#infotext").text("");
        };
    });
})(jQuery);