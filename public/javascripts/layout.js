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
})
