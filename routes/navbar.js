var sites = [
    ['glueck_start','glueck_task1a','glueck_task1b','glueck_task2','glueck_task3','glueck_task4'],
    ['handy_start','handy_task1','handy_task2'],
    ['ersti_start','ersti_task1','ersti_task2','ersti_task2b','ersti_task2c','ersti_task3','ersti_task3b','ersti_task3c','ersti_task4'],
    ['veggieday_start','veggieday_task1','veggieday_task3','veggieday_task4','veggieday_task5'],
    ['wertewandel_start','wertewandel_task1','wertewandel_task2','wertewandel_task3','wertewandel_task4'],
    ['generationen_start','generationen_text','generationen_task1','generationen_task2','generationen_task3'],
    ['zukunft_start','zukunft_task1','zukunft_task2','zukunft_task3','zukunft_task4','zukunft_task5'],
    ['china_start', 'china_task1','china_task2','china_task3']
];


exports.getnext = function(last){
    for (i=0;i<sites.length;i++){
        for(j=0;j<sites[i].length;j++){
            if (sites[i][j] == last){
                if (sites[i].length == j+1){return sites[i][0]}
                if (sites[i].length != j+1){return sites[i][j+1]}
                else return 'home';
            }
        }
    }
};

exports.getlast = function(last){
    for (i=0;i<sites.length;i++){
        for(j=0;j<sites[i].length;j++){
            if (sites[i][j] == last){
                if (j == 0){return sites[i][0]}
                if (j != 0){return sites[i][j-1]}
                else return 'home';
            }
        }
    }
};

exports.getindex = function(last){
    for (i=0;i<sites.length;i++){
        for(j=0;j<sites[i].length;j++){
            if (sites[i][j] == last){
                return sites[i][0];
            }
        }
    }
    return 'home';
};