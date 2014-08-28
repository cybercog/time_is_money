function isLocalStorageAvailable() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}
function wipeLocalStorage() {
    if (isLocalStorageAvailable()) localStorage.clear();
}