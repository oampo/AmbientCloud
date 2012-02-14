var static = require('node-static');
var http = require('http');
var request = require('request');
var url = require('url');

var port = process.env.PORT || 3000;

var file = new static.Server('.');

var app = http.createServer(function (req, res) {
    var parsed = url.parse(req.url, true);
    // Oh my, this is wonderfully ugly...
    if (parsed.pathname == '/proxy') {
        var scURL = parsed.query.url;
        scURL += '?client_id=382b4cea1549fc6ed4682acaf0e0fe65';
        console.log(scURL);
        request.get(scURL).pipe(res);
    }
    else {
        req.addListener('end', function () {
            file.serve(req, res);
        });
    }
});
app.listen(port);
