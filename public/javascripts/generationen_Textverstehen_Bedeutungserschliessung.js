        $(document).ready(function() {

                var testarray = ["etw. (auseinander) schneiden", "sich annÃ¤hern", "Ausruhen", "Anziehen", "Sich verbiegen", "SchieÃŸen", "PC in die Garage auslagern", "Abstellplatz fÃ¼r PC", "konstanter Reichtum (Besitz)", "aufrechter Stand", "reinigen", "streicheln"];
                var array = ["Abstand vergrÃ¶ÃŸern","Anstrengen","Gehen","etw./jmd. (ab-)setzen [um Ruhe zu haben]","Ausdauer","streiten"];
                var infos =["Auseinanderschneiden bedeutet etwas mit einer Schere oder Ã¤hnlichem im konkreten Wortsinn zu trennen; â€žLebensweltenâ€œ ist ein abstrakter Begriff, also nichts, was sich auseinanderschneiden lÃ¤sst.",
                        "auseinanderklaffen lÃ¤sst sich in auseinander + klaffen zerteilen. â€žauseinanderâ€œ bedeutet sich entfernen von jemandem oder etwas, also das Gegenteil von â€žsich annÃ¤hernâ€œ",
                        "Wenn ich mich nicht ins Zeug lege, dann ruhe ich mich aus. Ausruhen ist das Gegenteil von ins Zeug legen.",
                        "hier wurdest du aufs Glatteis gefÃ¼hrt: Anziehen hat nichts mit â€žins Zeug legenâ€œ zu tun. Man kann beispielsweise Kleidung anziehen.",
                        "Das bedeutet sich verformen oder krÃ¼mmen, bzw. verÃ¤ndern.",
                        "SchieÃŸen ist ein Verb mit der Bedeutung jmd. tÃ¶ten, feuern, knallen und passt somit von der Wortbedeutung nicht zum Satz.",
                        "Wenn man etwas (PC) von einer Stelle weg an eine andere verlagert (Garage). Hier ist nicht das â€žverlagernâ€œ gemeint sondern das â€žzur Ruhe kommenâ€œ.",
                        "einen Abstellplatz fÃ¼r den PC bezeichnet das Gegenteil von  â€žJugendlichen vor dem PC platzieren.â€œ",
                        "â€žkonstantâ€œ wÃ¼rde zwar zu StehvermÃ¶gen passen. Dennoch ist dieses Wort in Verbindung mit â€žReichtumâ€œ darauf bezogen, dass man dauerhaft VermÃ¶genswerte oder Besitz ansammelt. Reichtum ist kein Mittel zur Erlernung von Disziplin und Erfolg.",
                        "aufrechtes Stehen bezieht sich eher auf den physischen Aspekt und ist ebenso kein Mittel zur Erlernung von Disziplin und Erfolg.",
                        "â€žreinigenâ€œ bedeutet etwas sÃ¤ubern bzw. Schmutz oder Flecken von etwas entfernen.",
                        "â€žstreichelnâ€œ bezeichnet ein Verb â€žmit leichten, gleitenden Bewegungen der Hand sanft, liebkosend berÃ¼hrenâ€œ"
                    ];
                var j = 0;
                var shiftarray = testarray.slice();
                $('.mco').toArray().map(function(e) {
                        var b = [];
                        b.push(array.shift());
                        b.push(shiftarray.shift());
                        b.push(shiftarray.shift());
                        b = shuffle(b);
                        var app = $(e);
                        for (var i = 0; i < b.length; i++) {
                                app.append(createInput(e, i+j));
                                app.append(createLabel(b[i], i+j));
                                app.append("<br/>");
                                j++;
                            }
                    });

                    function createInput(mco, i) {
                            return '<input type="radio" name="n' + mco.id + '" id="c' + i + '">';
                        }

                function createLabel(text, i) {
                        return "<label for='c" + i + "'>" + text + "</label>";
                    }

                $('#check').click(function() {
                        $('.mco').toArray().map(function(e) {
                                $(e).children('input').toArray().map(function(f) {
                                        if($(f).is(':checked')) {
                                                var txt = $('label[for=' + f.id + ']').text();
                                                if ($.inArray(txt, testarray)>-1) {
                                                        makeNotice($(e), infos[$.inArray(txt,testarray)]);
                                                        markfalse($(e));
                                                    } else {
                                                        removeNoticeIfPresent($(e));
                                                        marktrue($(e));
                                                    }
                                            }
                                    });
                            });
                    });

                    function makeNotice(where, what) {
                            removeNoticeIfPresent(where);
                            var obj = "<div class='infonotice' id='n"+ where.attr("id") + "'>" + what + "</div>";
                            where.append(obj);
                        }

                function removeNoticeIfPresent(where) {
                        var obj = $('#n'+where.attr("id"));
                        if (obj.length) {
                                obj.detach();
                            }
                    }

                $('#weiter').click(function() {
                        $('#check').click();
                        if ($('.wrong').toArray().length == 0) {
                                alert("Gut gemacht! Weiter so!");
                                // TODO neue seite laden
                                    //document.location.href = "generationen_ende";
                                    }
                    });

                    function markfalse(elem) {
                            if (elem.hasClass("wrong")) return;
                            if (elem.hasClass("right")) elem.removeClass("right");
                            elem.addClass("wrong");
                        }

                function marktrue(elem) {
                        if (elem.hasClass("right")) return;
                        if (elem.hasClass("wrong")) elem.removeClass("wrong");
                elem.addClass("right");
                    }
            });


