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

TrackView.prototype.addTrack = function(track) {
    var element = track.createElement();
    $("#new-track").before(element);
};

TrackView.prototype.removeTrack = function(track) {
    $('#' + track.id).slideUp('normal', function() {
        $(this).remove();
    });
};

TrackView.prototype.clear = function() {
    $('.track').remove();
};

TrackView.prototype.set = function(playlist) {
    this.clear();
    $('#tracks .subheading').text(playlist.title);
    for (var i=0; i<playlist.tracks.length; i++) {
        var track = playlist.tracks[i];
        this.addTrack(track);
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
    this.app.currentPlaylist.addTrackFromURL($("#new-track input").val());
    this.hideTrackInput();
    return false;
};
