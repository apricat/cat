var Behaviours = (function () {

	var template = {
		"dialog" : {
			"container" : ".dialog",
			"accept" : ".dialog [data-action='accept']"
		}
	}

	function init() {


		$(document).on("keypress", function(e) {

			e.preventDefault();

			if (e.which === 13) {

				$("menu a").removeAttr("disabled");
				$(template.dialog.container + "," + template.dialog.accept).hide();

				Ui.pause(false);

			}

		});


		$(document).on("click", template.dialog.accept, function(e) {

			e.preventDefault();

			$("menu a").removeAttr("disabled");
			$(template.dialog.container + "," + template.dialog.accept).hide();

			Ui.pause(false);

		});


		$(document).on("click", "[data-action='give']", function(e) {

			e.preventDefault();

			if ($(this).attr('disabled')) {
				return false;
			}

			var qty  = $(this).attr("data-qty"),
				item = $(this).attr("data-item");

			if (qty < 1) {
				return false;
			}

			// Validates with location if cat available
			if (!Locations.handleGifting(item)) {
				return false;
			}

			// Removes item from inventory
			Inventory.removeQty(item, 1);

			// Refresh menu
			Ui.populateMenu();

			return false;

		});


		$(document).on("click", "[data-action='buy']", function(e) {

			e.preventDefault();

			if ($(this).attr('disabled')) {
				return false;
			}

			var qty  = $(this).attr("data-qty"),
				item = $(this).attr("data-item");

			Inventory.transaction(item, qty);

			// Refresh menu
			Ui.populateMenu();

			return false;

		});


		$(document).on("click", "[data-action='go']", function(e) {

			e.preventDefault();

			if ($(this).attr('disabled')) {
				return false;
			}

			var id = $(this).attr("data-location");

			Locations.location[id].go();

			return false;

		});


		$(document).on("click", "[data-action='pet']", function(e) {

			e.preventDefault();

			if ($(this).attr('disabled')) {
				return false;
			}

			Locations.handlePetting();

			return false;

		});


		$(document).on("click", "[data-action='work']", function(e) {

			e.preventDefault();

			if ($(this).attr('disabled')) {
				return false;
			}

			Players.player().work();

			return false;

		});


		$(document).on("click", "[data-action='sleep']", function(e) {

			e.preventDefault();

			if ($(this).attr('disabled')) {
				return false;
			}

			Players.player().sleep();

			return false;

		});
		

	}

	return {
		init : init
	}

}());

Behaviours.init();