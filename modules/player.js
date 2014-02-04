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
  		this.work        = work;
  		this.job         = { "title" : "waitress", "wage" : 6, "shift" : 4, "energy" : 60, "startsAt" : 10 };
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
	function sleep() {

		Global.log("You went to sleep...");
		this.reccuperate(100);
		this.status = STATUS_HEALTHY;
		Global.addTime(28800);
		return false;

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
			this.sleep();
			Global.log("You are sick :(");
			this.status = STATUS_SICK;

			return false;

		}

		if (this.health < qty) {

			Global.log("Not enough energy to accomplish this action.")
			return false;

		}

		// Warn user that health is becoming low
		if (this.health <= 25 && this.status === STATUS_HEALTHY) { 
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
	 * Reccupera health and energy
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
	function work() {

		var location = Locations.current();

		if (location.name !== "Home") {
			Global.log("You must head home first.");
			return false;
		}

		if (Global.currentTime() > (this.job.startsAt + this.job.shift + 1) * 60 * 60 || 
			Global.currentTime() < (this.job.startsAt - 1) * 60 * 60) {
			Global.log("You cannot attend work outside of work hours.");
			return false;
		}

		if (!this.tire(this.job.energy)) {
			return false;
		}

		Global.log("Going to work...");

		// Add work hours...
		Global.addTime( this.job.shift * 60 * 60 );
		Inventory.addMoney( this.job.shift * this.job.wage );

		Global.log("Back from work.");

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