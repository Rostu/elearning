(function($)
{
    $(document).ready(function()
    {
        loadIframes();
    });

    function loadIframes()
    {
        var $iframes = $(".iframeContainer iframe[data-src]");
        $iframes.each(function(key,value)
        {
            var $iframe = $(value);
            var src = $iframe.data("src");
            $iframe.attr("src", src);
        });
    }

})(jQuery);
