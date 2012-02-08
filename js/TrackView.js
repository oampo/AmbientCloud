/**
 * A simple list UI for a series of tracks.
 *
 * TODO: Split out common parts of this and PlaylistView, as both are pretty
 * similar.  Bad DRY at work here :-(
 */
var TrackView = function(app) {
    this.app = app;
    this.div = $('#tracks');

    // Bind click method for returning to the playlist view
    $('#back-to-playlists').click(this.onBack.bind(this));

    //Bind focus, blur and submit handlers for the add track button.
    $('#new-track').click(this.showTrackInput.bind(this));
    $('#new-track input[type="text"]').blur(this.hideTrackInput.bind(this));
    $('#new-track form').submit(this.onNewTrackSubmit.bind(this));

    // Make the tracks sortable
    this.dragStart = null; // The start index of the track being dragged
    this.div.sortable({
        items: '.track', // Only sort elements with the track class
        axis: 'y', // Drag in the y direction
        distance: 15, // Must move more than 15px before dragging
        start: this.onSortStart.bind(this),
        stop: this.onSortStop.bind(this)
    });
};

/**
 * Display the track UI
 */
TrackView.prototype.show = function() {
    this.div.slideDown();
};

/**
 * Hide the track UI
 */
TrackView.prototype.hide = function() {
    this.div.slideUp();
};

/**
 * Add a track to the UI, and bind all the necessary listeners to it
 */
TrackView.prototype.addTrack = function(track) {
    var element = track.createElement();
    // Insert the element at the end, but before the New Track button
    $("#new-track").before(element);

    // Click listeners
    $(element).click(this.onEnter.bind(this, track));
    $(element).find('.remove-track').click(this.onRemove.bind(this,
                                                              track));
};

/**
 * Remove a track from the UI with nice slidey animation.
 */
TrackView.prototype.removeTrack = function(track) {
    $('#' + track.id).slideUp('normal', function() {
        $(this).remove();
    });
};

/**
 * Remove all tracks from the UI
 */
TrackView.prototype.clear = function() {
    $('.track').remove();
};

/**
 * Completely clear and repopulate the track UI with the tracks from a
 * playlist.  Also sets the subheader to reflect the playlist title.
 */
TrackView.prototype.set = function(playlist) {
    this.clear();
    $('#tracks .subheader').text(playlist.title);
    for (var i=0; i<playlist.tracks.length; i++) {
        var track = playlist.tracks[i];
        this.addTrack(track);
    }
};

/**
 * Set the track playing.  Called when a track is clicked.
 */
TrackView.prototype.onEnter = function(playlist) {
};


/**
 * Called when a track remove button is clicked.  Remove the track from the
 * playlist.
 */
TrackView.prototype.onRemove = function(track) {
    this.app.currentPlaylist.removeTrack(track);
    // Don't let event bubble, otherwise we will try to play our deleted track
    return false;
};


/**
 * Store the start position when we start to drag a track
 */
TrackView.prototype.onSortStart = function(event, ui) {
    this.dragStart = $('.track').index(ui.item);
};

/**
 * Called when we finish dragging.  Work out the track's new position and
 * update the current playlist to reflect this.
 */
TrackView.prototype.onSortStop = function(event, ui) {
    var dragEnd = $('.track').index(ui.item);
    this.app.currentPlaylist.moveTrack(this.dragStart, dragEnd);
    this.dragStart = null; // Not dragging any more
};

/**
 * Return to the playlist view.  Called when the back button is pressed.
 */
TrackView.prototype.onBack = function() {
    this.div.hide();
    this.app.currentPlaylist = null;
    this.app.playlistView.show();
};

/**
 * Show the add track input.  Called when we click on the "Add Track" label.
 */
TrackView.prototype.showTrackInput = function() {
    $('#new-track .label').slideUp();
    $('#new-track .input').slideDown();
    $('#new-track input[type="text"]').focus();
};

/**
 * Hide the add track input, and show the "Add Track" label again. Called when
 * the input loses focus.
 */
TrackView.prototype.hideTrackInput = function() {
    $("#new-track .label").slideDown();
    $("#new-track .input").slideUp();
    $("#new-track input").val("");
};

/**
 * Called when we submit the "Add Track" form.  Tries to get the track data
 * from SoundCloud, and adds it to the playlist.
 */
TrackView.prototype.onNewTrackSubmit = function() {
    this.app.currentPlaylist.addTrackFromURL($("#new-track input").val());
    this.hideTrackInput();
    return false;
};
