/*
 * Written by David
 */

// Global map
var map = [];

// Saves the score for a given task
function setScore(task, score) {
    map[normalize(task)] = score;
}

// Returns the score for a given task
function getScore(task) {
    return map[normalize(task)];
}

/* Normalizes task names
 * so that each call to the above methods
 * functions as expected, even if the
 * task names are indicated in different manners
 *
 * The fall-through in the switch cases is intended
 */
function normalize(name) {
    switch(name) {
        case "1":
        case "1a":
        case "t1":
        case "t1a":
        case "task1":
        case "task1a":
            return "task1";

        case "2":
        case "2a":
        case "t2":
        case "t2a":
        case "task2":
        case "task2a":
            return "task2a";

        case "2b":
        case "t2b":
        case "task2b":
            return "task2b";

        case "2c":
        case "t2c":
        case "task2c":
            return "task2c";

        case "3":
        case "3a":
        case "t3":
        case "t3a":
        case "task3":
        case "task3a":
            return "task3a";

        case "3b":
        case "t3b":
        case "task3b":
            return "task3b";

        case "3c":
        case "t3c":
        case "task3c":
            return "task3c";

        case "4":
        case "4a":
        case "t4":
        case "t4a":
        case "task4":
        case "task4a":
            return "task4";

        default: return "unknown";
    }
}

// Calculates the global score over all tasks
// in this chapter ('ersti')
function calculateGlobalScore () {
    return 0;
}

function test() {
    return 42;
}

$(document).ready(function() {
   if(/end$/.test(document.location.href)) {
       $('#task1').append(getScore("t1"));
       $('#task2').append(getScore("t2"));
       $('#task2b').append(getScore("t2b"));
       $('#task2c').append(getScore("t2c"));
       $('#task3').append(getScore("t3"));
       $('#task3b').append(getScore("t3b"));
       $('#task3c').append(getScore("t3c"));
       $('#task4').append(getScore("t4"));
       console.log(map);

       $('#test').append(test());
   }
});