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

Player.prototype.play = function(track) {
    if (track.track.stream_url) {
        var url = '/proxy?url=' + track.track.stream_url;
        this.player.load(url, this.onLoad.bind(this), this.onError.bind(this));

        this.track = track;
        this.playlist = this.app.currentPlaylist;
        this.loading = true;

        this.app.trackView.setNowPlaying();
        this.app.trackView.setLoading();
    }
    else {
        this.next();
    }
};

Player.prototype.stop = function() {
    this.player.stop();
    this.track = null;
    this.playlist = null;
    this.loading = false;
    this.app.trackView.unsetNowPlaying();
    this.app.trackView.unsetLoading();
};

Player.prototype.next = function() {
    var currentPosition = this.playlist.tracks.indexOf(this.track);
    if (currentPosition == -1 ||
        currentPosition >= this.playlist.tracks.length - 1) {
        this.stop();
        return;
    }

    this.play(this.playlist.tracks[currentPosition + 1]);
};

Player.prototype.onLoad = function() {
    this.app.trackView.unsetLoading();
    this.loading = false;
};

Player.prototype.onError = function() {
    this.next();
};
