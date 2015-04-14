var sites = [
    ['glueck_start','glueck_Textproduktion_Antonyme_A','glueck_Textproduktion_Antonyme_B','glueck_Textverstehen_Zeitangaben','glueck_Textverstehen_Wortspirale','glueck_Textverstehen_Redensarten','glueck_Kreuzwortraetsel','glueck_Memory'],
    ['handy_start','handy_task1','handy_task2'],
    ['ersti_start','ersti_Textverstehen_emotionale_Woerter','ersti_Textverstehen_Wortfeld_Universitaet_A','ersti_Textverstehen_Wortfeld_Universitaet_B','ersti_Textverstehen_Wortfeld_Universitaet_C','ersti_Wortschatz_ordnen_A','ersti_Wortschatz_ordnen_B','ersti_Wortschatz_ordnen_C','ersti_Wortschatz_erweitern'],
    ['veggieday_start','veggieday_Textverstehen_Schluesselwoerter_in_Boulevardzeitungen','veggieday_Textverstehen_Schluesselwoerter_in_Fachtexten_1','veggieday_Textverstehen_Schluesselwoerter_in_Fachtexten_2'],
    ['wertewandel_start','wertewandel_Textverstehen_Schluesselwoerter','wertewandel_Wortbedeutung_verstehen','wertewandel_Textverstehen_Kernaussagen','wertewandel_Textproduktion_Statistische_Angaben'],
    ['generationen_start','generationen_text','generationen_Textverstehen_Komposita','generationen_Wortschatz_ordnen','generationen_Textverstehen_Bedeutungserschliessung'],
    ['zukunft_start','zukunft_Textverstehen_Wortfeld_Technik','zukunft_Wortschatz_ordnen','zukunft_Wortschatzerweiterung_fest_Wortverbindungen','zukunft_Textproduktion','zukunft_Kreuzwortraetsel'],
    ['china_start', 'china_Textverstehen_Wortfeld_Studium','china_Wortschatz_ordnen','china_Textverstehen_Redewiedergabe']
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