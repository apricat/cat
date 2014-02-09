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
  		this.say         = say;
  		this.scavange    = scavange;
  		this.hunt        = { "time" : 4, "energy" : 60 };
  		this.health      = 100;
  		this.tire        = tire;
  		this.sleep       = sleep;
  		this.reccuperate = reccuperate;
  		this.status      = STATUS_HEALTHY;

	}


	/**
	 * Player dialog
	 * 
	 * @param  string dialog 
	 * @return bool
	 */
	function say( dialog ) {

		Dialog.say( dialog , "#player-dialog" );

		return false;

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

		setTimeout(function() {
			Ui.blackout(true);
		}, 1200);

        setTimeout(function() {

          	Ui.blackout(false);

          	Players.player().reccuperate(100);
			Players.player().status = STATUS_HEALTHY;

			Global.log("You feel rested!");
			Global.addTime(28800);

        }, 3000);

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

			fainted();

			return false;

		}

		if (this.health < qty) {

			Global.log("Not enough energy to accomplish this action.")
			return false;

		}

		// Warn user that health is becoming low
		if (this.health <= 10 && this.status !== STATUS_SICK) { 
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
	 * [fainted description]
	 * @return {[type]} [description]
	 */
	function fainted() {

		Ui.pause(true);

		Global.log("You fainted!");

		$("#player").addClass("faint");

		setTimeout(function(){
			Ui.blackout(true);
		}, 1200);

		// reset health to full
		Players.player().health = 100;

        setTimeout(function(){

        	Locations.location[0].go();

			Players.player().status = STATUS_SICK;

			Global.addTime(14400);

          	Ui.blackout(false);

          	$("#player").removeClass("faint");

			Global.log("You are sick :(");

			Ui.pause(false);
			
		}, 3000);

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
	 * Get items!
	 *
	 * @return bool
	 */
	function scavange() {

		if (this.health < this.hunt.energy) {
			return false;
		}

		$("#player").addClass("leaving");

		setTimeout(function(){
			Ui.blackout(true);
		}, 1200);
		
        setTimeout(function(){

          	Ui.blackout(false);
       
			scavanging();

			$("#player").removeClass("leaving");

		}, 3000);

		return false;

	}


	function scavanging() {

		// Add hours...
		Global.addTime( Players.player().hunt.time * 60 * 60 );

		Players.player().tire(Players.player().hunt.energy);

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

	}


	/**
	 * Initiate player class
	 * 
	 * @return
	 */
	function init() {

		player = new Player("Mitchal", 0, null);

	}

  	return { 

  		init : init,
  		player : function() { return player; }

  	};

}());

Players.init();