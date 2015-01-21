/**
 * Created by Christopher on 16.11.2014.
 */

$(document).ready(function() {
    $( "#point_bars" ).data( "actualp", 0 );
    $( "#point_bars" ).data( "actualf", 0 );
    //console.log($("body").data());

    $('.redstripe').hide();
    $('.redtext').hide();

    $('.redstripe').mouseenter(function()
    {
        //$(this).text("dsaf")
        //$(this).animate({width: $(this).children('a.redlink').width(), paddingLeft: "8px", paddingRight: "20px"}, 100);
        //$(this).animate({width: $(this).children('.redtext').width(), paddingLeft: "8px", paddingRight: "20px"},100);
        $(this).children('.redtext').show();
        $(this).animate({width: "90%"}, 100);
        $(this).animate({color: "#ffffff"}, 100);
    });

    $('.redstripe').mouseleave(function()
    {
        $(this).children('.redtext').hide();
        $(this).animate({color: "#A91211"}, 100);
        $(this).animate({width: "20px"},100);
        //$(this).text("")
    });

    $('.footerlink').mouseenter(function()
    {
        $(this).css("textDecoration", "underline");
    });

    $('.footerlink').mouseleave(function()
    {
        $(this).css("textDecoration", "none");
    });

    //implements dropdown menu for start pages

    $('.panelarrow').click(function() {
        var parents = $(this).parents();
        var panel_id = $(parents[1]).attr("id");
        var panelcontent = $("div#" + panel_id).children('.panelcontent');
        if ($(panelcontent).css('display') == "none") {
            $(panelcontent).css('display', 'inherit');
            $(this).css("background-image", 'url("/images/button_up.gif")');
        } else {
            $(panelcontent).css('display', 'none');
            $(this).css("background-image", 'url("/images/button_down.gif")');
        }
    });

    //functions for the point visualization--------------------------------

    var maxp = 0;
    var maxf = 0;
    var vis = d3.select("#point_bars");

    $.getJSON('/points', function(data){
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


    //$(document).on('data-attribute-changed', function() {
    //    updatepoints();
    //    updatefaults();
    //});

    $(document).on("PointsChanged", function() {
        updatepoints();
        updatefaults();
    });

    //end functions for the point visualization--------------------------------

});

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
//end functions for the point visualization--------------------------------
