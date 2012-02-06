var Playlist = function(playlist) {
    this.playlist = playlist;
};

Playlist.prototype.createElement = function() {
    var div = document.createElement('div');
    div.className = 'playlist';
    div.innerHTML = this.playlist.title;
    return div;
};
