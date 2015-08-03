var http = require('http');
var xml2js = require('xml2js');

exports.get_request = function(request, response) {

    var sentence = request.param("sentence");
    console.log(sentence);

    var options = {
        host: 'localhost',
        port: 8081,
        path: '/?language=de&text=' + encodeURIComponent(sentence),
        method: 'GET'
    };

    http.request(options, function(langtool_res) {
        
        langtool_res.setEncoding('utf8');
        
        langtool_res.on('data', function (xml) {

            var json;
            var parser = new xml2js.Parser({"attrkey": "attributes"});

            parser.parseString(xml, function (error, result) {
                if(error){
                    console.log(error);
                }else{
                    json = result;
                }
            });
            
            response.send(json);
        });
    }).end();
}