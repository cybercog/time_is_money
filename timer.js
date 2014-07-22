/**
 * jQuery Timer isn't natively a stopwatch, it just helps with
 * building one. Time must be incremented manually.
 *
 * The increment time is in milliseconds, so an input time of
 * 1000 equals 1 time per second.  This example uses an
 * increment time of 70 which is about 14 times per second.
 *
 * The timer function converts the current time to a string
 * and outputs to the stopwatch element, $stopwatch.
 */
var Work = new (function() {
    // Stopwatch element on the page
    var $stopwatch;
    var autostart = false;

    // Timer speed in milliseconds
    var incrementTime = 500;

    // Current timer position in milliseconds
    var currentTime = 0;

    if (isLocalStorageAvailable()) {
        // RESTORE TIME FROM LOCAL STORAGE
        var storageTimer = JSON.parse(localStorage.getItem('timer'));
        if (storageTimer > 0) {
            currentTime = storageTimer;
        }
    }
    else {
        alert('GET MODERN BROWSER, BRO!');
    }

    // Start the timer
    $(function() {
        $stopwatch = $('#clock');
        Work.Timer = $.timer(updateTimer, incrementTime, autostart);

        var timeString = formatTime(currentTime);
        $stopwatch.html(timeString);
    });

    // Output time and increment
    function updateTimer() {
        var timeString = formatTime(currentTime);
        $stopwatch.html(timeString);
        currentTime += incrementTime;

        if (isLocalStorageAvailable()) {
            try {
                var timer = currentTime;
                localStorage.setItem('timer', JSON.stringify(timer));
            } catch (e) {
                if (e == QUOTA_EXCEEDED_ERR) {
                    alert('Локальное хранилище переполнено');
                }
            }
        }
    }

    // Reset timer
    this.resetStopwatch = function() {
        currentTime = 0;
        Work.Timer.stop().once();
        wipeLocalStorage();

        var timeString = formatTime(currentTime);
        $stopwatch.html(timeString);
    };
});


/**
 * Example 2 is similar to Example 1. Two things that are
 * different are counting down instead of up and allowing
 * user input for start time. Also, when the timer counts
 * down to zero, an alert is triggered.
 */

var TillRestCountdown = new (function() {

    var $countdown;
    var incrementTime = 500;
    var currentTime;
    var autostart = false;

    $(function() {
        // Setup the timer
        currentTime = timeTillRest;
        $countdown = $('#till_rest');
        TillRestCountdown.Timer = $.timer(updateTimer, incrementTime, autostart);

        var timeString = formatTime(currentTime);
        console.log('Till rest timer: '+timeString);
        // $countdown.html(timeString);
    });

    function updateTimer() {
        // var timeString = formatTime(currentTime);
        // $countdown.html(timeString);

        // If till rest timer completed - show popup with rest
        if (currentTime == 0) {
            TillRestCountdown.Timer.stop();
            $('#go_rest_popup').fadeIn();
            Work.Timer.stop().once();
            TillRestCountdown.resetCountdown();
            return;
        }

        // Increment timer position
        currentTime -= incrementTime;
        if (currentTime < 0) currentTime = 0;
    }

    this.resetCountdown = function() {
        // Stop and reset timer
        TillRestCountdown.Timer.stop().once();
        currentTime = timeTillRest;
    };
});


var RestCountdown = new (function() {

    var $countdown;
    var incrementTime = 500;
    var currentTime;
    var autostart = false;

    $(function() {
        // Setup the timer
        currentTime = timeRest;
        $countdown = $('#rest');
        RestCountdown.Timer = $.timer(updateTimer, incrementTime, autostart);

        var timeString = formatTime(currentTime);
        console.log('Rest timer: '+timeString);
        // $countdown.html(timeString);
    });

    function updateTimer() {
        // var timeString = formatTime(currentTime);
        // $countdown.html(timeString);

        if (currentTime == 0) {
            RestCountdown.Timer.stop();
            $('#go_work_popup').fadeIn();
            RestCountdown.resetCountdown();
            return;
        }

        // Increment timer position
        currentTime -= incrementTime;
        if (currentTime < 0) currentTime = 0;
    }

    this.resetCountdown = function() {
        // Stop and reset timer
        RestCountdown.Timer.stop().once();
        currentTime = timeRest;
    };
});

// Common functions
function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {str = '0' + str;}
    return str;
}
function formatTime(time) {
    time = time / 10;
    var min = parseInt(time / 6000),
        sec = parseInt(time / 100) - (min * 60),
        hundredths = pad(time - (sec * 100) - (min * 6000), 2);
    return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2);
    //return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2) + ":" + hundredths;
}