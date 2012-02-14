/**
 * Main app class.
 */
var SlowCloud = function() {
    this.clientID = '382b4cea1549fc6ed4682acaf0e0fe65';
    SC.initialize({
        client_id: this.clientID,
    });

    this.playlists = [];
    // If we are in the track view, this holds the playlist we are looking at.
    this.currentPlaylist = null;

    // Create the player
    this.player = new Player(this);

    // Create the UI views
    this.playlistView = new PlaylistView(this);
    this.trackView = new TrackView(this);

    // Load any saved state.
    this.load();
};

/**
 * Add a playlist, force a UI update, and store the current state.
 */
SlowCloud.prototype.addPlaylist = function(playlist) {
    this.playlists.push(playlist);
    this.playlistView.addPlaylist(playlist);
    this.save();
};

/**
 * Remove a playlist, force a UI update, and store the current state.
 */
SlowCloud.prototype.removePlaylist = function(playlist) {
    var index = this.playlists.indexOf(playlist);
    this.playlists.splice(index, 1);
    this.playlistView.removePlaylist(playlist);
    this.save();
};

/**
 * Save the current state to localStorage.
 * Rather than saving the entire playlist and track data, we save a reduced
 * version containing the permalink urls for each track.  This forces a reload
 * of the track data from SoundCloud each time we start, meaning that any
 * changes to the data will be reflected in the app.
 */
SlowCloud.prototype.save = function() {
    // Create the simplified version of the playlist data
    var playlists = [];
    for (var i=0; i<this.playlists.length; i++) {
        var playlist = this.playlists[i]; // The complete playlist info
        var reducedPlaylist = {}; // The reduced version of the playlist info
        reducedPlaylist.title = playlist.title;
        reducedPlaylist.tracks = [];
        for (var j=0; j<playlist.tracks.length; j++) {
            var track = playlist.tracks[j];
            reducedPlaylist.tracks.push(track.track.permalink_url);
        }
        playlists.push(reducedPlaylist);
    }
    // Save to localStorage
    localStorage.setItem('playlists', JSON.stringify(playlists));
};

/**
 * Load the stored state from localStorage if it exists.
 * This basically carries out the reverse process to the save method,
 * recreating the playlists one by one, fetching the track data from the
 * SoundCloud servers, and adding it back to the playlists.
 */
SlowCloud.prototype.load = function() {
    var playlists = localStorage.getItem('playlists');
    if (!playlists) {
        // No stored state, so just continue
        return;
    }
    playlists = JSON.parse(playlists);
    for (var i=0; i<playlists.length; i++) {
        // Recreate the playlists from the removed data.
        var reducedPlaylist = playlists[i];
        var playlist = new Playlist(this, reducedPlaylist.title);
        this.addPlaylist(playlist);
        for (var j=0; j<reducedPlaylist.tracks.length; j++) {
            playlist.addTrackFromURL(reducedPlaylist.tracks[j], j);
        }
    }
};
    
/**
 * Start the app when the dom has finished loading.
 *
 * TODO: Use jQuery domReady
 */
window.onload = function() {
    window.app = new SlowCloud();
}

/**
 * Save our app status on unload
 */
window.onunload = function() {
    window.app.save();
}
