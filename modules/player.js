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
  		this.job         = { "title" : "waitress", "wage" : 8, "shift" : 4 };

	}


	/**
	 * Go to work!
	 */
	function work() {

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