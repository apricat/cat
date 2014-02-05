var Dialog = (function () {

		var template = {
			"dialog" : {
				"container" : ".dialog",
				"text" : ".dialog p",
				"cat" : {
					"title" : ".dialog h4"
				}
			}
	}

	/**
	 * [dialog description]
	 * @param  {[type]} dialog    [description]
	 * @param  {[type]} container [description]
	 * @return {[type]}           [description]
	 */
	function say(dialog, container) {

		$("a").attr("disabled", "disabled");

		$(container).find("p").text("");

		paused = true;

		$(container).show();

		addTextByDelay(dialog, $(container).find("p"), 200);

	}


	/**
	 * [addTextByDelay description]
	 * @param {[type]} text  [description]
	 * @param {[type]} elem  [description]
	 * @param {[type]} delay [description]
	 */
	var addTextByDelay = function(text, elem, delay) {

	    if (text.length <= 0) { 
	    	return false 
	    }

        elem.append(text[0]);
        setTimeout(
        	function(){ 
        		addTextByDelay(text.slice(1), elem, delay); 
        	},delay                 
        );
	    
	}

	/**
	 * [setCatDialog description]
	 * @param {[type]} cat [description]
	 */
	function initCatDialog( cat ) {
		$(template.dialog.cat.title).text(cat.name);
	}

	return { 

  		initCatDialog : initCatDialog,
  		say : say

  	};

}());