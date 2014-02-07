var Dialog = (function () {

		var template = {
			"dialog" : {
				"container" : ".dialog",
				"text" : ".dialog p",
				"accept" : ".dialog [data-action='accept']",
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

		$("a:not(.dialog a)").attr("disabled", "disabled");

		$(container).find("p").text("");

		Ui.pause(true);

		$(container).show();

		addTextByDelay(dialog, $(container).find("p"), 100);

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
        	function() {

        		if (text.slice(1) == "") {
        			$(template.dialog.accept).show();
        		}

        		addTextByDelay(text.slice(1), elem, delay);

        	}, delay                 
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