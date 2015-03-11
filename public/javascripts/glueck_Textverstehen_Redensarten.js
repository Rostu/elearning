$(document).ready(function() {

    $("input[type='checkbox']").change(function() {
        if(this.checked) {
            if(this.value == 1){
                raisepoints();
                $(this).parent().siblings("h3").css("background","#02D64A");
                $("input[id='"+this.id+"']").attr("disabled", true);
            }
            if(this.value == 0){
                raisefaults();
                $(this).parent().siblings("h3").css("background","#A91211");
                $(this).parent().siblings("h3").css("color","white");
                $("input[id='"+this.id+"']").attr("disabled", true);
            }
        }
    });
});