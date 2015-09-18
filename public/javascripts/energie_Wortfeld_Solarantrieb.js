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
                ArrayToLookAt = energie;
                break;
            case "5":
                ArrayToLookAt = energie;
                break;
            case "6":
                ArrayToLookAt = energie;
                break;
            case "7":
                ArrayToLookAt = energie;
                break;
            case "8":
                ArrayToLookAt = energie;
                break;
            case "9":
                ArrayToLookAt = energie;
                break;
            case "10":
                ArrayToLookAt = energie;
                break;
            case "11":
                ArrayToLookAt = energie;
                break;
            case "12":
                ArrayToLookAt = energie;
                break;
            case "13":
                ArrayToLookAt = energie;
                break;
            case "14":
                ArrayToLookAt = energie;
                break;
            case "15":
                ArrayToLookAt = energie;
                break;
            case "16":
                $(".bold_info#Sonnenkraft").toggle();
                break;
            case "17":
                ArrayToLookAt = energie;
                break;
        }
        console.log(this.id);
    });
});