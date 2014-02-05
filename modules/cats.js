/**
 * Cats cats cats
 * 
 * @return
 */
var Cats = (function () {


	// global configurations for cats
	var config = {
		"love"      : 20,
		"like"      : 10,
		"hate"      : 20,
		"affection" : 0
	};


	// init global cats
	var cat = [];


	/**
	 * Displays cat graphics unto screen
	 * 
	 * @return bool
	 */
	function display() {

		return false;

	}


	/**
	 * Action of giving item to cat
	 * 
	 * @param  string item Item given to cat
	 * @return bool
	 */
	function give( item ) {

		if ( this.given ) {

			Global.log( this.name + " has already gotten a gift today.");

			return false;

		}

		if ( item === this.loves ) {

			this.affection += config.love;

			this.say( "Prrr" );

			this.given = true;

			Global.log( this.name + " LOVES " + item + "!");

			return true;

		}

		if ( item === this.hates ) {

			this.affection -= config.hate;

			this.say( "Hisss" );

			this.given = true;

			Global.log( this.name + " HATES " + item + "!");

			return true;

		}

		this.say( "Miaw" );

		Global.log( this.name + " is content with your gift offering.");

		this.affection += config.like;

		this.given = true;

		return true;

	}


	/**
	 * Cat dialog
	 * 
	 * @param  string dialog 
	 * @return bool
	 */
	function say( dialog ) {

		Dialog.say( dialog , "#cat-dialog" );

		return false;

	}


	/**
	 * Petting cat action
	 * 
	 * @return bool
	 */
	function pet() {

		if ( this.affection < config.affection ) {

			this.say( "Hisss" );

			Global.log( this.name + "'s affection level is not high enough yet...");

			return false;

		}

		this.say( "Prr" );

		if ( this.petted ) {

			Global.log( this.name + " was already pet today.");

			return false;

		}

		this.affection += config.like;
		this.petted     = true;

		Global.log( this.name + " is very happy!");

		return false;

	}


	/**
	 * Flag resets for cats
	 * @return bool
	 */
	function resets() {

		for ( var i = 0; i < cat.length; i++ ) {

			cat[i].petted = false;
			cat[i].given  = false;

		}
		return false;

	}


	/**
	 * Cat object :3
	 * 
	 * @param string name      Cat name
	 * @param int    affection Starting level of affection
	 * @param string location  Location of cat
	 * @param string loves     Item cat loves
	 * @param string hates     Item cat hates
	 */
  	function Cat( name, affection, loves, hates ) {

  		this.name      = name;
		this.affection = affection;
	    this.loves     = loves;
	    this.hates     = hates;
	    this.display   = display;
	    this.give      = give;
	    this.pet       = pet;
	    this.say       = say;

	    // flags for actions
	    this.petted    = false;
	    this.given     = false;

	}


	/**
	 * Initiates cat objects
	 * 
	 * @return bool
	 */
	function init() {

		// schedule: Mon-Tue-Wed-Fri | 12-21
		cat[0] = new Cat("Fat Cat", 76, "Tuna", "Laser pointer");

		// schedule: Tue-Wed-Fri-Sat | 9-17
		cat[1] = new Cat("Cute Cat", -40, "Birds", "Mouse toy");

		// schedule: Mon-Sat-Sun | 20-0
		cat[2] = new Cat("Evil Cat", -80, "Laser pointer", "Tuna");

		// schedule: Wed-Thu-Sun | 11-16
		cat[3] = new Cat("Shy Cat", -160, "Mouse toy", "Birds");

		return false;
		
	}

  	return { 

  		init   : init,
  		cat    : cat,
  		give   : give,
  		resets : resets

  	};

}());

Cats.init();