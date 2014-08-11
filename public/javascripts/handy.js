(function($)
{
    $(document).ready(function() {
        var antworten = ["telefoniert","mobil","zu verzichten","Technik","Smartphone","leerer","Handysucht","hoch frequente","elektromagnetische"]
        var count = 0;
        var fehlermappe = [];

        $("#pruefen").click(validate);

        function validate(){
            fehlermappe = [];
            var versuche = [];
            var fehler = "";
            $("input").each(function(){
                versuche.push(this.value);
            });

            for(i=0;i<versuche.length;i++){
                if(versuche[i] == antworten [i]){
                    $("input[id="+(i+1)+"]").css('background-color','rgba(144, 238, 144, 0.73)');
                    count++;
                }else{
                    $("input[id="+(i+1)+"]").css('background-color','rgba(240, 128, 128, 0.76)');
                    if(versuche[i] == ""){
                        fehler = "nicht ausgefüllt";
                    }else if(versuche[i].toUpperCase() == antworten[i].toUpperCase()){
                        fehler = "Groß-und Kleinschreibung beachten"
                    } else{fehler = "Das ist nicht richtig";}
                    fehlermappe[i] = fehler;
                    $("input[id="+(i+1)+"]").mouseenter(showinfo).mouseleave(clearinfo);
                }
            }
        };

        function showinfo(){
            $("p#infotext").text(fehlermappe[this.id-1]);
        };

        function clearinfo(){
            $("p#infotext").text("");
        };
    });
})(jQuery);