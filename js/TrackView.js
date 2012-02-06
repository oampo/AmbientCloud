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
