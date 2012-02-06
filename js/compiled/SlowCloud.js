var SlowCloud = function() {
    SC.initialize({
        client_id: '382b4cea1549fc6ed4682acaf0e0fe65',
        redirect_uri: 'http://slooowcloud.nodejitsu.com/callback.html',
    });

    SC.connect(this.onConnect.bind(this));

    this.playlists = [];
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
    this.updatePlaylistView();
};

SlowCloud.prototype.updatePlaylistView = function() {
    var newPlaylistDiv = $('#new-playlist');
    for (var i=0; i<this.playlists.length; i++) {
        var element = this.playlists[i].createElement();
        newPlaylistDiv.before(element);
    }
};

window.onload = function() {
    window.app = new SlowCloud();
};
var Playlist = function(playlist) {
    this.playlist = playlist;
};

Playlist.prototype.createElement = function() {
    var div = document.createElement('div');
    div.className = 'playlist';
    div.innerHTML = this.playlist.title;
    return div;
};
