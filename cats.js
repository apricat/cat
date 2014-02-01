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

		Global.log( this.name + "'s affection for you is at " + this.affection );

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

			Global.log( this.name + " LOVES " + item + "!");

			return false;

		}

		if ( item === this.hates ) {

			this.affection -= config.hate;

			this.say( "hiisss" );

			Global.log( this.name + " HATES " + item + "!");

			return false;

		}

		this.affection += config.like;

		return false;

	}


	/**
	 * Cat dialog
	 * 
	 * @param  string dialog 
	 * @return bool
	 */
	function say( dialog ) {

		Global.log( dialog );

		return false;

	}


	/**
	 * Petting cat action
	 * 
	 * @return bool
	 */
	function pet() {

		if ( this.affection < config.affection ) {

			this.say( "hiisss" );

			Global.log( this.name + "'s affection level is not high enough yet...");

			return false;

		}

		this.say( "Prr" );

		if ( this.petted ) {

			Global.log( this.name + " was already pet today.");

			return false;

		}

		this.affection += config.likes;
		this.petted     = true;

		Global.log( this.name + " is very happy!");

		return false;

	}


	/**
	 * Flag resets for cats
	 * @return bool
	 */
	function resets() {

		for ( var i = 0; i < Cats.cat.length; i++ ) {

			Cats.cat[i].petted = false;
			Cats.cat[i].given  = false;

			Global.log(Cats.cat[i].name + " resetted.");

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
		cat[0] = new Cat("Fat Cat", 0, "Tuna", "Laser pointer");

		// schedule: Tue-Wed-Fri-Sat | 9-17
		cat[1] = new Cat("Cute Cat", -200, "Birds", "Mouse toy");

		// schedule: Mon-Sat-Sun | 20-0
		cat[2] = new Cat("Evil Cat", -400, "Laser pointer", "Tuna");

		// schedule: Wed-Thu-Sun | 11-16
		cat[3] = new Cat("Shy Cat", -800, "Mouse toy", "Birds");

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