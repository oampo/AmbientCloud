var SlowCloud = function() {
    SC.initialize({
        client_id: '382b4cea1549fc6ed4682acaf0e0fe65',
    });

    this.playlists = [];
    this.currentPlaylist = null;

    this.playlistView = new PlaylistView(this);
    this.trackView = new TrackView(this);
};

SlowCloud.prototype.addPlaylist = function(playlist) {
    this.playlists.push(playlist);
    this.playlistView.addPlaylist(playlist);
};

SlowCloud.prototype.removePlaylist = function(playlist) {
    var index = this.playlists.indexOf(playlist);
    this.playlists.splice(index, 1);
    this.playlistView.removePlaylist(playlist);
};
    

window.onload = function() {
    window.app = new SlowCloud();
};
