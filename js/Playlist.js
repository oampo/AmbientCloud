var Playlist = function(title) {
    this.title = title;

    this.tracks = [];
};

Playlist.prototype.createElement = function() {
    var div = document.createElement('div');
    div.className = 'playlist';
    div.innerHTML = this.title;
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
