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
    var incrementTime = 1000;

    // Current timer position in milliseconds
    var currentTime = 1000;

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
        currentTime = 1000;
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
    var incrementTime = 70;
    var currentTime = 40000; // 5 minutes (in milliseconds)
    var autostart = false;

    $(function() {
        // Setup the timer
        $countdown = $('#till_rest');
        TillRestCountdown.Timer = $.timer(updateTimer, incrementTime, autostart);

        var timeString = formatTime(currentTime);
        $countdown.html(timeString);
    });

    function updateTimer() {
        // Output timer position
        var timeString = formatTime(currentTime);
        $countdown.html(timeString);

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
        currentTime = 2400;
        // Stop and reset timer
        TillRestCountdown.Timer.stop().once();
    };
});


var RestCountdown = new (function() {

    var $countdown;
    var incrementTime = 70;
    var currentTime = 10000; // 5 minutes (in milliseconds)
    var autostart = false;

    $(function() {
        // Setup the timer
        $countdown = $('#rest');
        RestCountdown.Timer = $.timer(updateTimer, incrementTime, autostart);

        var timeString = formatTime(currentTime);
        $countdown.html(timeString);
    });

    function updateTimer() {
        // Output timer position
        var timeString = formatTime(currentTime);
        $countdown.html(timeString);

        // If rest timer completed -
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
        currentTime = 10000;
        // Stop and reset timer
        RestCountdown.Timer.stop().once();
    };
});


/**
 * The purpose of this example is to demonstrate preserving
 * the time remaining when pausing a timer.  When you pause
 * the slide show, the time remaining until the next slide
 * is preserved.
 *
 * If you click pause after an image changes, you should
 * see a value close to 2.5 seconds remaining.
 */
/*
var Example3 = new (function() {

    // An array of image elements
    var $galleryImages;

    // Usually hidden element to display time when paused
    var $timeRemaining;

    // Which image is being shown
    var imageId = 0;

    // Slide settings
    var slideTime = 2500;
    var transitionSpeed = 500;

    // Setup timer
    $(function() {
        $galleryImages = $('.galleryImages img');
        $timeRemaining = $('#timeRemaining');
        Example3.Timer = $.timer(updateTimer, slideTime, true).once();
    });

    // Change slides
    function updateTimer() {
        $galleryImages.eq(imageId).stop(true,true).animate({opacity:0}, transitionSpeed);
        imageId++;
        if (imageId >= $galleryImages.length) {
            imageId = 0;
        }
        $galleryImages.eq(imageId).stop(true,false).animate({opacity:1}, transitionSpeed);
    }

    // Pause timer and output remaining time
    this.toggleGallery = function() {
        if (this.Timer.active) {
            this.Timer.pause();

            // $.timer.remiaining only gets updated after pausing
            var seconds = this.Timer.remaining / 1000;
            $timeRemaining.html(seconds + " seconds remaining.");
        }
        else {
            this.Timer.play();

            // Clear output
            $timeRemaining.html("<br/>");
        }
    };

});
*/


/**
 * Example 4 is as simple as it gets.  Just a timer object and
 * a counter that is displayed as it updates.
 */
/*
var count = 0,
    timer = $.timer(function() {
        count++;
        $('#counter').html(count);
    });
timer.set({ time : 1000, autostart : true });
*/

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