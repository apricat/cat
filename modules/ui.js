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
				"title" : ".cat .dialog h4"
			},
			"player" : {
				"title" : ".player .dialog h4"
			}

		},
		"blackout" : "#blackout"
	}

	var paused = false;

	const LOG_TIME = 4;

	function init() {

		setInterval(function(){ 
			refreshClock();
			refreshCalendar();
			refreshHealth();
			refreshLog();
		}, 1000);

		// init menu
		populateMenu();

		// init monies
		refreshMoney();

		// init clock
		refreshClock();

		$(template.dialog.player.title).text(Players.player().name);

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

			$(template.menu.shop).append('<li><a href="#" data-action="buy" data-item="'+items[item]["name"].toLowerCase().replace(/ /g,'')+'" data-qty="1">'+ items[item]["name"] +'</a><var>'+items[item]["value"]+'</var></li>');
			
			if (items[item]["qty"] > 0) {
			
				$(template.menu.inventory).append('<li><a href="#" data-action="give" data-item="'+items[item]["name"].toLowerCase().replace(/ /g,'')+'" data-qty="'+items[item]["qty"]+'">'+ items[item]["name"] +'</a><var>'+ items[item]["qty"] +'</var></li>');
			
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
			$(template.health).attr("class", "health tired");
			return false;
		}

		if (Players.player().status === 1) {
			$(template.health).attr("class", "health sick")
			return false;
		}

		$(template.health).attr("class", "health healthy");
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

		$(template.log).append("<div style='display:none' data-time='" + LOG_TIME + "'>" + data + "</div>");

		if ($(template.log + " div").length > 1) {

			$(template.log + " div").not(":last").each(function(i) {
				$(this).css("z-index", 200 - i);
				$(this).animate({
				    bottom: "+=24"
				}, 100, function() {});
			});

		}

		$(template.log + ' > div:last').fadeIn();

		return false;

	}


	/**
	 * [updateLog description]
	 * @return bool
	 */
	function refreshLog() {

		$(template.log + " div").each(function(i) {

			var time = $(this).attr("data-time") - 1;

			$(this).attr("data-time", time);

			if ($(this).attr("data-time") <= 0) {

				$(this).delay(300*i).fadeOut("slow", function(){
					$(this).remove();
				});

			}

		});

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

		var start = window.setTimeout(function() { $(template.cat).addClass(val); clearTimeout(start); }, 600);

	}


	/**
	 * [blackout description]
	 * @param  {[type]} status [description]
	 * @return {[type]}        [description]
	 */
	function blackout( status ) {

		if (status) {
			$(template.blackout).fadeIn();
			return false;
		}
		
		$(template.blackout).fadeOut();
		return false;

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
  		blackout : blackout,
  		paused : function() { return paused; },
  		pause : function(status) { paused = status; }

  	};

}());