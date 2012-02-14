var Player = function(app) {
    this.app = app;
    this.audiolet = new Audiolet();
    this.player = new WebKitBufferPlayer(this.audiolet);
    this.delay = new FeedbackDelay(this.audiolet, 5, 0.9);
    this.reverb = new Reverb(this.audiolet, 1, 1, 0);
    this.player.connect(this.delay);
    this.delay.connect(this.reverb);
    this.reverb.connect(this.audiolet.output);
};

Player.prototype.play = function(track) {
    if (track.track.stream_url) {
        var url = '/proxy?url=' + track.track.stream_url;
        this.player.load(url);
    }
};
