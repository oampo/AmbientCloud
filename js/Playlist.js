var Playlist = function(app, title) {
    this.app = app;
    this.title = title;

    this.tracks = [];
    this.id = uid();
};

Playlist.prototype.createElement = function() {
    var data = {title: this.title,
                id: this.id};
    var div = ich.playlist(data);
    return div;
};

Playlist.prototype.addTrackFromURL = function(url) {
    SC.get('/resolve', {url: url}, this.addTrack.bind(this));
};

Playlist.prototype.addTrack = function(track) {
    var track = new Track(this.app, track);
    this.tracks.push(track);
    this.app.trackView.addTrack(track);
    this.app.save();
};

Playlist.prototype.removeTrack = function(track) {
    var index = this.tracks.indexOf(track);
    this.tracks.splice(index, 1);
    this.app.trackView.removeTrack(track);
    this.app.save();
};

Playlist.prototype.moveTrack = function(oldIndex, newIndex) {
    var track = this.tracks.splice(oldIndex, 1)[0];
    this.tracks.splice(newIndex, 0, track);
    this.app.save();
};
