/**
 * Player module
 * 
 * @return
 */
var Players = (function () {


	var player = {};


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
  		this.job         = { "title" : "waitress", "wage" : 8, "shift" : 4, "energy" : 60 };
  		this.health      = 100;
  		this.tire        = tire;
  		this.sleep       = sleep;
  		this.reccuperate = reccuperate;

	}


	/**
	 * Sleep
	 * 
	 * @return bool
	 */
	function sleep() {

		Global.log("You went to sleep...");
		this.reccuperate(75);
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
			Global.addTime(43200);
			return false;
		}

		if (this.health < qty) {
			Global.log("Not enough energy to accomplish this action.")
			return false;
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
	 */
	function work() {

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