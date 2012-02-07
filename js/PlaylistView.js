var PlaylistView = function(app) {
    this.app = app;
    this.div = $('#playlists');

    $('#new-playlist').click(this.showPlaylistInput.bind(this));
    $('#new-playlist input[type="text"]').blur(this.hidePlaylistInput.bind(this));
    $('#new-playlist form').submit(this.onNewPlaylistSubmit.bind(this));
};

PlaylistView.prototype.show = function() {
    this.div.slideDown();
};

PlaylistView.prototype.hide = function() {
    this.div.slideUp();
};

PlaylistView.prototype.update = function() {
    $('.playlist').remove();
    var newPlaylistDiv = $('#new-playlist');
    for (var i=0; i<this.app.playlists.length; i++) {
        var playlist = this.app.playlists[i];
        var element = playlist.createElement();
        newPlaylistDiv.before(element);
        $(element).click(this.onClick.bind(this, playlist));
    }
};

PlaylistView.prototype.onClick = function(playlist) {
    this.hide();
    this.app.currentPlaylist = playlist;
    this.app.trackView.update(playlist.tracks);
    this.app.trackView.show();
};

PlaylistView.prototype.showPlaylistInput = function() {
    $('#new-playlist .label').slideUp();
    $('#new-playlist .input').slideDown();
    $('#new-playlist input[type="text"]').focus();
};

PlaylistView.prototype.hidePlaylistInput = function() {
    $("#new-playlist .label").slideDown();
    $("#new-playlist .input").slideUp();
    $("#new-playlist input").val("");

};

PlaylistView.prototype.onNewPlaylistSubmit = function() {
    this.app.addPlaylist(new Playlist($("#new-playlist input").val()));
    this.update();
    this.hidePlaylistInput();
    return false;
};
