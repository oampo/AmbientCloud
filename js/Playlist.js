/**
 * A single playlist which stores a list of tracks.
 */
var Playlist = function(app, title) {
    this.app = app;
    this.title = title;

    this.tracks = [];
    this.id = uid();
};

/**
 * Create a populated dom element for the playlist from a mustache template.
 *
 * TODO: Maybe should be split out for better model/view separation?
 */
Playlist.prototype.createElement = function() {
    var data = {title: this.title,
                id: this.id};
    var div = ich.playlist(data);
    return div;
};

/**
 * Adds a track to the playlist after retreiving the data info from SoundCloud.
 * Asynchronous.
 *
 * TODO: Should handle errors.
 */
Playlist.prototype.addTrackFromURL = function(url) {
    SC.get('/resolve', {url: url}, this.addTrack.bind(this));
};

/**
 * Add a track to the playlist, force a UI update, and store the current state.
 */
Playlist.prototype.addTrack = function(track) {
    var track = new Track(this.app, track);
    this.tracks.push(track);
    this.app.trackView.addTrack(track);
    this.app.save();
};

/**
 * Remove a track from the playlist, force a UI update, and store the current
 * state.
 */
Playlist.prototype.removeTrack = function(track) {
    var index = this.tracks.indexOf(track);
    this.tracks.splice(index, 1);
    this.app.trackView.removeTrack(track);
    this.app.save();
};

/**
 * Change the position of a track in the playlist, and store the current state.
 * Note that we don't update the UI, as we are getting the positions from
 * jQuery UI's sortable which will already have updated the UI.
 */
Playlist.prototype.moveTrack = function(oldIndex, newIndex) {
    var track = this.tracks.splice(oldIndex, 1)[0];
    this.tracks.splice(newIndex, 0, track);
    this.app.save();
};
