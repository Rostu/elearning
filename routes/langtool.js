var http = require('http');

exports.get_request = function(request, result) {

    var sentence = request.param("sentence");
    console.log(sentence);

    var options = {
        host: 'localhost',
        port: 8081,
        path: '/?language=de&text=wo+bist+du',
        method: 'GET'
    };

    http.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
            result.send(chunk);
        });
    }).end();
}