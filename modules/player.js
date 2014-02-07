/**
 * Player module
 * 
 * @return
 */
var Players = (function () {


	var player = {};

	const STATUS_HEALTHY = 0;
	const STATUS_SICK = 1;
	const STATUS_TIRED = 2;


	/**
	 * Player object
	 * 
	 * @param string name       Name of location
	 * @param int    appearance Appearance of player
	 * @param obj    cat        Cat owned by player
	 */
  	function Player( name, appearance, cat ) {

  		this.name        = name;
  		this.appearance  = appearance;
  		this.cat         = cat;
  		this.scavange    = scavange;
  		this.hunt        = { "time" : 4, "energy" : 60 };
  		this.health      = 100;
  		this.tire        = tire;
  		this.sleep       = sleep;
  		this.reccuperate = reccuperate;
  		this.status      = STATUS_HEALTHY;

	}


	/**
	 * Sleep
	 * 
	 * @return bool
	 */
	function sleep( forced ) {

		var location = Locations.current();

		if (location.name !== "Home" && !forced) {
			Global.log("You must head home first.");
			return false;
		}

		this.reccuperate(100);
		this.status = STATUS_HEALTHY;
		Global.addTime(28800);
		return true;

	}


	/**
	 * Decrease player energy levels
	 *
	 * @param int qty
	 * @return bool
	 */
	function tire( qty ) {

		if (this.health <= 0) {

			Global.log("You fainted!");

			// Additional time loss on top of forced sleep
			Global.addTime(14400);

			// Player sleeps and becomes sicks
			this.sleep(true);
			Global.log("You are sick :(");
			this.status = STATUS_SICK;

			return false;

		}

		if (this.health < qty) {

			Global.log("Not enough energy to accomplish this action.")
			return false;

		}

		// Warn user that health is becoming low
		if (this.health <= 25 && this.status !== STATUS_SICK) { 
			this.status = STATUS_TIRED;
		}

		// Increase energy loss if sick
		if (this.status === STATUS_SICK) {
			qty = qty + 2;
		}

		this.health -= qty;
		return true;

	}


	/**
	 * Reccuperate health and energy
	 * 
	 * @param  int qty
	 * @return
	 */
	function reccuperate( qty ) {

		if (this.health + qty > 100) {
			this.health = 100;
			return false;
		}

		this.health += qty;
		return false;

	}


	/**
	 * Go to work!
	 *
	 * @return bool
	 */
	function scavange() {

		if (!this.tire(this.hunt.energy)) {
			return false;
		}

		Global.log("Going to scavange...");

		// Add work hours...
		Global.addTime( this.hunt.time * 60 * 60 );

		var money = Math.floor((Math.random() * 20) + 1);

		Global.log("Found " + money + "$.");
		Inventory.addMoney( money );

		if (Math.floor((Math.random() * 5) + 1) === 1) {

			var qty = Math.floor((Math.random() * 10) + 1);
			var item = Inventory.pickRandomItem();

			Global.log("Found " + qty + " " + item + ".");

			Inventory.addQty( item, qty );
			return false;
		}

		Global.log("Didn't find any items...");

		return false;

	}


	/**
	 * Initiate player class
	 * 
	 * @return
	 */
	function init() {

		player = new Player("Clo", 0, null);

	}

  	return { 

  		init : init,
  		player : function() { return player; }

  	};

}());

Players.init();