var Behaviours = (function () {

	var template = {
		"dialog" : {
			"container" : ".dialog",
			"accept" : ".dialog [data-action='accept']"
		},
		"pause" : "#space"
	}

	function init() {


		$(document).on("keypress", function(e) {

			e.preventDefault();

			if (e.which === 13 || e.keycode === 13) {

				$("a").removeAttr("disabled");
				$(template.dialog.container + "," + template.dialog.accept).hide();

				Ui.pause(false);

			}

			if (e.which === 32 || e.keyCode == 32) {

				if ($(template.pause).hasClass("active")) {
					$(template.pause).removeClass("active");
					Ui.pause(false);
					return false;
				}

				$(template.pause).addClass("active");
				Ui.pause(true);

				return false;

			}

		});


		$(document).on("click", template.dialog.accept, function(e) {

			e.preventDefault();

			$("a").removeAttr("disabled");
			$(template.dialog.container + "," + template.dialog.accept).hide();

			Ui.pause(false);

		});


		$(document).on("click", "[data-action='toggle']", function(e) {

			e.preventDefault();

			if ($(this).attr('disabled')) {
				return false;
			}

			var target = $(this).attr("data-target");

			$("[data-toggle='"+target+"']").addClass("active");

			Ui.pause(true);

		});


		$(document).on("click", "[data-toggle] [data-action='close'], [data-toggle] a", function(e) {

			e.preventDefault();

			$("[data-toggle]").removeClass("active");

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

			if (id == 0) {
				// going home
				$("[data-action='sleep']").addClass("active");
				Locations.location[id].go();
				return false;
			}

			$("[data-action='sleep']").removeClass("active");
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


		$(document).on("click", "[data-action='scavange']", function(e) {

			e.preventDefault();

			if ($(this).attr('disabled')) {
				return false;
			}

			Players.player().scavange();
			Ui.populateMenu();

			return false;

		});


		$(document).on("click", "[data-action='sleep']", function(e) {

			e.preventDefault();

			if ($(this).attr('disabled')) {
				return false;
			}

			Players.player().sleep(false);
			
			return false;

		});
		

	}

	return {
		init : init
	}

}());

Behaviours.init();