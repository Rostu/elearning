$( init );

function init() {
    var srcid = 1;
    
    $(".srcelem").each(function () {
        $(this).attr("id", "se" + srcid++);
        $(this).attr("draggable", "true");
        $(this).attr("ondragstart", "drag(event)");
    });
    $('[class$="line"]').each(function () {
        $(this).attr("ondrop", "drop(event)");
        $(this).attr("ondragover", "allowDrop(event)");
    });
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    console.log($(ev.target.textContent));
    ev.dataTransfer.setData("seID", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("seID");
    console.log(data);
    ev.target.appendChild(document.getElementById(data));
}