
$( init );
function init() {

    var id=0;
    var id_speicher = [];
    var testarray = ["aufgeregt","Nervosität"];
    var i = 0;
    var infos = [];
    var r_length=0;
    var w_length = 0;
    $(".inline").each(function() {
        $(this).draggable({
            containment: '#page',
            revert: true,
            helper: myHelper});
    });

    $('#Antwortbox').droppable( {
        drop: handleDropEvent
    });

    function handleDropEvent( event, ui ) {
        var textinhalt = ui.draggable.context.textContent;
        var textinfos ="";
        textinhalt = textinhalt.replace(',','');
        textinhalt = textinhalt.replace('.','');
        textinhalt = textinhalt.replace('"','');
        for(i=0;i<infos.length;i++){
            if(infos[i][0] === textinhalt)
            {textinfos = infos[i][1]};
        }
        var div = jQuery('<div/>', {
            class: 'token',
            id: ui.draggable.attr('id'),
            html: "<p>"+textinhalt+"</p><div id='"+ui.draggable.attr('id') +"' class='hide'>"
        });
        div.click(enlarge);
        if($.inArray(textinhalt, testarray)> -1){
            $(div).data('korrekt',true);
            $(div).css('background','rgba(2, 255, 85, 0.16)');
            r_length++;
            update_balken();
        }else {$(div).data('korrekt',false);$(div).css('background','rgba(240, 128, 128, 0.44)');$(div).css('color','black');w_length++;update_balken();}
        $("#Antwortbox").bind("contextmenu",function(e){return false;});
        $("#Antwortbox").append(div);
        div.mousedown(clear);
        //$(":button[id="+ui.draggable.attr('id') +"]").click(clear);
        $(".hide[id=" +ui.draggable.attr('id')+"]").toggle();
        $(".inline.ui-draggable[id="+ui.draggable.attr('id')+"]").draggable("disable").css('color','red');
    };

    function myHelper( event ) {
        var textinhalt = $(this).context.innerHTML;
        textinhalt = textinhalt.replace(',','');
        textinhalt = textinhalt.replace('.','');
        return jQuery('<div/>', {
            class: 'draggie',
            id: $(this).attr('id'),
            text: textinhalt
        });
    };

    function update_balken(){
        //console.log($('#balken_innen1'));
        $('#balken_innen1').css('width',r_length*8);
        $('#balken_innen2').css('width',w_length*4);
    }
    function clear(ev) {
        if (ev.which == 3) {
            $(".inline.ui-draggable[id=" + this.id + "]").draggable("enable").css('color', 'black');
            if($(this).data('korrekt')==true){
                r_length--;
            }else{w_length--;}
            update_balken();
            $(".token[id=" + this.id + "]").remove();
        }
    }

    function enlarge() {
        $(".hide[id=" +$(this).attr('id')+"]").toggle();
    };
};

$(document).ready(function() {
    // TASK 2
    var arr = ['Seminar', 'Übung', 'Vorlesung', 'Tutorium', 'Kolloqium', 'Workshop', 'Konzert', 'Festival',
        'Konferenz', 'Sportereignis', 'Party', 'Theaterstück', 'Oper', 'Fest', 'Tanzkurs', 'Demonstration',
        'Dozent', 'Professor', 'Praktikant', 'Lehrer', 'Trainer', 'Ober', 'Hausmeister', 'Sekretärin', 'Prof',
        'HiWi', 'Chauffeur', 'Zimmermädchen', 'Student', 'Erstsemesterstudent', 'Ersti', 'Kommilitone',
        'Schüler', 'Lerner', 'Bachelor', 'Master', 'Gymnasiast', 'Abiturient', 'Klassenkamerad', 'Auszubildender',
        'Absolvent', 'Lehrling', 'Schulabgänger'];
    var f = $('.fields');
    var e = [];
    for (var i = 0; i < arr.length; i++) {
        e.push(makeDiv(arr[i], i));
    }
    e = shuffle(e);
    for (i = 0; i < e.length; i++) {
        //w.append(makeDiv(a[i], i));
        f.append(e[i]);
    }

    var slots = $('.slot');
    slots.on("blur", function() {
        validate(this);
    });



    // TASK 4
    var a = ['planlos','auf Anhieb','strömen','reibungslos verläuft','flach fällt',
        'herumgeistern','mitteilungsbedürftig','sehr klein vorkommen','bevorstehende'];
    var w = $('.words');
    var b = [];
    for (var i = 0; i < a.length; i++) {
        b.push(makeDiv(a[i], i));
    }
    b = shuffle(b);
    for (i = 0; i < b.length; i++) {
        //w.append(makeDiv(a[i], i));
        w.append(b[i]);
    }
    var slots = $('.slot');
    slots.on("blur", function() {
        validate(this);
    });

    $('#weiter').on("click", function() {
       alert("Weiter im Programm");
    });
    function makeDiv(a, i) {
        return "<div class='word' id='w"+ (i+1) +"'>" + a + "</div>";
    }

    function validate(self) {
        var t = $(self).val();
        if (t.length == 0) return;
        // try get word div if present
        var id = self.id;
        var w = $('.word');
        for (var i = 0; i < w.length; i++) {

            if ($(w[i]).text()===t) {
                $(w[i]).addClass("passive");
                checkMark(w[i].id.substring(1), id.substring(1), self);
                // check situation for win and go on
                if(checkSituation()) {
                    $('#weiter').css({'visibility':'visible'});
                }
                return;
            }
        }
        // if we reach this point, the word didn't match any word
        $(self).effect("pulsate", "fast");
        $(self).animate({borderBottomColor: "#ff0000", borderTopColor: "#ff0000", backgroundColor: "#ff8484"},2000,"swing",function() {
            $(this).css({"border-top": "1px solid #c0c0c0",
                "border-bottom": "1px solid #c0c0c0", "background-color": "#fff"});
        });
    }

    function checkMark(a,b,m) {

        if(!(a-b)) {
            $(m).animate({borderBottomColor: "#7cfc00", borderTopColor: "#7cfc00", backgroundColor:"#fff"}, "slow");
            $(m).prop('disabled', true);
        }
        //$(m).addClass("green");


    }

    function checkSituation () {
        var s = $('.slot');
        for (var i = 0; i < s.length; i++) {

            if (!$(s[i]).is(":disabled")) return false;
        }
        return true;
    }

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
});