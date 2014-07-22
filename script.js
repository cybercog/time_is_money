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

function visualizePlayingState(state) {
    if (! state) {
        $('#play').html('<i class="fa fa-pause fa-fw fa-lg"></i>Pause');
        isWorking = true;
    }
    else {
        $('#play').html('<i class="fa fa-play fa-fw fa-lg"></i>Play');
        isWorking = false;
    }
}