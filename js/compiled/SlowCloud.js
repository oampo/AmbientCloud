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
};

window.onload = function() {
    window.app = new SlowCloud();
};
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

    $('#new-playlist').click(this.showPlaylistInput.bind(this));
    $('#new-playlist input[type="text"]').blur(this.hidePlaylistInput.bind(this));
    $('#new-playlist form').submit(this.onNewPlaylistSubmit.bind(this));
};

PlaylistView.prototype.show = function() {
    this.div.slideDown();
};

PlaylistView.prototype.hide = function() {
    this.div.slideUp();
};

PlaylistView.prototype.update = function() {
    $('.playlist').remove();
    var newPlaylistDiv = $('#new-playlist');
    for (var i=0; i<this.app.playlists.length; i++) {
        var playlist = this.app.playlists[i];
        var element = playlist.createElement();
        newPlaylistDiv.before(element);
        $(element).click(this.onClick.bind(this, playlist));
    }
};

PlaylistView.prototype.onClick = function(playlist) {
    this.hide();
    this.app.currentPlaylist = playlist;
    $("#tracks .subheader").text(playlist.title);
    this.app.trackView.update(playlist.tracks);
    this.app.trackView.show();
};

PlaylistView.prototype.showPlaylistInput = function() {
    $('#new-playlist .label').slideUp();
    $('#new-playlist .input').slideDown();
    $('#new-playlist input[type="text"]').focus();
};

PlaylistView.prototype.hidePlaylistInput = function() {
    $("#new-playlist .label").slideDown();
    $("#new-playlist .input").slideUp();
    $("#new-playlist input").val("");

};

PlaylistView.prototype.onNewPlaylistSubmit = function() {
    var playlist = new Playlist($("#new-playlist input").val());
    this.app.addPlaylist(playlist);
    this.update();
    this.hidePlaylistInput();
    this.onClick(playlist);
    return false;
};
var TrackView = function(app) {
    this.app = app;
    this.div = $('#tracks');

    $('#back-to-playlists').click(this.onBack.bind(this));

    $('#new-track').click(this.showTrackInput.bind(this));
    $('#new-track input[type="text"]').blur(this.hideTrackInput.bind(this));
    $('#new-track form').submit(this.onNewTrackSubmit.bind(this));
};

TrackView.prototype.show = function() {
    this.div.slideDown();
};

TrackView.prototype.hide = function() {
    this.div.slideUp();
};

TrackView.prototype.update = function() {
    $('.track').remove();
    for (var i=0; i<this.app.currentPlaylist.tracks.length; i++) {
        var track = this.app.currentPlaylist.tracks[i];
        var element = track.createElement();
        $("#new-track").before(element);
    }
};

TrackView.prototype.onBack = function() {
    this.div.hide();
    this.app.currentPlaylist = null;
    this.app.playlistView.show();
};

TrackView.prototype.showTrackInput = function() {
    $('#new-track .label').slideUp();
    $('#new-track .input').slideDown();
    $('#new-track input[type="text"]').focus();
};

TrackView.prototype.hideTrackInput = function() {
    $("#new-track .label").slideDown();
    $("#new-track .input").slideUp();
    $("#new-track input").val("");
    
};

TrackView.prototype.onNewTrackSubmit = function() {
    this.app.currentPlaylist.addTrackFromURL($("#new-track input").val(),
                                             this.update.bind(this));
    this.hideTrackInput();
    return false;
};
