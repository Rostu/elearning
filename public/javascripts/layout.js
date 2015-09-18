/**
 * Created by Christopher on 16.11.2014.
 */

$(document).ready(function() {
    togglestartpicture();
    $( "#point_bars" ).data( "actualp", 0 );
    $( "#point_bars" ).data( "actualf", 0 );
    //console.log($("body").data());

    $( window ).resize(function() {
        var testwidth = $("body").width() / 9;
        $( ".redcontainer" ).css("width",testwidth);
    });

    $('.redstripe').mouseenter(function()
    {
        $(this).animate({width: $(this).children('.redlink').width(), paddingRight: "20px"}, 100);
        $(this).children().show;
        $(this).children().animate({color: "#ffffff"}, 200);
    });

    $('.redstripe').mouseleave(function()
    {
        $(this).children().animate({color: "#A91211"}, 100);
        $(this).children().hide;
        $(this).animate({width: "0px", paddingRight: "12px"},200);
    });

    $('.footerlink').mouseenter(function()
    {
        $(this).css("textDecoration", "underline");
    });

    $('.footerlink').mouseleave(function()
    {
        $(this).css("textDecoration", "none");
    });

    //handle highlighting on start pages
    /*
    $('.panelheader').mouseenter(function()
    {
        startPageFadeIn($(this));
    });

    $('.panelheader').mouseleave(function()
    {
        startPageFadeOut($(this));
    });
    */
    $('.panelarrow').mouseenter(function()
    {
        $(this).css("backgroundColor", "#005E9C");
    });

    $('.panelarrow').mouseleave(function()
    {
        $(this).css("backgroundColor", "#A6D1F5");
    });
    /*
    $('.tasktitle').mouseenter(function()
    {
        startPageFadeIn($(this));
    });

    $('.tasktitle').mouseleave(function()
    {
        startPageFadeOut($(this));
    });
    */
    $('.taskstart').mouseenter(function()
    {
        $(this).css("backgroundColor", "#FFFFFF");
    });

    $('.taskstart').mouseleave(function()
    {
        $(this).css("backgroundColor", "#E5EFF5");
    });

    $('.taskmediaicon').mouseenter(function()
    {
        $(this).css("backgroundColor", "#FFFFFF");
    });
    //hover funktions for the media icons
    $('.text_media').hover(
        function(){
            $(this).attr('src','images/media_icon_text_hover.png')
        },
        function(){
            $(this).attr('src','images/media_icon_text.png')
        }
    )
    $('.video_media').hover(
        function(){
            $(this).attr('src','images/media_icon_video_hover.png')
        },
        function(){
            $(this).attr('src','images/media_icon_video.png')
        }
    )
    $('.audio_media').hover(
        function(){
            $(this).attr('src','images/media_icon_audio_hover.png')
        },
        function(){
            $(this).attr('src','images/media_icon_audio.png')
        }
    )

    $('.taskmediaicon').mouseleave(function()
    {
        $(this).css("backgroundColor", "#E5EFF5");
    });

    function startPageFadeIn(owner) {
        $(owner).fadeTo(100, 0.7);
    }

    function startPageFadeOut(owner) {
        $(owner).fadeTo(100, 1.0);
    }

    //handle clicking on start pages

    $('.panelheader').click(function() {
        togglePanelContent($(this));
    });
    /*
    $('.tasktitle').click(function() {
        var link = $(this).find('.tasklink');
        $(link)[0].click();
    });
    */
    /*
    $('.taskmediaicon').click(function(e) {
        e.stopPropagation();
        var task = $(this).closest('.task');
        var taskmedia = $(task).children('.taskmedia');
        if ($(taskmedia).css('display') == "none") {
            $(taskmedia).css('display', 'inherit');
        } else {
            $(taskmedia).css('display', 'none');
        }
    });
    */
    /*
    $('.mediaelement_mini').click(function() {
        toggleStartOverlay();
    });
    */

    $('.mediaelement').click(function() {
        toggleStartOverlay();
    });
    $('#startoverlaycloseicon').click(function() {
        toggleStartOverlay();
        //if there is a video embedded in the overlay we have to pause it when closing the overlay
        if($(".video-js")){
            $(".video-js")[0].player.pause();
        }
    });

    function togglePanelContent(clickablePanelChild){
        var panel = $(clickablePanelChild).closest('.startpanel');
        var arrow = $(clickablePanelChild).children('.panelarrow');
        var panel_id = $(panel).attr("id");
        var panelcontent = $("div#" + panel_id).children('.panelcontent');
        //console.log($(parent).closest('.panelarrow'));
        if ($(panelcontent).css('display') == "none") {
            $(panelcontent).css('display', 'inherit');
            $(arrow).css("background-image", 'url("/images/button_up2.gif")');
        } else {
            $(panelcontent).css('display', 'none');
            $(arrow).css("background-image", 'url("/images/button_down2.gif")');
        }
    }

    //Funktion prüft ob es sich um eine startseite handelt, und welche
    //Danach werden per Zufallsgenerator alle 4 sekunden die entsprechenden Bilder aus der startseite ausgetauscht
    function togglestartpicture(){
        var elementExists = document.getElementById("content_image");
        var title = $("#subjecttitle > h1").text();
        var ArrayToLookAt = [];
        var china=["china1.jpg","china2.jpg","china3.jpg","china4.jpg","china5.jpg","china6.jpg","china7.jpg"];
        var energie=["energie1.jpg","energie2.jpg","energie3.jpg","energie4.jpg","energie5.jpg","energie6.jpg"];
        var ersti=["ersti1.jpg","ersti2.jpg","ersti3.jpg","ersti4.jpg"];
        var generationen=["generationen1.jpg","generationen2.jpg","generationen3.jpg","generationen4.jpg"];
        var glueck=["glueck1.jpg","glueck2.jpg","glueck3.jpg","glueck4.jpg","glueck5.jpg"];
        var veggie=["veggie1.jpg","veggie2.jpg","veggie3.jpg","veggie4.jpg","veggie5.jpg"];
        var zukunft=["zukunft1.jpg","zukunft2.jpg","zukunft3.jpg","zukunft4.jpg"];
        var wertewandel=[];
        var undef=[];

        switch (title) {
            case "Zukunft":
                ArrayToLookAt = zukunft;
                break;
            case "China":
                ArrayToLookAt = china;
                break;
            case "Glück":
                ArrayToLookAt = glueck;
                break;
            case "Neue Energien":
                ArrayToLookAt = energie;
                break;
            case "Ersti":
                ArrayToLookAt = ersti;
                break;
            case "Veggie-Day":
                ArrayToLookAt = veggie;
                break;
            case "Wertewandel":
                ArrayToLookAt = wertewandel;
                break;
            case "Generationen":
                ArrayToLookAt = generationen;
                break;
            default:
                ArrayToLookAt = undef;
        }

        change();
        function change(){

            var item = ArrayToLookAt[Math.floor(Math.random()*ArrayToLookAt.length)];
            $("#content_image").css("background-image","url('../images/startpages/"+ item+"')");
        }
        if(elementExists != null){
            setInterval(change,4000);
        }else{}


    }

    function toggleStartOverlay(){
        var startoverlaybackground = document.getElementById('startoverlaybackground');
        var startoverlaybluebar = document.getElementById('startoverlaybluebar');
        var startoverlaywatermark = document.getElementById('startoverlaywatermark');
        var startoverlay = document.getElementById('startoverlay');
        startoverlaybackground.style.opacity = .75;
        //startoverlaybluebar.style.opacity = .9;
        if ($(startoverlaybackground).css('display') == "none") {
            $(startoverlaybackground).css('display', 'inherit');
            $(startoverlaybluebar).css('display', 'inherit');
            $(startoverlay).css('display', 'inherit');
            $(startoverlaywatermark).css('display', 'inherit');
        } else {
            $(startoverlaybackground).css('display', 'none');
            $(startoverlaybluebar).css('display', 'none');
            $(startoverlay).css('display', 'none');
            $(startoverlaywatermark).css('display', 'none');
        }
    }

    //functions for the point visualization--------------------------------

    var maxp = 0;
    var maxf = 0;
    var vis = d3.select("#point_bars");
    var actualpage = $('a#ind').attr('href');
    if (actualpage) {
        if (actualpage.indexOf("/uindex?last=/") > -1){
            actualpage = actualpage.replace("/uindex?last=/", "");}else{actualpage = actualpage.replace("/uindex?last=", "");actualpage = actualpage.replace("uindex?last=", "");}
        //console.log(actualpage);
    }

    $.getJSON('points?last='+actualpage, function(data){
        maxp = data.maxpoints;
        maxf = data.maxfaults;
        myScalePoints = d3.scale.linear().domain([0, maxp]).range([0, 2 * Math.PI]);
        myScaleFaults = d3.scale.linear().domain([0, maxf]).range([0, 2 * Math.PI]);
        var arc1 = d3.svg.arc().innerRadius(40).outerRadius(50).startAngle(myScalePoints(0)).endAngle(myScalePoints(0));
        var arc2 = d3.svg.arc().innerRadius(25).outerRadius(35).startAngle(myScaleFaults(0)).endAngle(myScaleFaults(0));
        arc3 = d3.svg.arc().innerRadius(40).outerRadius(50).startAngle(myScalePoints(0)).endAngle(myScalePoints(maxp));
        arc4 = d3.svg.arc().innerRadius(25).outerRadius(35).startAngle(myScaleFaults(0)).endAngle(myScaleFaults(maxf));
        vis.append("path").attr("d", arc3).attr("transform", "translate(50,60)").style("fill", "rgba(0, 94, 156, 0.25)");
        vis.append("path").attr("d", arc4).attr("transform", "translate(50,60)").style("fill", "rgba(169, 18, 17, 0.20)");
        vis.append("path").attr("d", arc1).attr("transform", "translate(50,60)").attr("id", "pointspath").style("fill", "#005E9C");
        vis.append("path").attr("d", arc2).attr("transform", "translate(50,60)").attr("id", "faultspath").style("fill", "#A91211");
    });

    function updatepoints(){
        var actualp = $("#point_bars").data("actualp");
        var newarc = d3.svg.arc().innerRadius(40).outerRadius(50).startAngle(myScalePoints(0)).endAngle(myScalePoints(actualp));
        d3.select("#pointspath").attr("d",newarc);
    }
    function updatefaults(){
        var actualf = $("#point_bars").data("actualf");
        var newarc = d3.svg.arc().innerRadius(25).outerRadius(35).startAngle(myScaleFaults(0)).endAngle(myScaleFaults(actualf));
        d3.select("#faultspath").attr("d",newarc);
    }


    $(document).on("PointsChanged", function() {
        updatepoints();
        updatefaults();
        check();
    });

    //this function will check if the actual point/faults equal the max points/faults and trigger a event if so
    function check(){
        var actualp = $("#point_bars").data("actualp");
        var actualf = $("#point_bars").data("actualf");

        if((maxp == actualp) && (actualp != 0)){
            $(document).trigger('MaxPointsReached');
        }
        if((maxf == actualf) && (actualf != 0)){
            $(document).trigger('MaxFaultsReached');
        }
    }
});

function setpoints(count){
    $("#point_bars").data("actualp", count);
    $(document).trigger('PointsChanged');
}

function raisefaults(){
    var temp = $("#point_bars").data("actualf") + 1;
    $("#point_bars").data("actualf", temp);
    $(document).trigger('PointsChanged');
};
function decreasefaults(){
    var temp = $("#point_bars").data("actualf") -1;
    $("#point_bars").data("actualf", temp);
    $(document).trigger('PointsChanged');
};
function raisepoints(){
    var temp = $("#point_bars").data("actualp") + 1;
    $("#point_bars").data("actualp", temp);
    $(document).trigger('PointsChanged');
};
function decreasepoints(){
    var temp = $("#point_bars").data("actualp") -1;
    $("#point_bars").data("actualp", temp);
    $(document).trigger('PointsChanged');
};
function clearpoints(){
    $("#point_bars").data("actualp",0);
    var temp = $("#point_bars").data("actualp");
    $("#point_bars").data("actualf", temp);
    $(document).trigger('PointsChanged');
};
//end functions for the point visualization--------------------------------
function toggleStartOverlay(){
    var startoverlaybackground = document.getElementById('startoverlaybackground');
    var startoverlaybluebar = document.getElementById('startoverlaybluebar');
    var startoverlaywatermark = document.getElementById('startoverlaywatermark');
    var startoverlay = document.getElementById('startoverlay');
    startoverlaybackground.style.opacity = .75;
    //startoverlaybluebar.style.opacity = .9;
    if ($(startoverlaybackground).css('display') == "none") {
        $(startoverlaybackground).css('display', 'inherit');
        $(startoverlaybluebar).css('display', 'inherit');
        $(startoverlay).css('display', 'inherit');
        $(startoverlaywatermark).css('display', 'inherit');
    } else {
        $(startoverlaybackground).css('display', 'none');
        $(startoverlaybluebar).css('display', 'none');
        $(startoverlay).css('display', 'none');
        $(startoverlaywatermark).css('display', 'none');
    }
}