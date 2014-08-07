(function($)
{
    $(document).ready(function() {
    var antworten = ["in der","mobil","zu verzichten","Technik","Smartphone","leerer","Handysucht","hoch frequente","elektromagnetische"]
    var count = 0;
        /*
        $("input").tooltip({
            tooltipClass: "tooltip",
            hide: { effect: "blind", duration: 800},
            show: { effect: "blind", duration: 800 }
        });
        */
    $("#pruefen").click(validate);

    function validate(){
        count = 0;
        var versuche = [];
        $("input").each(function(){
            versuche.push(this.value);
        })
        for(i=0;i<versuche.length;i++){
            if(versuche[i] == antworten [i]){
                $("input[id="+(i+1)+"]").css('background-color','rgba(144, 238, 144, 0.73)');
                count++;
            }else{
                $("input[id="+(i+1)+"]").css('background-color','rgba(240, 128, 128, 0.76)');
            }

        }
    };

    });
})(jQuery);