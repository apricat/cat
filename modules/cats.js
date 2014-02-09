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

			this.say( "love" );

			this.given = true;

			Global.log( this.name + " LOVES " + item + "!");

			return true;

		}

		if ( item === this.hates ) {

			this.affection -= config.hate;

			this.say( "dislike" );

			this.given = true;

			Global.log( this.name + " HATES " + item + "!");

			return true;

		}

		this.say( "like" );

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
	function say( key ) {

		var lvl = Math.floor(this.affection / 25);

		if (lvl < 0) { lvl = 0; }

		Dialog.say( this.dialog[this.name.replace(/ /g,'').toLowerCase()][lvl][key] , "#cat-dialog" );

		return false;

	}


	/**
	 * Petting cat action
	 * 
	 * @return bool
	 */
	function pet() {

		if ( this.affection < config.affection ) {

			this.say( "dislike" );

			Global.log( this.name + "'s affection level is not high enough yet...");

			return false;

		}

		this.say( "like" );

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
	 * @param string loves     Item cat loves
	 * @param string hates     Item cat hates
	 * @param obj    dialog
	 * @param array  schedule
	 */
  	function Cat( name, affection, loves, hates, dialog, schedule ) {

  		this.name      = name;
		this.affection = affection;
	    this.loves     = loves;
	    this.hates     = hates;
	    this.dialog    = dialog;
	    this.display   = display;
	    this.give      = give;
	    this.pet       = pet;
	    this.say       = say;
	    this.schedule  = schedule;

	    // flags for actions
	    this.petted    = false;
	    this.given     = false;

	}

	/**
	 * TEMPORARY
	 * @return {[type]} [description]
	 */
	function fetchDialog() {

        return {
        	"fatcat" : {
        		0 : {
					"hello" : "...",
					"pet"   : "Hiss",
					"like"  : "Umph",
					"dislike" : "HISS!",
					"love" : "Miaw!"
				},
				1 : {
					"hello" : ">:3",
					"pet"   : "...",
					"like"  : "Umph",
					"dislike" : "Hiss!",
					"love" : "Miaw!"
				},
				2 : {
					"hello" : "???",
					"pet"   : ":3",
					"like"  : "Miaw.",
					"dislike" : "...",
					"love" : "Miaw! Miaw Miaw. Miaw!"
				},
				3 : {
					"hello" : "Miaw miaw miaw!",
					"pet"   : "Prrr Prrr",
					"like"  : ":'3",
					"dislike" : "...",
					"love" : "Miaw! <3 <3 <3"
				}
        	},
        	"cutecat" : {
        		0 : {
					"hello" : "...",
					"pet"   : "Hiss",
					"like"  : "Umph",
					"dislike" : "HISS!",
					"love" : "Miaw!"
				},
				1 : {
					"hello" : ">:3",
					"pet"   : "...",
					"like"  : "Umph",
					"dislike" : "Hiss!",
					"love" : "Miaw!"
				},
				2 : {
					"hello" : "???",
					"pet"   : ":3",
					"like"  : "Miaw.",
					"dislike" : "...",
					"love" : "Miaw! Miaw Miaw. Miaw!"
				},
				3 : {
					"hello" : "Miaw miaw miaw!",
					"pet"   : "Prrr Prrr",
					"like"  : ":'3",
					"dislike" : "...",
					"love" : "Miaw! <3 <3 <3"
				}
        	},
        	"evilcat" : {
        		0 : {
					"hello" : "...",
					"pet"   : "Hiss",
					"like"  : "Umph",
					"dislike" : "HISS!",
					"love" : "Miaw!"
				},
				1 : {
					"hello" : ">:3",
					"pet"   : "...",
					"like"  : "Umph",
					"dislike" : "Hiss!",
					"love" : "Miaw!"
				},
				2 : {
					"hello" : "???",
					"pet"   : ":3",
					"like"  : "Miaw.",
					"dislike" : "...",
					"love" : "Miaw! Miaw Miaw. Miaw!"
				},
				3 : {
					"hello" : "Miaw miaw miaw!",
					"pet"   : "Prrr Prrr",
					"like"  : ":'3",
					"dislike" : "...",
					"love" : "Miaw! <3 <3 <3"
				}
        	}
        	
		}

    }


	/**
	 * Initiates cat objects
	 * 
	 * @return bool
	 */
	function init() {

		// schedule: 12-21
		cat[0] = new Cat("Fat Cat", 55, "tuna", "laserpointer", fetchDialog(), [7, 21]);

		// schedule: 9-17
		cat[1] = new Cat("Cute Cat", 25, "birds", "mousetoy", fetchDialog(), [9, 17]);

		// schedule: 20-0
		cat[2] = new Cat("Evil Cat", -80, "laserpointer", "tuna", fetchDialog(), [0, 7]);

		// schedule: 11-16
		cat[3] = new Cat("Shy Cat", -160, "mousetoy", "birds", fetchDialog(), [11, 16]);

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