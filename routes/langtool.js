var http = require('http');
var xml2js = require('xml2js');

exports.get_errors = function(request, response) {

    var text = request.param("text");

    var options = {
        host: 'localhost',
        port: 8081,
        path: '/?language=de-DE&text=' + encodeURIComponent(text),
        method: 'GET'
    };

    var http_req = http.request(options, function(langtool_res) {

        langtool_res.setEncoding('utf8');

        langtool_res.on('data', function (xml) {

            var xml_parser = new xml2js.Parser({"attrkey": "attributes"});

            xml_parser.parseString(xml, function (error, output) {
                response.send(output);
            });
        });
    });

    http_req.on('error', function(error) {
        console.log("An error occurred during your LanguageTool request. Error data:");
        console.log(error);
        response.send(JSON.parse("{}"));
    });

    http_req.end();
};
