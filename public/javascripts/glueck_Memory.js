$( init );
function init() {

    var data = [
        ["Normalerweise sind die Blätter dieser Pflanze dreiteilig. Ein vierblättriges Kleeblatt zu finden ist sehr selten. Deshalb glaubt man, dass die Person, die es findet, Glück hat. Um das Glück zu erhalten, muss man das Kleeblatt verschenken.","Glücksklee","klee.jpg"],
        ["Dieser Käfer ist nach der Jungfrau Maria benannt. Man sagt, dass sie ihn geschickt hat, damit er Schädlinge frisst und so die Nahrung der Menschen schützt. Glück bringen besonders die Käfer, die sieben Punkte auf dem Rücken haben. Das liegt daran, dass die sieben als Glückszahl gilt.","Marienkäfer","kaefer.jpg"],
        ["Der Schornsteinfeger reinigt den Kamin und beugt auf diese Weise Hausbränden vor. Deshalb ist man sehr froh, wenn er ins Haus kommt und glaubt, dass es Glück bringt, ihn zu berühren.","Schornsteinfeger","feger.jpg"],
        ["Früher wurde weniger Fleisch als heute gegessen, weil es teurer war. Wer ein Schwein hatte, wurde daher als reich und glücklich angesehen. Heute verschenkt man Schweine aus Marzipan an Neujahr, die dem Beschenkten Glück und Reichtum bringen sollen.","Glücksschwein","schwein.jpg"],
        ["Das Hufeisen ist der „Schuh“ des Pferdes. Es symbolisiert seine Stärke und soll die Menschen so schützen wie es den Fuß des Pferdes schützt. Es wird im Haus mit der Öffnung nach oben über der Tür angebracht, damit das Glück nicht herausfällt.","Hufeisen","hufeisen.jpg"],
        ["Bevor der Euro als neue Währung eingeführt wurde, hieß der Glücks-cent noch Glückspfennig. An seiner Bedeutung hat sich seitdem jedoch nichts geändert. Wer ein 1Cent Stück findet, soll es in sein Portemonnaie legen, damit er immer genug Geld hat.","Glückscent","cent.jpg"],
        ["Fällt eine Sternschnuppe vom Himmel, soll ein Wunsch in Erfüllung gehen, wird behauptet. Doch das gilt nur dann, wenn der Wunsch bis zum Verglühen zu Ende gedacht wurde. Im alten Griechenland sah man in den Sternschnuppen aufsteigende oder fallende Seelen. In der jüdisch-christlichen Tradition war eher von gefallenen Engeln oder Dämonen die Rede.","Sternschnuppe","sternschnuppe.jpg"],
        ["Auch Scherben bringen Glück. Es herrscht die Vorstellung, dass der Lärm, der beim Zerschmettern entsteht, das Glück herbei zwingt. Durch den Krach werden böse Geister vertrieben.","Scherben","scherben.jpg"],
        ["Der Volksglaube bringt den Fliegenpilz stets mit Hexen und Zauberern in Verbindung, und entsprechend dem Anlass mit Vergnügen oder Abscheu, je nachdem ob ihre Dienste benötigt wurden oder ihnen erlittenes Übel zugeschrieben wurde. Der Glückspilz galt in vielen Naturreligionen als Götterpilz, der ein langes Leben verheißt. ","Fliegenpilz","fliegenpilz.jpg"],
        ["Besonders in England erfreut sich der Mistelbusch großer Beliebtheit, denn dort heißt es 'kein Mistelzweig - kein Glück'. So wurden früher Mistelkugeln in Ställen, Scheune und Häusern aufgehängt um Menschen und Tiere vor bösen Geistern und bösen Träumen, aber auch vor Blitzschlag und Feuer zu beschützen.","Mistelzweig","mistelzweig.jpg"]
    ];

    var id=1;
    var div_container =[];
    var count = 0;
    var backgroundsave = "";

    //building the cards; push them into an array(div_container),shuffle the array
    data.forEach(function (entry) {
            var div = jQuery('<div/>', {
                class: 'mem_token',
                id: id,
                ontouchstart:"this.classList.toggle('hover')",
                "revealed": false,
                html: "<div class='flipper'><div class='front'><h2>Glück</h2></div><div class='back'><p>"+ entry[0] +"</p></div></div>"
            });
            var div2 = jQuery('<div/>', {
                class: 'mem_token',
                id: id,
                "revealed": false,
                html: "<div class='flipper'><div class='front'><h2>Glück</h2></div><div class='back'><img src='images/memory/"+entry[2]+"'></img></p></div></div>"
            });
            div_container.push(div);
            div_container.push(div2);
            div_container = shuffle(div_container);
            id++;
    });
    //add the cards to the game :)
    div_container.forEach(function(entry){
            $("#wrapper").append(entry);
    });
    $(document).on('click','.mem_token',function(){
        reveal(this);
    });

    function reveal(sender){
        if (count <= 1 && ($(sender).attr("revealed") === "false")) {
            $(sender).toggleClass("flip");
            count++;
        }else{if(count == 2){
            check();
        }}

    }
    function check(sender){
            var test = $(".mem_token.flip");
            if($(test[0]).attr("id") === $(test[1]).attr("id")){
                raisepoints();
                $(".mem_token.flip").remove();
                count = 0;
            }else {
                $(".mem_token.flip").toggleClass("flip");
                count = 0;
                raisefaults();
            }
        };

    }

    //helper function to shuffle an array
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
    };




