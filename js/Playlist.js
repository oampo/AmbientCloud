var Playlist = function(playlist) {
    this.playlist = playlist;

    this.tracks = [];
    for (var i=0; i<this.playlist.tracks.length; i++) {
        this.tracks.push(new Track(this.playlist.tracks[i]));
    }
};

Playlist.prototype.createElement = function() {
    var div = document.createElement('div');
    div.className = 'playlist';
    div.innerHTML = this.playlist.title;
    return div;
};

Playlist.prototype.addTrackFromURL = function(url) {
    SC.get('/resolve', {url: url}, this.addTrack.bind(this));
};

Playlist.prototype.addTrack = function(track) {
    console.log(track);
};
