$(document).ready(function() {

    //on click event for underlined text. As wished just a link to the corresponding duden.de page
    $('span.underline').click(function () {
        window.open('http://www.duden.de/suchen/dudenonline/'+$(this).attr("inhalt"),'_blank');
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
            case "12":
                $(".bold_info#flott").toggle();
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