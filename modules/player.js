/**
 * Player module
 * 
 * @return
 */
var Player = (function () {


	player = null;


	/**
	 * Location object
	 * 
	 * @param string name       Name of location
	 * @param int    appearance Appearance of player
	 * @param obj    cat        Cat owned by player
	 */
  	function Location( name, appearance, cat ) {

  		this.name        = name;
  		this.appearance  = appearance;
  		this.cat         = cat;

	}


	/**
	 * Initiate player class
	 * 
	 * @return
	 */
	function init() {

		player = new Location("Clo", 0, null);
		
	}

  	return { 

  		init : init

  	};

}());

Player.init();