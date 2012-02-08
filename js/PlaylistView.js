/**
 * A simple list UI for a series of playlists.
 *
 * TODO: Split out common parts of this and TrackView, as both are pretty
 * similar.  Bad DRY at work here :-(
 */
var PlaylistView = function(app) {
    this.app = app;
    this.div = $('#playlists');

    // Bind focus, blur and submit handlers for the new playlist button.
    $('#new-playlist').click(this.showPlaylistInput.bind(this));
    $('#new-playlist input[type="text"]').blur(this.hidePlaylistInput.bind(this));
    $('#new-playlist form').submit(this.onNewPlaylistSubmit.bind(this));
};

/**
 * Display the playlist UI
 */
PlaylistView.prototype.show = function() {
    this.div.slideDown();
};

/**
 * Hide the playlist UI
 */
PlaylistView.prototype.hide = function() {
    this.div.slideUp();
};

/**
 * Remove all playlists from the UI
 */
PlaylistView.prototype.clear = function() {
    $('.playlist').remove();
};

/**
 * Add a playlist to the UI, and bind all the necessary listeners to it
 */
PlaylistView.prototype.addPlaylist = function(playlist) {
    var element = playlist.createElement();
    // Insert the element at the end, but before the New Playlist button
    $('#new-playlist').before(element);

    // Click listeners
    $(element).click(this.onEnter.bind(this, playlist));
    $(element).find('.remove-playlist').click(this.onRemove.bind(this,
                                                                 playlist));
};

/**
 * Remove a playlist from the UI with nice slidey animation.
 */
PlaylistView.prototype.removePlaylist = function(playlist) {
    $('#' + playlist.id).slideUp('normal', function() {
        $(this).remove();
    });
};

/**
 * Called when a playlist is selected.  Hide the playlist view, update the
 * track view so it is showing the right tracks, and show the track view
 */
PlaylistView.prototype.onEnter = function(playlist) {
    this.hide();
    this.app.currentPlaylist = playlist;
    this.app.trackView.set(playlist);
    this.app.trackView.show();
};

/**
 * Called when a playlist remove button is clicked.  Remove the playlist!
 */
PlaylistView.prototype.onRemove = function(playlist) {
    this.app.removePlaylist(playlist);
    // Don't let event bubble, otherwise we will try to enter our deleted
    // playlist, and bad stuff will happen...
    return false;
};

/**
 * Show the new playlist input.  Called when we click on the "New Playlist"
 * label.
 */
PlaylistView.prototype.showPlaylistInput = function() {
    $('#new-playlist .label').slideUp();
    $('#new-playlist .input').slideDown();
    $('#new-playlist input[type="text"]').focus();
};

/**
 * Hide the new playlist input, and show the "New Playlist" label again.
 * Called when the input loses focus.
 */
PlaylistView.prototype.hidePlaylistInput = function() {
    $("#new-playlist .label").slideDown();
    $("#new-playlist .input").slideUp();
    $("#new-playlist input").val("");

};

/**
 * Called when we submit the "New Playlist" form.  Creates a new playlist,
 * using the name we entered, and enters the track view for the new playlist.
 */
PlaylistView.prototype.onNewPlaylistSubmit = function() {
    var playlist = new Playlist(app, $("#new-playlist input").val());
    this.app.addPlaylist(playlist);
    // Show the "New Playlist" label, for when we return to the playlist view
    this.hidePlaylistInput();
    // Enter the track view for our new playlist
    this.onEnter(playlist);
    // Don't redirect us please!
    return false;
};
