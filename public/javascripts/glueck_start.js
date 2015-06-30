$( init );
function init() {
    //functions to display either videocontent or textcontent in the overlay
    //since we have just one overlay with different media we have to set the css display attribute of the one not selected to none
    $(".video_media").on("click",function(){
        $('#videocontent').css("display","inline-block");
        $('#textcontent').css("display","none");
    });
    $(".text_media").on("click",function(){
        $('#textcontent').css("display","inline-block");
        $('#videocontent').css("display","none");
    });

}