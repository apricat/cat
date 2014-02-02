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

		behaviours();

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


	/**
	 * Behaviours on site
	 * 
	 * @return
	 */
	function behaviours() {

		var elem = document.getElementsByName("give");

		for (var i = 0; i < elem.length; i++) {

			elem[i].addEventListener("click", function(e) {

				e.preventDefault();

				var qty  = parseInt(this.getAttribute("data-qty"), 10);
				var item = this.getAttribute("data-item");

				if (qty < 1) {
					Global.log("No " + item + " to give :(");
					return false;
				}

				Locations.handleGifting(item);
				
			}, false);

		}

		var elem = document.getElementsByName("pet");

		for (var i = 0; i < elem.length; i++) {

			elem[i].addEventListener("click", function(e) {

				e.preventDefault();

				Locations.handlePetting();
				
			}, false);

		}

	}


	return { 

  		init : init,
  		setLocation : setLocation,
  		setCat : setCat

  	};

}());

Ui.init();