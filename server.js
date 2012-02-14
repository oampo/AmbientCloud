var static = require('node-static');
var http = require('http');
var url = require('url');

var port = process.env.PORT || 3000;

var file = new static.Server('.');

var app = http.createServer(function (requestToNode, responseToClient) {
    // Parse the request url
    var parsed = url.parse(requestToNode.url, true);
    if (parsed.pathname == '/proxy') {
        // We want proxying.  The SoundCloud API url is contained in the ?url
        // part of the request URL
        var scURL = parsed.query.url;

        // Parse the SoundCloud URL and compile options for a get request 
        var parsedSCURL = url.parse(scURL);

        var options = {
            host: parsedSCURL.host,
            port: 80,
            path: parsedSCURL.pathname + '?client_id=382b4cea1549fc6ed4682acaf0e0fe65'
        };
        
        // Ask the SoundCloud API server for the media URL
        var requestToSC = http.get(options, function(responseFromSC) {
            // If it's a 302, then we have the media URL
            if (responseFromSC.statusCode = 302) {
                // Media URL is in headers.location
                var mediaLocation = responseFromSC.headers.location;

                // Parse the media URL and compile the options for a (second)
                // get request
                var parsedMediaURL = url.parse(mediaLocation);
                var options = {
                    host: parsedMediaURL.host,
                    port: 80,
                    path: parsedMediaURL.pathname + parsedMediaURL.search
                };

                // Request the media
                var requestForMedia = http.get(options,
                                               function(responseFromMedia) {
                    // And stream it back to the client
                    responseFromMedia.pipe(responseToClient);    
                });

                requestForMedia.on('error', function(error) {
                    // If we can't get to the SC media server then respond
                    // with a 404
                    responseToClient.writeHead(404);
                    responseToClient.end();
                });
            }
            else {
                // If the SoundCloud API server doesn't give a 302 then we
                // don't have the media, so we'll respond with a 404
                responseToClient.writeHead(404);
                responseToClient.end();
            }
        });

        
        requestToSC.on('error', function(error) {
            // If we can't get to the SC API server then respond with a 404
            responseToClient.writeHead(404);
            responseToClient.end();
        });
    }
    else {
        // Not a proxy request, so serve the static files
        requestToNode.on('end', function () {
            file.serve(requestToNode, responseToClient);
        });
    }
});
app.listen(port);
