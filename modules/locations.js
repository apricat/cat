/**
 * Location module
 * 
 * @return
 */
var Locations = (function () {


	var location = [];

	var current = null;


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

			Global.log( "This place is so sad without cats..." );
			Ui.setCat("");
			return false;

		}

		Global.log( "You encounter a wild " + this.cat.name );

		Ui.setCat(this.cat.name.replace(/ /g,'').toLowerCase());
		Ui.setHeart(this.cat);
		Ui.setCatDialog(this.cat);

		this.cat.say("Miaw miaw miaw.");

		Events.listener(this.cat);

		return false;

	}


	/**
	 * Go to specific location. Will also manipulate time for travel.
	 * 
	 * @return bool
	 */
	function go() {

		var distance = this.distance;

		if (current.name !== "Home") {
			distance = this.distance + current.distance;
		}

		Global.addTime( distance );

		this.display();
		this.encounter();

		current = this;

		return false;

	}


	function getCurrent() {
		return current;
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
  		current : function() { return getCurrent(); },
  		handleGifting : handleGifting,
  		handlePetting : handlePetting

  	};

}());

Locations.init();