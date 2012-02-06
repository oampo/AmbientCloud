var static = require('node-static');
var http = require('http');

var port = process.env.PORT || 3000;

var file = new static.Server('.');

var app = http.createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    });
});
app.listen(port);
