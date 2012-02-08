var SlowCloud = function() {
    SC.initialize({
        client_id: '382b4cea1549fc6ed4682acaf0e0fe65',
    });

    this.playlists = [];
    this.currentPlaylist = null;

    this.playlistView = new PlaylistView(this);
    this.trackView = new TrackView(this);

    this.load();
};

SlowCloud.prototype.addPlaylist = function(playlist) {
    this.playlists.push(playlist);
    this.playlistView.addPlaylist(playlist);
    this.save();
};

SlowCloud.prototype.removePlaylist = function(playlist) {
    var index = this.playlists.indexOf(playlist);
    this.playlists.splice(index, 1);
    this.playlistView.removePlaylist(playlist);
    this.save();
};

SlowCloud.prototype.save = function() {
    // Store simplified version, and recreate when we reload, as data
    // may have changed
    var playlists = [];
    for (var i=0; i<this.playlists.length; i++) {
        var playlist = this.playlists[i];
        var reducedPlaylist = {};
        reducedPlaylist.title = playlist.title;
        reducedPlaylist.tracks = [];
        for (var j=0; j<playlist.tracks.length; j++) {
            var track = playlist.tracks[j];
            reducedPlaylist.tracks.push(track.track.permalink_url);
        }
        playlists.push(reducedPlaylist);
    }
    localStorage.setItem('playlists', JSON.stringify(playlists));
};

SlowCloud.prototype.load = function() {
    var playlists = localStorage.getItem('playlists');
    if (!playlists) {
        return;
    }
    playlists = JSON.parse(playlists);
    for (var i=0; i<playlists.length; i++) {
        var reducedPlaylist = playlists[i];
        var playlist = new Playlist(this, reducedPlaylist.title);
        this.addPlaylist(playlist);
        for (var j=0; j<reducedPlaylist.tracks.length; j++) {
            playlist.addTrackFromURL(reducedPlaylist.tracks[j]);
        }
    }
};
    

window.onload = function() {
    window.app = new SlowCloud();
};
