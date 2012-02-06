var SlowCloud = function() {
    SC.initialize({
        client_id: '382b4cea1549fc6ed4682acaf0e0fe65',
        redirect_uri: 'http://slooowcloud.nodejitsu.com/callback.html',
    });

    SC.connect(this.onConnect.bind(this));

    this.playlists = [];

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
var Track = function(track) {
    this.track = track;
};

Track.prototype.createElement = function() {
    var div = document.createElement('div');
    div.className = 'track';
    div.innerHTML = this.track.title + " by " + this.track.user.username;
    return div;
};
var PlaylistView = function(app) {
    this.app = app;
    this.div = $('#playlists');
};

PlaylistView.prototype.show = function() {
    this.div.slideDown();
};

PlaylistView.prototype.hide = function() {
    this.div.slideUp();
};

PlaylistView.prototype.update = function(playlists) {
    $('.playlist').remove();
    var newPlaylistDiv = $('#new-playlist');
    for (var i=0; i<playlists.length; i++) {
        var playlist = playlists[i];
        var element = playlist.createElement();
        newPlaylistDiv.before(element);
        $(element).click(this.onClick.bind(this, playlist));
    }
};

PlaylistView.prototype.onClick = function(playlist) {
    this.hide();
    this.app.trackView.update(playlist.tracks);
    this.app.trackView.show();
};
var TrackView = function(app) {
    this.app = app;
    this.div = $('#tracks');

    this.newTrackDiv = $('#new-track');
    this.backDiv = $('#back-to-playlists');

    this.backDiv.click(this.onBack.bind(this));
};

TrackView.prototype.show = function() {
    this.div.slideDown();
};

TrackView.prototype.hide = function() {
    this.div.slideUp();
};

TrackView.prototype.update = function(tracks) {
    $('.track').remove();
    for (var i=0; i<tracks.length; i++) {
        var element = tracks[i].createElement();
        this.newTrackDiv.before(element);
    }
};

TrackView.prototype.onBack = function() {
    this.div.hide();
    this.app.playlistView.show();
};
