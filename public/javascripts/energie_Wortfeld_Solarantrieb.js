$(document).ready(function() {

    //on click event for underlined text.
    $('span.underline').click(function () {
        //show the overlay Div; clear and show the Div Box for the information; also automatically scroll up
        toggleStartOverlay();
        $(".bold_info").css("display","none");
        $(".bold_info#Allgemein").toggle();
        $(".bold_info#Allgemein").empty();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        var referer = $(this).attr("inhalt");
        //ajax request(http get) to get informations about the clicked word
        var infos = $.get('/get_wiktionary', {query:referer});
        //show throbber as long as there is no response from the request
        $(".bold_info#Allgemein").append("<div id='wiki_throbber'><img src='./images/ajax-loader.gif'></div>");
        //when the request is done and therefore the promise object done, start populating the Info div with informations from the request
        infos.done(function(wikiResponse){
            //clear the Info div from previous informations
            $(".bold_info#Allgemein").empty();
            //console.log("Antwort da");
            //if a corresponding wiktionary entry is found
            if(wikiResponse.valid){
                console.log(wikiResponse);
                //create a new container div for the information's
                var div = jQuery('<div/>', {
                    class: 'wiktionary_response',
                    id: "wiktionary1",
                    html: "<h2>"+referer+"</h2>"
                });
                //append the different information's to the container div
                if(wikiResponse.imgname){
                    $(div).append("<img src='"+wikiResponse.imgname[0].thumburl+"'>");
                }
                if(wikiResponse.audio){
                    var ref= wikiResponse.audio[0].link;
                    var info = wikiResponse.audio[0].info;
                    $(div).append('<div id="audioplayer"><audio id="player" controls="controls"><source src="'+ ref+'" type="audio/ogg"><p>Your Browser is not able to play this Audio File</p></source> </audio><a href="'+ info+'">©</a></div>');
                    $(div).append("</br>");
                }
                $(div).append("<b>Wortart:</b> <p>"+wikiResponse.wordclass+"</p>");
                $(div).append("</br>");
                var exp = wikiResponse.explanations.join("</br>");
                $(div).append("<b>Definiton: </b><p>"+exp+"</p>");
                $(div).append("</br>");
                $(div).append("<b>Beispiele: </b>");
                jQuery.each(wikiResponse.examples, function(i, val) {
                    $(div).append("<p>"+JSON.stringify(val.text)+"</p>");
                });
                $(div).append("</br>");
                if(wikiResponse.etymologie.length >0){
                    $(div).append("<b>Hekunft: </b><p>"+wikiResponse.etymologie.join()+"</p>");
                    $(div).append("</br>");
                }

                if(wikiResponse.synonym.length >0){
                    $(div).append("<b>Synonyme: </b><p>"+wikiResponse.synonym.join()+"</p>");
                    $(div).append("</br>");
                }
                if(wikiResponse.hyperonym.length>0){
                    $(div).append("<b>Überbegriff: </b><p>"+wikiResponse.hyperonym.join()+"</p>");
                    $(div).append("</br>");
                }
                $(div).appendTo(".bold_info#Allgemein" );

            }else{
                var div = jQuery('<div/>', {
                    class: 'wiktionary_response',
                    id: "wiktionary1",
                    html: "<h2>"+referer+"</h2>"
                });
                $(div).append("<p>Dazu haben wir leider keinen Eintrag gefunden. Schau doch mal hier: </p>");
                $(div).append("<a href='http://dwds.de/?view=10&qu="+referer+"' target='_blanc'>Suche im DWDS nach: "+referer+"</a>");
                $(div).appendTo(".bold_info#Allgemein" );
            }
        });
        //window.open('http://www.duden.de/suchen/dudenonline/'+$(this).attr("inhalt"),'_blank');
    });

    $('span.bold').click(function () {
        toggleStartOverlay();
        $(".bold_info").css("display","none");
        switch (this.id) {
            case "1":
            $(".bold_info#Solarantrieb").toggle();
                break;
            case "2":
                $(".bold_info#Sonnenenergie").toggle();
                break;
            case "3":
                $(".bold_info#Tank").toggle();
                break;
            case "4":
                $(".bold_info#Fahrzeuge").toggle();
                break;
            case "5":
                $(".bold_info#Sonnenkraft").toggle();
                break;
            case "6":
                $(".bold_info#Solarauto").toggle();
                break;
            case "7":
                $(".bold_info#Pfannkuchen").toggle();
                break;
            case "8":
                $(".bold_info#Glaskuppel").toggle();
                break;
            case "9":
                $(".bold_info#Solarmobil").toggle();
                break;
            case "10":
                $(".bold_info#Elektromotor").toggle();
                break;
            case "11":
                $(".bold_info#Solarzellen").toggle();
                break;
            case "13":
                $(".bold_info#Batteriebetrieb").toggle();
                break;
            case "14":
                $(".bold_info#Kofferraum").toggle();
                break;
            case "15":
                $(".bold_info#prima").toggle();
                break;
            case "16":
                $(".bold_info#Solarschleicher").toggle();
                break;
            case "17":
                $(".bold_info#Solartaxi").toggle();
                break;
            case "19":
                $(".bold_info#aufladen").toggle();
                break;
            case "18":
                $(".bold_info#gefaehrt").toggle();
                break;
        }

    });
});