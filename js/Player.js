/**
 * Track player.  Handles loading tracks from SoundCloud, and playing them
 * through interesting effects.
 */
var Player = function(app) {
    this.app = app;

    // DSP chain
    this.audiolet = new Audiolet();
    this.player = new WebKitBufferPlayer(this.audiolet, this.next.bind(this));
    this.delay = new FeedbackDelay(this.audiolet, 5, 0.9);
    this.reverb = new Reverb(this.audiolet, 1, 1, 0);
    this.player.connect(this.delay);
    this.delay.connect(this.reverb);
    this.reverb.connect(this.audiolet.output);

    this.track = null;
    this.playlist = null;
    this.loading = false;
};

/**
 * Attempt to load a track and play it.  Updates the track view with loading
 * and playing indicators.
 */
Player.prototype.play = function(track) {
    if (track.track.stream_url) {
        // Load the track from our Node.js proxy, rather than straight from
        // SoundCloud because of
        // http://code.google.com/p/chromium/issues/detail?id=96136
        var url = '/proxy?url=' + track.track.stream_url;
        this.player.load(url, this.onLoad.bind(this), this.onError.bind(this));

        this.track = track;
        this.playlist = this.app.currentPlaylist;
        this.loading = true;

        // Update the track view
        this.app.trackView.setNowPlaying();
        this.app.trackView.setLoading();
    }
    else {
        // Track is not streamable, so just skip to the next one
        this.next();
    }
};

/**
 * Stop the player, and update the track view to reflect this.
 */
Player.prototype.stop = function() {
    this.player.stop();
    this.track = null;
    this.playlist = null;
    this.loading = false;
    this.app.trackView.unsetNowPlaying();
    this.app.trackView.unsetLoading();
};

/**
 * Skip to the next track in the current playlist, or stop if there is no
 * next track.
 */
Player.prototype.next = function() {
    var currentPosition = this.playlist.tracks.indexOf(this.track);
    if (currentPosition == -1 ||
        currentPosition >= this.playlist.tracks.length - 1) {
        this.stop();
        return;
    }

    this.play(this.playlist.tracks[currentPosition + 1]);
};

/**
 * Callback if a track loads successfully.  Updates the track view to reflect
 * that we are no longer loading
 */
Player.prototype.onLoad = function() {
    this.app.trackView.unsetLoading();
    this.loading = false;
};

/**
 * Callback if a track does not load succesfully (either due to a decoding
 * error, or a failed request).  Skips to the next track.
 */
Player.prototype.onError = function() {
    this.next();
};
