var Track = function(track) {
    this.track = track;
};

Track.prototype.createElement = function() {
    var div = document.createElement('div');
    div.className = 'track';
    div.innerHTML = this.track.title + " by " + this.track.user.username;
    return div;
};
