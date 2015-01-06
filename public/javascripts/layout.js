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

    //functions for the point visualization--------------------------------

    var maxp = 0;
    var maxf = 0;
    var vis = d3.select("#point_bars");

    $.getJSON('/points', function(data){
        maxp = data.maxpoints;
        maxf = data.maxfaults;
        myScale = d3.scale.linear().domain([0, maxp]).range([0, 2 * Math.PI]);
        arc3 = d3.svg.arc().innerRadius(40).outerRadius(50).startAngle(myScale(0)).endAngle(myScale(maxp));
        arc4 = d3.svg.arc().innerRadius(25).outerRadius(35).startAngle(myScale(0)).endAngle(myScale(maxf));
        vis.append("path").attr("d", arc3).attr("transform", "translate(50,60)").style("fill", "rgba(0, 94, 156, 0.25)");
        vis.append("path").attr("d", arc4).attr("transform", "translate(50,60)").style("fill", "rgba(169, 18, 17, 0.20)");
        updatepoints();
        updatefaults();

    });

    function updatepoints(){
        var actualp = $("#point_bars").data("actualp");
        var arc1 = d3.svg.arc().innerRadius(40).outerRadius(50).startAngle(myScale(0)).endAngle(myScale(actualp));
        vis.append("path").attr("d", arc1).attr("transform", "translate(50,60)").style("fill", "#005E9C");

    }
    function updatefaults(){
        var actualf = $("#point_bars").data("actualf");
        var arc2 = d3.svg.arc().innerRadius(25).outerRadius(35).startAngle(myScale(0)).endAngle(myScale(actualf));
        vis.append("path").attr("d", arc2).attr("transform", "translate(50,60)").style("fill", "#A91211");

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