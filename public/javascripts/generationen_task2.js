/**
 * Created by David on 03.08.2014.
 */
$(document).ready(function() {
    $('#info1').show().hover(
        function() {
            $(this).html('<a href="http://richtiges_gutes_de.deacademic.com/1292/Kompositum" target="_blank" class="redlink" style="margin-left: 10px">Kompositum?</a>');
        },
        function() {
            $(this).find("a:last").remove();
        }
    );


    var count = 0;
    var a = ["Friedhofs-",
        "erwachsen-",
        "auseinander-",
        "Schul-",
        "Leistungs-",
        "Kontakt-",
        "Flucht-",
        "Steh-",
        "Party-"];
    var b = ["-gemüse",
        "-werden",
        "-klaffen",
        "-zeit",
        "-bereitschaft",
        "-freude",
        "-röhre",
        "-vermögen",
        "-fummel"];
    var c = [];
    for (var i = 0; i < a.length; i++) {
        c.push(makeTok(a[i], i));
    }
    c = shuffle(c);
    for (i = 0; i < c.length; i++) {
        $('#ltext').append(c[i]);
    }
    c = [];
    for (i = 0; i < b.length; i++) {
        c.push(makeTok(b[i],i));
    }
    c = shuffle(c);
    for (i = 0; i < c.length; i++) {
        $('#rtext').append(c[i]);
    }
    var pd,pp;
    $('.tok').draggable({revert:'invalid'});
    $('.drop2').droppable({drop: function(e,ui) {
        var drag = $(ui.draggable).attr("style","").attr("style","position:relative");

        var parent = drag.parent();
        drag.detach();
        var num = this.id.substring(1);
        var other = "a" + (num==2?"1":"2");
        if (parent[0].id.substring(0,1)==="l") {
            if (num == 2) {
                flash(this);
                parent.append(drag);
                return;
            }
        }
        if (parent[0].id.substring(0,1)==="r") {
            if(num == 1) {
                flash(this);
                parent.append(drag);
                return;
            }
        }
        $(this).text(drag.text());
        var o = $('#'+other);
        if (o.text()) {
            if (pd.attr("id").substring(1) == drag.attr("id").substring(1)) {
                flash(null, '#90EE90');
                raisepoints();
                $('.drop2').animate({'color':'green'}, 1000, "swing", function() {
                    $('#a1').text("");
                    $('#a2').text("");
                    count++;

                    if (count > 9) {
                        // end task
                    }
                });


            } else {
                flash();
                raisefaults();
                $('.drop2').animate({'color':'darkred'}, 1500, "easeOutExpo", function() {
                    pp.append(pd);
                    parent.append(drag);
                    $('#a1').text("");
                    $('#a2').text("");
                    $('.drop2').css({'color':'green'});
                });
            }
        } else {
            pd = drag;
            pp = parent;
        }
    }});
    function shuffle(array) {
        var counter = array.length, temp, index;
        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            index = Math.floor(Math.random() * counter);
            // Decrease counter by 1
            counter--;
            // And swap the last element with it
            temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
        return array;
    }

    function makeTok(a, i) {
        return "<div class='tok' id='t" + (i+1) + "'>" + a + "</div>";
    }

    function flash(elem, col) {
        col = col || '#F08080';
        if (elem) {
            $(elem).animate({'background-color':col, 'opacity':0.2}, 1000, "easeInOutQuart", function() {
                $(this).css({'background-color': 'white', 'opacity': 1.0});
            });
        } else {
            $('.drop2').animate({'background-color':col, 'opacity':0.2}, 1000, "easeInOutQuart", function() {
                $(this).css({'background-color': 'white', 'opacity':1.0});
            });
        }
    }
});
