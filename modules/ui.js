/**
 * blabla
 * 
 * @return
 */
var Ui = (function () {

	var template = {
		"clock" : "clock",
		"money" : "money",
		"health" : "health",
		"calendar" : {
			"day" : "day",
			"month" : "month",
			"year" : "year"
		},
		"location" : "location",
		"cat" : "cat",
		"menu" : {
			"location" : "menu-location",
			"pet" : "menu-pet",
			"inventory" : "menu-inventory",
			"shop" : "menu-shop"
		},
		"log" : "log",
		"heart" : "heart"
	}


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
		document.getElementById(template.menu.inventory).innerHTML = "";
		document.getElementById(template.menu.shop).innerHTML = "";
		document.getElementById(template.menu.location).innerHTML = "";

		// Populate inventory
		var items = Inventory.getItems();

		for (var item in items) {

			if (!items[item]["name"]) { break; }

			document.getElementById(template.menu.shop).innerHTML += '<li><a href="#" data-item="'+items[item]["name"].toLowerCase().replace(/ /g,'')+'" data-qty="1" onClick="Ui.dispatchTransaction(this); Ui.populateMenu(); return false;">'+ items[item]["name"] +'</a></li>';
			
			if (items[item]["qty"] > 0) {
			
				document.getElementById(template.menu.inventory).innerHTML += '<li><a href="#" data-item="'+items[item]["name"].toLowerCase().replace(/ /g,'')+'" data-qty="'+items[item]["qty"]+'" onClick="Ui.dispatchGifting(this); Ui.populateMenu(); return false;">'+ items[item]["name"] +'</a><span>'+ items[item]["qty"] +'</span></li>';
			
			}

		}

		// Populate location list
		for (var i = 0; i < Locations.location.length; i++) {

			document.getElementById(template.menu.location).innerHTML += '<li><a href="#" onClick="Locations.location['+i+'].go(); return false;">'+ Locations.location[i]["name"] +'</a></li>';
		
		}

	}


	/**
	 * [refreshHealth description]
	 * 
	 * @return bool
	 */
	function refreshHealth() {

		document.getElementById(template.health).style.width = Players.player().health + "%";

		if (Players.player().status === 1) {
			document.getElementById(template.health).style.background = "#FF0000";
			return false;
		}

		if (Players.player().status === 2) {
			document.getElementById(template.health).style.background = "#FFE100";
			return false;
		}

		document.getElementById(template.health).style.background = "#000";
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

		document.getElementById(template.heart).style.display = "block";

		if (cat.affection < 25) {
			document.getElementById(template.heart).className = "dislike";
			return false;
		}
		if (cat.affection < 50) {
			document.getElementById(template.heart).className = "ok";
			return false;
		}
		if (cat.affection < 75) {
			document.getElementById(template.heart).className = "like";
			return false;
		}
		
		document.getElementById(template.heart).className = "love";
		return false;
		
	}


	/**
	 * [log description]
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	function log(data) {

		var log = document.getElementById(template.log);
		log.innerHTML += "<div>" + data + "</div>";
		log.scrollTop = log.scrollHeight;
		return false;

	}


	/**
	 * Refresh money
	 * 
	 * @return
	 */
	function refreshMoney() {

		document.getElementById(template.money).innerHTML  = "";
		document.getElementById(template.money).innerHTML += Inventory.getMoney() + "$";

	}


	/**
	 * Dispatches location gifting
	 * 
	 * @param obj elem
	 * @return bool
	 */
	function dispatchGifting(elem) {

		var qty = elem.getAttribute("data-qty");
		var item = elem.getAttribute("data-item");

		if (qty < 1) {
			return false;
		}

		// Validates with location if cat available
		if (!Locations.handleGifting(item)) {
			return false;
		}

		// Removes item from inventory
		Inventory.removeQty(item, 1);
		return false;

	}


	/**
	 * Dispatches inventory transaction
	 * 
	 * @param  obj elem 
	 * @return bool
	 */
	function dispatchTransaction(elem) {

		var qty = elem.getAttribute("data-qty");
		var item = elem.getAttribute("data-item");

		Inventory.transaction(item, qty);

		return false;
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

		if (!val) {
			document.getElementById(template.heart).style.display = "none";
		}
		
		document.getElementById(template.cat).className = val;

	}

	return { 

  		init : init,
  		setLocation : setLocation,
  		setCat : setCat,
  		dispatchGifting : dispatchGifting,
  		dispatchTransaction : dispatchTransaction,
  		populateMenu : populateMenu,
  		refreshMoney : refreshMoney,
  		log : log,
  		setHeart : setHeart

  	};

}());

Ui.init();