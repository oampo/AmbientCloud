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

Playlist.prototype.addTrackFromURL = function(url) {
    SC.get('/resolve', {url: url}, this.addTrack.bind(this));
};

Playlist.prototype.addTrack = function(track) {
    this.tracks.push(new Track(track));
};
