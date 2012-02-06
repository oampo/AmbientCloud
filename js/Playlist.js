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
    $(div).click(this.onClick.bind(this));
    return div;
};

Playlist.prototype.onClick = function() {
};
