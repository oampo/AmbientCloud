var Track = function(app, track) {
    this.app = app;
    this.track = track;

    this.id = this.track.id;
};

Track.prototype.createElement = function() {
    var data = {title: this.track.title,
                artist: this.track.user.username,
                id: this.id};
    var div = ich.track(data);
    return div;
};
