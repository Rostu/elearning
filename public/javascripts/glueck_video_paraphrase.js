
//data for the exercise
var questions = {"questions":[
    {"id":"1","text":"Glück ist die <span>Balance zwischen Kopf und Bauch.</span>", "Answers":[["zwischen Verstand und Intuition.", "korrekt"],["zwischen Kopfschmerz und Hunger.",""],["zwischen Gedanken und Körper.",""]]},
    {"id":"2","text":"Glück ist,<span> wenn man die Augen aufmacht.</span>", "Answers":[["wenn man lebt.","korrekt"],["wenn man etwas sieht.","Das ist die allgemeine Bedeutung von Augen öffnen. Sie ist hier nicht gemeint. Versuche es noch einmal."],["wenn man nicht mehr schläft.","Das ist hier nicht gemeint. Versuche es noch einmal."]]},
    {"id":"3","text":"Glück ist,<span> dass man das Lachen nicht verliert.</span>", "Answers":[["sich nicht entmutigen zu lassen.","korrekt"],["sich niemals schlecht zu fühlen.","Das entspricht kaum der Realität. Versuche es noch einmal."],["immer fröhlich zu sein.","Das entspricht kaum der Realität. Versuche es noch einmal."]]},
    {"id":"4","text":"Glück ist, wenn man sich wünscht, <span>den Moment festhalten zu wollen.</span>", "Answers":[["den Moment für immer zu bewahren.","korrekt"],["dem Moment treu zu sein.",""],["den Moment zusammenzufassen.",""]]},
    {"id":"5","text":"Glück ist als <span>Mensch aufzutauchen und menschlich zu sein.</span>", "Answers":[["als Mensch mit Wert wahrgenommen werden.","korrekt"],["kein Monster sein.",""],["Ablehnung erfahren.","Das wäre das genaue Gegenteil. Versuche es noch einmal."]]},
    {"id":"6","text":"Glück ist <span>Mut zum Weiterleben</span> (den Mut zum Weiterleben haben).", "Answers":[["trotz allem Schlechten einen Grund zum Leben haben.", "korrekt"], ["ein Held sein.","Das ist gar nicht nötig. Versuche es noch einmal."],["alt werden.","Das wird man (mit Glück) von allein. Versuche es noch einmal."]]},
    {"id":"7","text":"Man hat nur dieses eine Leben und da muss man <span>das Beste draus machen.</span>", "Answers":[["seine Chancen nutzen.", "korrekt"],["immer der Erste sein.","Der Erste zu sein, wird zwar auch mit dem Besten verbunden, ist hier aber nicht gemeint. Versuche es noch einmal."],["jemanden übertreffen.","Besser sein gehört zwar zur gleichen Wortfamilie wie das Beste, aber das ist hier nicht gemeint. Versuche es noch einmal."]]},
    {"id":"8","text":"Glück ist, wenn ich <span>mit meinen Freunden unterwegs bin.</span>", "Answers":[["etwas mit Freunden unternehmen.", "korrekt"],["auf Reisen sein.",""],["sich auf den Weg machen.",""]]},
    {"id":"9","text":"Glück ist zu wissen, <span>dass man gebraucht wird.</span>", "Answers":[["für jemanden wichtig sein.", "korrekt"], ["nicht mehr neu sein.","Neu und gebraucht sind zwar Antonyme. Hier passen sie aber nicht zusammen. Versuche es noch einmal."],["viel zu tun haben.",""]]},
    {"id":"10","text":"Glück ist, wenn man sich nicht so viel <span>zankt.</span>", "Answers":[["sich nicht streiten.", "korrekt"],  ["sich nicht herum treiben.",""],["Zahnschmerzen haben.",""]]}
]};

$( init );
function init() {
    //enable info box
    $('#info3').show();

    //pointer für die Übung
    var aktuell = 0;
    var quest = shuffle(questions.questions);
    var actualAnswers = shuffle(quest[aktuell].Answers);

    //add a click listener tht is attached to every existing or later created div with the class .antwort
    $(document).on("click",".antwort",clickfunction);

    //function to add a new #wortbox to the page
    function newdiv(){
        var div = jQuery('<div/>', {
            class: 'wortbox',
            id: "wortbox",
            html: "<p>"+quest[aktuell].text+"</p>" +
            "</br>" +
            "<div class='antwort' id='0'>" + actualAnswers[0][0] + "</div>" +
            "<div class='antwort' id='1'>" + actualAnswers[1][0] + "</div>" +
            "<div class='antwort' id='2'>" + actualAnswers[2][0] + "</div>"
        });
       if($("#wortbox").length == 0){
        $("#wrapper").append(div);
       }else{
           wait()
       }
    }
    //function to add the last box
    function enddiv(){
        var div = jQuery('<div/>', {
            class: 'wortbox',
            id: "wortbox",
            html: "<p>Super du hast die Aufgabe geschafft</p>"
        });
        $("#wrapper").append(div);
    }
    //initial wortbox
    newdiv();

    //function to handle a click event on an answer
    function clickfunction(){
        //if clicked answer is correct
        if(actualAnswers[parseInt(this.id)][1]== "korrekt"){
            //raise the pointer to the next exercise token
            aktuell++;
            //as long as the pointer is in range of the exercise token array, raise points, remove old div, add new one, also remove possible infobox from last choice
            if(aktuell<quest.length){
                actualAnswers = shuffle(quest[aktuell].Answers);
                raisepoints();
                removeNoticeIfPresent();
                $("#wortbox").fadeOut(500,function() {
                    this.remove();
                    newdiv();
                });
                //if there are no more exercise tokens, remove last div and add a end div
            }else{
                removeNoticeIfPresent();
                raisepoints();
                $("#wortbox").fadeOut(500,function(){
                    this.remove();
                    enddiv();
                });
            }
        //if clicked answer is wrong: raisefaults, and if present add info to the infobox
        }else{
            raisefaults();
            if(actualAnswers[parseInt(this.id)][1] != ""){
                removeNoticeIfPresent();
                $('#info3').append("<p>"+actualAnswers[parseInt(this.id)][1]+"</p>");
            }
        }
    }




}