/**
 * Created by David on 11.08.2014.
 */
$(document).ready(function() {
   if ($('.help').length) {
       $('#hilfe').click(function() {
            showHelp();
       });
   }
    $("#hilfe").on('click',function(){
        document.location.href = "anleitung";
    })

    function showHelp() {
        $('body').append(menuSkeleton());
        var menu = $('#mr');
        $('.help').toArray().map(function(menuitem) {
           menu.append(makeMenuItem(menuitem));
        });
        $('span.menuhidden').on("click", function() {
           dispose();
        });
        $('span.menuribbon i').on("click", function() {
           dispose();
        });
    }

    function menuSkeleton() {
        return "<div class='helpmenu'>" +
                "<span class='menuhidden'>SPAN1</span>" +
                "<span class='menuribbon' id='mr'><p id='menutitle'>HILFE-MENÜ</p><i class='fa fa-times'></i></span>" +
                "<span class='menuhidden'>SPAN2</span>" +
                "<span class='menuhidden'>SPAN3</span>" +
            "</div>";
    }

    function makeMenuItem(item) {
        return '<div class="menuitem">' + makeOutlink($(item).html()) + '</div>';
    }

    function makeOutlink(elem) {
        console.log("Not implemented");
        return elem;
    }

    function dispose () {
        $('.helpmenu').detach();
    }
});

function shuffle(array) {
    var counter = array.length, temp, index;
    while (counter > 0) {
        index = Math.floor(Math.random() * counter);
        counter--;
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}
function getEditDistance(a, b) {
    if(a.length === 0) return b.length;
    if(b.length === 0) return a.length;

    var matrix = [];

    // increment along the first column of each row
    var i;
    for(i = 0; i <= b.length; i++){
        matrix[i] = [i];
    }

    // increment each column in the first row
    var j;
    for(j = 0; j <= a.length; j++){
        matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for(i = 1; i <= b.length; i++){
        for(j = 1; j <= a.length; j++){
            if(b.charAt(i-1) == a.charAt(j-1)){
                matrix[i][j] = matrix[i-1][j-1];
            } else {
                matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                    Math.min(matrix[i][j-1] + 1, // insertion
                        matrix[i-1][j] + 1)); // deletion
            }
        }
    }

    return matrix[b.length][a.length];
};

function removeNoticeIfPresent() {
    var obj = $('#info3 p');
    if (obj.length) {
        obj.detach();
    }
}

//two functions to animate a short visual feedback for correct and false (defined in layout.jade/css)

function toggleKorrekt(){
    $("#vifeedbackKorrekt").fadeToggle(500,function(){ $("#vifeedbackKorrekt").hide();});
}

function toggleFalsch(){
    $("#vifeedbackFalsch").fadeToggle(500,function(){ $("#vifeedbackFalsch").hide();});
}