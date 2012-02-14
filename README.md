AmbientCloud
============

SoundCloud.  Now with added droning.

Why it's Awesome
----------------
Because it's a tremendous jumble of technology, and probably shouldn't be possible.

How it Works (a 10 step program)
--------------------------------

1. User adds a SoundCloud url to the playlist.
2. SoundCloud JS SDK chats to SoundCloud, gets the track info.
3. User decides to play the track.
4. Request for SoundCloud stream url sent to Node.js proxy.
5. SoundCloud redirects us around a bit, eventually chucks an MP3 back to Node.js...
6. ...which chucks it back to the client.
7. Track is decoded into a Web Audio API buffer.
8. Web Audio API streams the decoded frames into Audiolet.
9. Audiolet processes the audio in real-time...
10. ...and passes it back to the Web Audio API, which plays it for the user.

Caveats
-------
* Chrome only for now 'cause Firefox won't load .mp3s, and the mobile browsers don't support the Web Audio API.
* Loading tracks is slow as hell.  MediaElementAudioSourceNode isn't implemented yet, so we can't stream the tracks but have to get the whole thing in an XHR.  Fine, except http://code.google.com/p/chromium/issues/detail?id=96136 means that we have to proxy the tracks first.  Sheesh...
* Spent a bit longer than the time limit, as getting SoundCloud to play nicely with the Web Audio API and Audiolet was "interesting".  Sorry :(
* No tags.  Spent too much time futzing around with audio.  More apologies.

