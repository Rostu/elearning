/**
 * Created by Christopher on 16.11.2014.
 */

$(document).ready(function() {
    $('.redstripe').mouseenter(function()
    {
        //$(this).text("dsaf")
        $(this).animate({width: $(this).children('a.redlink').width(), paddingLeft: "8px", paddingRight: "20px"}, 100);
        //$(this).animate({width: "+=28px"}, 100);
        $(this).animate({color: "#ffffff"}, 100);
    });

    $('.redstripe').mouseleave(function()
    {
        $(this).animate({color: "#A91211"}, 200);
        $(this).animate({width: "20px", padding: "0px"},200);
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

    var actualpoints = 65;
    var actualfaults = 77;

    var myScale = d3.scale.linear().domain([0, maxpoints]).range([0, 2 * Math.PI]);
    var vis = d3.select("#point_bars");


    function updatepoints(){
        var arc1 = d3.svg.arc().innerRadius(55).outerRadius(65).startAngle(myScale(0)).endAngle(myScale(actualpoints));
        vis.append("path").attr("d", arc1).attr("transform", "translate(60,70)").style("fill", "#005E9C");
    }
    function updatefaults(){
        var arc2 = d3.svg.arc().innerRadius(35).outerRadius(50).startAngle(myScale(0)).endAngle(myScale(actualfaults));
        vis.append("path").attr("d", arc2).attr("transform", "translate(60,70)").style("fill", "#A91211");

    }
    updatepoints();
    updatefaults();
    //end functions for the point visualization--------------------------------

    $('#button1').hover( handlerIn, handlerOut );

    function handlerIn(){
        //$(this).setAttribute("opacity", "0.5");
        console.log("funktioniert");
    };
    function handlerOut(){
        //$(this).setAttribute("opacity", "0.5");
        console.log("funktioniert");
    };

    document.getElementById('button3').onclick = function (e) {
    actualpoints += 5;
    console.log("+");
    updatepoints();
    }
    function update(){
        actualpoints += 5;
        console.log("+");
        updatepoints();

    }

    $('#button2').click(function (e) {
        actualpoints -= 5;
        console.log("-");
        updatepoints();
    });

})
