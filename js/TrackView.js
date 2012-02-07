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
