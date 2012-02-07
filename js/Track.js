var Track = function(track) {
    this.track = track;
};

Track.prototype.createElement = function() {
    var data = {title: this.track.title,
                artist: this.track.user.username};
    var div = ich.track(data);
    return div;
};
