/**
 * Location module
 * 
 * @return
 */
var Locations = (function () {


	var location = [];
	var current  = null;


	/**
	 * Display location
	 * 
	 * @return bool
	 */
	function display() {

		Ui.setLocation(this.name.toLowerCase());

		return false;

	}


	/**
	 * Handles gifting
	 * 
	 * @param  string item 
	 * @return bool
	 */
	function handleGifting( item ) {

		if (!current.cat) {
			Global.log("There is no cat!");
			return false;
		}

		if (!current.cat.give(item)) {
			return false;
		};

		return true;

	}


	/**
	 * Handle cat petting
	 * 
	 * @return bool
	 */
	function handlePetting() {

		if (!current.cat) {
			Global.log("There is no cat!");
			return false;
		}

		current.cat.pet();

		return false;

	}


	/**
	 * Encounter a wild cat!
	 * 
	 * @return bool
	 */
	function encounter() {

		if (!this.cat) {

			var wait0 = setTimeout(function() { 
				Players.player().say("This place is so sad without cats...");
				clearTimeout(wait0);
			}, 750);
			Ui.setCat("");
			return false;

		}

		if (Global.currentTime() < this.cat.schedule[0]*3600 || Global.currentTime() > this.cat.schedule[1]*3600) {
			var wait1 = setTimeout(function() { 
				Players.player().say("There is no cat... maybe I should come back at another time...");
				clearTimeout(wait1);
			}, 750);
			Ui.setCat("");
			return false;
		}

		Global.log( "You encounter a wild " + this.cat.name );

		Ui.setCat(this.cat.name.replace(/ /g,'').toLowerCase());
		Ui.setHeart(this.cat);

		Dialog.initCatDialog(this.cat);

		var wait2 = setTimeout(function() { Players.player().say("hello"); clearTimeout(wait2); }, 750);
		var wait3 = setTimeout(function() { Locations.current().cat.say("hello"); clearTimeout(wait3); }, 750);

		Events.listener(this.cat);

		return false;

	}


	/**
	 * Go to specific location. Will also manipulate time for travel.
	 * 
	 * @return bool
	 */
	function go() {

		if (current.name == this.name) {
			Ui.log("You are already there...");
			return false;
		}

		this.display();

		this.encounter();

		current = this;

		return false;

	}


	/**
	 * Location object
	 * @param string name     Name of location
	 * @param int    distance Distance from home
	 * @param obj    cat      Cat object found in location
	 */
  	function Location( name, distance, cat ) {

  		this.name      = name;
  		this.distance  = distance;
  		this.cat       = cat;
  		this.encounter = encounter;
	    this.display   = display;
	    this.go        = go;

	}


	/**
	 * Initiate location class
	 * 
	 * @return
	 */
	function init() {

		location[0] = new Location("Home", 0, null);
		location[1] = new Location("Garden", 3600, Cats.cat[0]);
		location[2] = new Location("Alley", 60, Cats.cat[1]);
		location[3] = new Location("Terrasse", 7200, Cats.cat[2]);

		current = location[0];
		
	}

  	return { 

  		init : init,
  		location : location,
  		current : function() { return current; },
  		handleGifting : handleGifting,
  		handlePetting : handlePetting

  	};

}());

Locations.init();