/**
 * Created by Christopher on 16.11.2014.
 */

$(document).ready(function() {
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

    var maxpoints = 100;
    var maxfaults = 100;

    var actualpoints = 25;
    var actualfaults = 5;

    var myScale = d3.scale.linear().domain([0, maxpoints]).range([0, 2 * Math.PI]);
    var vis = d3.select("#point_bars");

    var arc3 = d3.svg.arc().innerRadius(40).outerRadius(50).startAngle(myScale(0)).endAngle(myScale(maxpoints));
    vis.append("path").attr("d", arc3).attr("transform", "translate(50,60)").style("fill", "rgba(0, 94, 156, 0.25)");

    var arc4 = d3.svg.arc().innerRadius(25).outerRadius(35).startAngle(myScale(0)).endAngle(myScale(maxfaults));
    vis.append("path").attr("d", arc4).attr("transform", "translate(50,60)").style("fill", "rgba(169, 18, 17, 0.20)");

    function updatepoints(){
        var arc1 = d3.svg.arc().innerRadius(40).outerRadius(50).startAngle(myScale(0)).endAngle(myScale(actualpoints));
        vis.append("path").attr("d", arc1).attr("transform", "translate(50,60)").style("fill", "#005E9C");
    }
    function updatefaults(){
        var arc2 = d3.svg.arc().innerRadius(25).outerRadius(35).startAngle(myScale(0)).endAngle(myScale(actualfaults));
        vis.append("path").attr("d", arc2).attr("transform", "translate(50,60)").style("fill", "#A91211");

    }
    updatepoints();
    updatefaults();
    //end functions for the point visualization--------------------------------

    $('#button3').click(function() {
        actualpoints += 5;
        console.log("+");
        updatepoints();
    });


    function update(){
        actualpoints += 5;
        console.log("+");
        updatepoints();
    }


})
