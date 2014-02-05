/**
 * blabla
 * 
 * @return
 */
var Ui = (function () {

	var template = {
		"clock" : "#clock",
		"money" : "#money",
		"health" : "#health",
		"calendar" : {
			"day" : "#day",
			"month" : "#month",
			"year" : "#year"
		},
		"location" : "#location",
		"cat" : "#cat",
		"menu" : {
			"location" : "#menu-location",
			"pet" : "#menu-pet",
			"inventory" : "#menu-inventory",
			"shop" : "#menu-shop"
		},
		"log" : "#log",
		"heart" : "#heart",
		"dialog" : {
			"container" : ".dialog",
			"text" : ".dialog p",
			"cat" : {
				"title" : ".dialog h4"
			}
		}
	}

	var paused = false;

	function init() {

		setInterval(function(){ 
			refreshClock();
			refreshCalendar();
			refreshHealth();
		}, 1000);

		// init menu
		populateMenu();

		// init monies
		refreshMoney();

		// init clock
		refreshClock();

	}


	/**
	 * Populate UI menu
	 * 
	 * @return
	 */
	function populateMenu() {

		// Clear menu
		$(template.menu.inventory + "," + template.menu.shop + "," + template.menu.location).html("");

		// Populate inventory
		var items = Inventory.getItems();

		for (var item in items) {

			$(template.menu.shop).append('<li><a href="#" data-action="buy" data-item="'+items[item]["name"].toLowerCase().replace(/ /g,'')+'" data-qty="1">'+ items[item]["name"] +'</a></li>');
			
			if (items[item]["qty"] > 0) {
			
				$(template.menu.inventory).append('<li><a href="#" data-action="give" data-item="'+items[item]["name"].toLowerCase().replace(/ /g,'')+'" data-qty="'+items[item]["qty"]+'">'+ items[item]["name"] +'</a><span>'+ items[item]["qty"] +'</span></li>');
			
			}

		}

		// Populate location list
		for (var i = 0; i < Locations.location.length; i++) {

			$(template.menu.location).append('<li><a href="#" data-action="go" data-location="'+i+'">'+ Locations.location[i]["name"] +'</a></li>');
		
		}

	}


	/**
	 * [refreshHealth description]
	 * 
	 * @return bool
	 */
	function refreshHealth() {

		$(template.health).css("width", Players.player().health + "%");

		if (Players.player().status === 2) {
			$(template.health).attr("class", "tired");
			return false;
		}

		if (Players.player().status === 1) {
			$(template.health).attr("class", "sick")
			return false;
		}

		$(template.health).attr("class", "healthy");
		return false;

	}


	/**
	 * [setHeart description]
	 * @param {[type]} cat [description]
	 */
	function setHeart(cat) {

		if (!cat) {
			return false;
		}

		$(template.heart).css("display", "block");

		if (cat.affection < 25) {
			$(template.heart).attr("class", "dislike");
			return false;
		}
		if (cat.affection < 50) {
			$(template.heart).attr("class", "ok");
			return false;
		}
		if (cat.affection < 75) {
			$(template.heart).attr("class", "like");
			return false;
		}
		
		$(template.heart).attr("class", "love");
		return false;
		
	}


	/**
	 * [log description]
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	function log(data) {

		$(template.log).append("<div>" + data + "</div>");
		document.getElementById("log").scrollTop = document.getElementById("log").scrollHeight;
		return false;

	}


	/**
	 * Refresh money
	 * 
	 * @return
	 */
	function refreshMoney() {

		$(template.money).html("");
		$(template.money).html(Inventory.getMoney() + "$");

	}


	/**
	 * Refreshes clock
	 * 
	 * @return
	 */
	function refreshClock() {

		$(template.clock).html(Global.getClock());

	}


	/**
	 * Refreshes calendar
	 * 
	 * @return
	 */
	function refreshCalendar() {

		$(template.calendar.day).html(Global.getDay());
		$(template.calendar.month).html(Global.getMonth());
		$(template.calendar.year).html(Global.getYear());

	}


	/**
	 * Changes location on map
	 * 
	 * @param  string val
	 * @return
	 */
	function setLocation( val ) {

		$(template.location).attr("class", val);

	}


	/**
	 * Changes cat
	 * 
	 * @param  string val
	 * @return
	 */
	function setCat( val ) {

		if (!val) {
			$(template.heart).css("display", "none");
		}

		$(template.cat).removeClass("fatcat evilcat cutecat");

		window.setTimeout(function() { $(template.cat).addClass(val); }, 600);

	}


	/**
	 * [daytime description]
	 * @return {[type]} [description]
	 */
	function daytime() {
		$("body").removeClass("nighttime").addClass("daytime");
	}


	/**
	 * [nighttime description]
	 * @return {[type]} [description]
	 */
	function nighttime() {
		$("body").removeClass("daytime").addClass("nighttime");
	}

	return { 

  		init : init,
  		setLocation : setLocation,
  		setCat : setCat,
  		populateMenu : populateMenu,
  		refreshMoney : refreshMoney,
  		log : log,
  		setHeart : setHeart,
  		daytime : daytime,
  		nighttime : nighttime,
  		paused : function() { return paused; },
  		pause : function(status) { paused = status; }

  	};

}());