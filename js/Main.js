var SlowCloud = function() {
    SC.initialize({
        client_id: '382b4cea1549fc6ed4682acaf0e0fe65',
        redirect_uri: 'http://slooowcloud.nodejitsu.com/callback.html',
    });

    SC.connect(this.onConnect.bind(this));

    this.playlists = [];
    this.currentPlaylist = null;

    this.playlistView = new PlaylistView(this);
    this.trackView = new TrackView(this);
};

SlowCloud.prototype.onConnect = function() {
    this.getPlaylists();
};

SlowCloud.prototype.getPlaylists = function() {
    SC.get('/me/playlists', this.onGetPlaylists.bind(this));
};

SlowCloud.prototype.onGetPlaylists = function(playlists) {
    this.playlists = [];
    for (var i=0; i<playlists.length; i++) {
        this.playlists.push(new Playlist(playlists[i]));
    }
    this.playlistView.update(this.playlists);
};

window.onload = function() {
    window.app = new SlowCloud();
};
