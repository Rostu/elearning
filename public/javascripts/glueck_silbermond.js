$( init );

function init() {
    $(".sourceline").each(function () {
        for (var i = $(this).children('.srcelem').length; i >= 0; i--) {
            $(this).append($(this).children('.srcelem')[Math.random() * i | 0]);
        }
    });

    var flexy = $("#flexybox");
    for (var i = $(flexy).children('.linebox').length; i >= 0; i--) {
        $(flexy).append($(flexy).children('.linebox')[Math.random() * i | 0]);
    }
    
    var srcid = 1;
    
    $(".srcelem").each(function () {
        var parentID = $(this).context.parentNode.id;
        //console.log(parentID);
        $(this).attr("id", parentID + "se" + srcid++);
        $(this).attr("draggable", "true");
        $(this).attr("ondragstart", "drag(event)");
    });
    
    $('[class$="line"]').each(function() {
        $(this).attr("ondrop", "drop(event)");
        $(this).attr("ondragover", "allowDrop(event)");
    });

    $('[class$="panelarrow"]').each(function() {
        $(this).attr("onclick", "reset(event)");
    });
}

function allowDrop(ev) {
    ev.preventDefault();
    var seID = 't' + ev.dataTransfer.getData("seID");
    if (!seID.match(new RegExp(ev.target.getAttribute("id"), "i"))) {
        ev.dataTransfer.dropEffect = "none";
    }
    else if (ev.target.getAttribute("draggable") == "true") {
        ev.dataTransfer.dropEffect = "none"; // dropping is not allowed
    }
    else if (ev.target.getAttribute("class") == "tgtelem") {
        ev.dataTransfer.dropEffect = "none";
    }
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
    var sourceline = $(linebox).children('.sourceline');
    var src_regex = new RegExp($(sourceline).attr('id') + "se", "i");
    var srcs = $('.srcelem').filter(function () {
        return this.id.match(src_regex);});
    $(srcs).each(function() {
        sourceline.append(this);
    });
}