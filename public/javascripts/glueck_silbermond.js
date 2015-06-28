$( init );

function init() {
    var srcid = 1;
    
    $(".srcelem").each(function () {
        var parentID = $(this).context.parentNode.id;
        //console.log(parentID);
        $(this).attr("id", parentID + "se" + srcid++);
        $(this).attr("draggable", "true");
        $(this).attr("ondragstart", "drag(event)");
    });
    
    $('[class$="line"]').each(function () {
        $(this).attr("ondrop", "drop(event)");
        $(this).attr("ondragover", "allowDrop(event)");
    });

    $('[class$="panelarrow"]').each(function () {
        $(this).attr("onclick", "reset(event)");
    });
}

function allowDrop(ev) {
    ev.preventDefault();
    if (ev.target.getAttribute("draggable") == "true")
        ev.dataTransfer.dropEffect = "none"; // dropping is not allowed
    if (ev.target.getAttribute("class") == "tgtelem")
        ev.dataTransfer.dropEffect = "none";
}

function drag(ev) {
    ev.dataTransfer.setData("seID", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("seID");
    ev.target.appendChild(document.getElementById(data));
}

function reset(ev) {
    var linebox = ev.target.closest('.linebox');
    var sourceline_id = $(linebox).children('.sourceline').id;
    console.log(sourceline_id);
    //$('[id^=').each(function () {
    //    $(this).attr("onclick", "reset(event)");
    //});
    document.getElementById(linebox_id);

}