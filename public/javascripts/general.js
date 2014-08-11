/**
 * Created by David on 11.08.2014.
 */
$(document).ready(function() {
   if ($('.help').length) {
       $('#hilfe').click(function() {
            showHelp();
       });
   }

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
                "<span class='menuribbon' id='mr'><p id='menutitle'>HILFE-MENU</p><i class='fa fa-times'></i></span>" +
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