

    $(document).ready(function() {
        for (z = 1; z < 16; z++) {
            var zeile = jQuery('<div/>', {
                class: 'zeile',
                id: z,
                html: " "
            });
            $("#wortfeld").append(zeile);
            for (s = 1; s < 16; s++) {
                var div = jQuery('<div/>', {
                    class: 'feld',
                    id: s,
                    html: " "
                });
                $(".zeile[id=" + z + "]").append(div);
            }
        }
    });
