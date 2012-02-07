var Playlist = function(title) {
    this.title = title;

    this.tracks = [];
};

Playlist.prototype.createElement = function() {
    var data = {title: this.title};
    var div = ich.playlist(data);
    return div;
};

Playlist.prototype.addTrackFromURL = function(url, callback) {
    SC.get('/resolve', {url: url}, function(callback, track) {
        this.addTrack(track);
        if (callback) {
            callback();
        }
    }.bind(this, callback));
};

Playlist.prototype.addTrack = function(track) {
    this.tracks.push(new Track(track));
};
