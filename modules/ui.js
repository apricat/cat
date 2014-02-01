/**
 * blabla
 * 
 * @return
 */
var Ui = (function () {

	var template = {
		"clock" : "clock",
		"calendar" : {
			"day" : "day",
			"month" : "month",
			"year" : "year"
		},
		"location" : "location",
		"cat" : "cat"
		
	}


	function init() {

		setInterval(function(){ 
			refreshClock();
			refreshCalendar();
		}, 1000);

	}


	/**
	 * Refreshes clock
	 * 
	 * @return
	 */
	function refreshClock() {
		document.getElementById(template.clock).innerHTML = Global.getClock();
	}


	/**
	 * Refreshes calendar
	 * 
	 * @return
	 */
	function refreshCalendar() {

		document.getElementById(template.calendar.day).innerHTML = Global.getDay();
		document.getElementById(template.calendar.month).innerHTML = Global.getMonth();
		document.getElementById(template.calendar.year).innerHTML = Global.getYear();

	}


	/**
	 * Changes location on map
	 * 
	 * @param  string val
	 * @return
	 */
	function setLocation( val ) {

		document.getElementById(template.location).className = val;

	}


	/**
	 * Changes cat
	 * 
	 * @param  string val
	 * @return
	 */
	function setCat( val ) {

		document.getElementById(template.cat).className = val;

	}


	return { 

  		init : init,
  		setLocation : setLocation,
  		setCat : setCat

  	};

}());

Ui.init();