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

		behaviours();

	}


	function behaviours() {

		$(document).on("keypress", function(e){

			e.preventDefault();

			if (e.which === 13) {
				$("a").removeAttr("disabled");
				$(template.dialog.container).hide();
				paused = false;
			}

		});

	}


	/**
	 * Populate UI menu
	 * 
	 * @return
	 */
	function populateMenu() {

		// Clear menu
		$(template.menu.inventory).html("");
		$(template.menu.shop).html("");
		$(template.menu.location).html("");

		// Populate inventory
		var items = Inventory.getItems();

		for (var item in items) {

			if (!items[item]["name"]) { break; }

			$(template.menu.shop).append('<li><a href="#" data-item="'+items[item]["name"].toLowerCase().replace(/ /g,'')+'" data-qty="1" onClick="Ui.dispatchTransaction(this); Ui.populateMenu(); return false;">'+ items[item]["name"] +'</a></li>');
			
			if (items[item]["qty"] > 0) {
			
				$(template.menu.inventory).append('<li><a href="#" data-item="'+items[item]["name"].toLowerCase().replace(/ /g,'')+'" data-qty="'+items[item]["qty"]+'" onClick="Ui.dispatchGifting(this); Ui.populateMenu(); return false;">'+ items[item]["name"] +'</a><span>'+ items[item]["qty"] +'</span></li>');
			
			}

		}

		// Populate location list
		for (var i = 0; i < Locations.location.length; i++) {

			$(template.menu.location).append('<li><a href="#" onClick="Locations.location['+i+'].go(); return false;">'+ Locations.location[i]["name"] +'</a></li>');
		
		}

	}


	/**
	 * [refreshHealth description]
	 * 
	 * @return bool
	 */
	function refreshHealth() {

		$(template.health).css("width", Players.player().health + "%");

		if (Players.player().status === 1) {
			$(template.health).attr("class", "tired");
			return false;
		}

		if (Players.player().status === 2) {
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
	 * [dialog description]
	 * @param  {[type]} dialog    [description]
	 * @param  {[type]} container [description]
	 * @return {[type]}           [description]
	 */
	function dialog(dialog, container) {

		$("a").attr("disabled", "disabled");

		paused = true;

		$(container).show();

		addTextByDelay(dialog, $(container).find("p"), 200);

	}


	/**
	 * [addTextByDelay description]
	 * @param {[type]} text  [description]
	 * @param {[type]} elem  [description]
	 * @param {[type]} delay [description]
	 */
	var addTextByDelay = function(text, elem, delay) {

	    if (text.length <= 0) { 
	    	return false 
	    }

        elem.append(text[0]);
        setTimeout(
        	function(){ 
        		addTextByDelay(text.slice(1), elem, delay); 
        	},delay                 
        );
	    
	}



	/**
	 * [log description]
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	function log(data) {

		var log = $(template.log);
		log.append("<div>" + data + "</div>");
		log.scrollTop = log.scrollHeight;
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
	 * Dispatches location gifting
	 * 
	 * @param obj elem
	 * @return bool
	 */
	function dispatchGifting(elem) {

		var qty  = elem.getAttribute("data-qty");
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

		$(template.cat).attr("class", val);

	}


	/**
	 * [setCatDialog description]
	 * @param {[type]} cat [description]
	 */
	function setCatDialog( cat ) {
		$(template.dialog.cat.title).text(cat.name);
	}


	function daytime() {
		$("body").removeClass("nighttime").addClass("daytime");
	}

	function nighttime() {
		$("body").removeClass("daytime").addClass("nighttime");
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
  		setHeart : setHeart,
  		dialog : dialog,
  		setCatDialog : setCatDialog,
  		daytime : daytime,
  		nighttime : nighttime,
  		paused : function() { return paused; }

  	};

}());