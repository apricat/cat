/**
 * Global
 * 
 * @return
 */
var Global = (function () {


	var config = {
		"debug" : true
	}


	// Global time variables
	var currentTime = 0,
		currentDate = 0,
		months      = ["Spring", "Summer", "Fall", "Winter"];


	/**
	 * Log data if in debug mode
	 * 
	 * @param data
	 * @return 
	 */
	function log( data ) {

		if (config.debug) {
			console.log( data );
		}

		return false;

	}


	/**
	 * Increases time
	 * 
	 * @return bool
	 */
	function time() {

		setInterval(function(){ 

			currentTime += 600;

			// day has passed
			if (currentTime >= 86400) {

				newDay(0);
				
			}

		}, 1000);

		return false;

	}


	/**
	 * Init a new day
	 * 
	 * @param  int init
	 * @return bool
	 */
	function newDay( init ) {

		currentTime  = init;
		currentDate += 1;

		resets();

	}


	/**
	 * Adds time to the clock
	 *
	 * @param int value
	 */
	function addTime( value ) {

		if (currentTime + value > 86400) {

			newDay(currentTime + value - 86400)
			return false;

		}

		currentTime += value;
		return false;

	}


	/**
	 * Daily flag resets
	 * 
	 * @return bool
	 */
	function resets() {

		log("Resets activated.");

		Cats.resets();

		return false;

	}


	/**
	 * Calculates current day
	 * 
	 * @return int
	 */
	function day() {

		var currentMonth = month();
		return Math.floor( currentDate / (currentMonth + 1) ) + 1;

	}


	/**
	 * Calculates current month based on current date
	 * 
	 * @return int
	 */
	function month() {

		return Math.floor( currentDate / 4 );

	}


	/**
	 * Returns month in human readable format
	 * 
	 * @return string
	 */
	function calendar() {

		var currentMonth = month();
		return months[currentMonth];

	}


	/**
	 * Calculates current year
	 * 
	 * @return int
	 */
	function year() {

		return Math.floor( currentDate / 120 ) + 1;

	}


	/**
	 * Transform time into human readable format
	 * 
	 * @return string
	 */
	function clock() {

	    var sec     = parseInt(currentTime, 10),
	    	hours   = Math.floor(sec / 3600),
	    	minutes = Math.floor((sec - (hours * 3600)) / 60),
	    	seconds = sec - (hours * 3600) - (minutes * 60);

	    if (hours   < 10) { hours   = "0" + hours; }
	    if (minutes < 10) { minutes = "0" + minutes; }
	    if (seconds < 10) { seconds = "0" + seconds; }

	    return hours+':'+minutes;

	}


	function init() {
		time();
	}

  	return { 

  		init     : init,
  		getClock : function() { return clock(); },
  		getDay   : function() { return day(); },
  		getMonth : function() { return calendar(); },
  		getYear  : function() { return year(); },
  		log      : log,
  		addTime  : addTime

  	};

}());

Global.init();