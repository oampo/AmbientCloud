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

PlaylistView.prototype.clear = function() {
    $('.playlist').remove();
};

PlaylistView.prototype.addPlaylist = function(playlist) {
    var element = playlist.createElement();
    $('#new-playlist').before(element);
    $(element).click(this.onEnter.bind(this, playlist));
    $(element).find('.remove-playlist').click(this.onRemove.bind(this,
                                                                 playlist));
};

PlaylistView.prototype.removePlaylist = function(playlist) {
    $('#' + playlist.id).slideUp('normal', function() {
        $(this).remove();
    });
};

PlaylistView.prototype.onEnter = function(playlist) {
    this.hide();
    this.app.currentPlaylist = playlist;
    this.app.trackView.set(playlist);
    this.app.trackView.show();
};

PlaylistView.prototype.onRemove = function(playlist) {
    this.app.removePlaylist(playlist);
    return false;
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
    var playlist = new Playlist(app, $("#new-playlist input").val());
    this.app.addPlaylist(playlist);
    this.hidePlaylistInput();
    this.onEnter(playlist);
    return false;
};
