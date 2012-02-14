// Global UID counter.
window.UID = 0;

/**
 * Return a unique ID based upon a simple global counter.  Pretty ugly.
 * Something like a UUID would be nicer.
 */
function uid() {
    window.UID += 1;
    return window.UID;
}
