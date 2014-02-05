var Behaviours = (function () {

	var template = {
		"dialog" : {
			"container" : ".dialog"
		}
	}

	function init() {

		$(document).on("click", "a:disabled", function(e) {

			return false;

		});

		$(document).on("keypress", function(e) {

			e.preventDefault();

			if (e.which === 13) {

				$("a").removeAttr("disabled");
				$(template.dialog.container).hide();

				paused = false;

			}

		});


		$(document).on("click", "[data-action='give']", function(e) {

			e.preventDefault();

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

			var qty  = $(this).attr("data-qty"),
				item = $(this).attr("data-item");

			Inventory.transaction(item, qty);

			return false;

		});


		$(document).on("click", "[data-action='go']", function(e) {

			e.preventDefault();

			var id = $(this).attr("data-location");

			Locations.location[id].go();

			return false;

		});


		$(document).on("click", "[data-action='pet']", function(e) {

			e.preventDefault();

			Locations.handlePetting();

			return false;

		});


		$(document).on("click", "[data-action='work']", function(e) {

			e.preventDefault();

			Players.player.work();

			return false;

		});


		$(document).on("click", "[data-action='sleep']", function(e) {

			e.preventDefault();

			Players.player.sleep();

			return false;

		});
		

	}

	return {
		init : init
	}

}());

Behaviours.init();