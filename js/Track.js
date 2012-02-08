/**
 * A single track.  Most of the data is stored in the this.track member, which
 * holds all of the track information that we recieve from SoundCloud.
 *
 * TODO: Would be nicer to extend the SoundCloud track object, rather than
 * storing it seperately.
 */
var Track = function(app, track) {
    this.app = app;
    this.track = track;

    this.id = this.track.id;
};

/**
 * Create a populated dom element for the track from a mustache template.
 *
 * TODO: Maybe should be split out for better model/view separation?
 */
Track.prototype.createElement = function() {
    var data = {title: this.track.title,
                artist: this.track.user.username,
                id: this.id};
    var div = ich.track(data);
    return div;
};
