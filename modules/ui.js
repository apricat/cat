/**
 * blabla
 * 
 * @return
 */
var Ui = (function () {

	var template = {
		"clock" : "clock",
		"money" : "money",
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
		}
	}


	function init() {

		setInterval(function(){ 
			refreshClock();
			refreshCalendar();
		}, 1000);

		// init menu
		populateMenu();

		// init monies
		refreshMoney();

	}


	/**
	 * Populate UI menu
	 * 
	 * @return
	 */
	function populateMenu() {

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

		// populate location list
		for (var i = 0; i < Locations.location.length; i++) {

			document.getElementById(template.menu.location).innerHTML += '<li><a href="#" onClick="Locations.location['+i+'].go(); return false;">'+ Locations.location[i]["name"] +'</a></li>';
		
		}

	}


	/**
	 * Refresh money
	 * 
	 * @return
	 */
	function refreshMoney() {
		document.getElementById(template.money).innerHTML  = "";
		document.getElementById(template.money).innerHTML += Inventory.getMoney();
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

		document.getElementById(template.cat).className = val;

	}

	return { 

  		init : init,
  		setLocation : setLocation,
  		setCat : setCat,
  		dispatchGifting : dispatchGifting,
  		dispatchTransaction : dispatchTransaction,
  		populateMenu : populateMenu,
  		refreshMoney : refreshMoney

  	};

}());

Ui.init();