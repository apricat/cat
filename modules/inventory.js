var Inventory = (function () {

  	// privates
  	var inventory = {
  		"catfood" : {
  			"name"  : "Cat food",
  			"value" : 5,
  			"qty"   : 1
  		},
  		"mousetoy" : {
  			"name"  : "Mouse toy",
  			"value" : 5,
  			"qty"   : 0
  		},
  		"tuna" : {
  			"name"  : "Tuna",
  			"value" : 5,
  			"qty"   : 0
  		},
  		"birds" : {
  			"name"  : "Birds",
  			"value" : 25,
  			"qty"   : 0
  		},
        "caviar" : {
            "name" : "Caviar",
            "value" : 200,
            "qty"   : 0
        }
  	};

    var money = 20;


    /**
     * [addQty description]
     * @param {[type]} item  [description]
     * @param {[type]} value [description]
     */
    function addQty( item, value ) {
        
        inventory[item]["qty"] += parseInt(value, 10);
        Global.log(item + " added.");

    }


    function pickRandomItem() {

        var result;
        var count = 0;

        for (var prop in inventory)
            if (Math.random() < 1/++count)
               result = prop;
        return result;

    }


    /**
     * [removeQty description]
     * @param  {[type]} item  [description]
     * @param  {[type]} value [description]
     * @return {[type]}       [description]
     */
    function removeQty( item, value ) {

        if (inventory[item]["qty"] < value) {
            Global.log("Not enough of this item available.");
            return false;
        }

        inventory[item]["qty"] -= value;
        Global.log(item + " removed.");
        return true;

    }


    /**
     * Remove money
     * 
     * @param  int qty
     * @return bool
     */
    function removeMoney( qty ) {

        if (money < qty) {
            return false;
        }

        money = money - qty;
        Ui.refreshMoney();
        return true;

    }


    /**
     * Add money
     * 
     * @param int qty
     * @return bool
     */
    function addMoney( qty ) {
        money += qty;
        Ui.refreshMoney();
        return false;
    }


    /**
     * [transaction description]
     * @param  {[type]} item [description]
     * @param  {[type]} qty  [description]
     * @return {[type]}      [description]
     */
    function transaction( item, qty ) {

        if (!qty) {
            qty = 1;
        }

        if (!removeMoney(inventory[item]["value"])) {
            Global.log("You don't have enough money to buy " + inventory[item]["name"]);
            return false;
        }

        addQty(item, qty);
        return false;

    }

  	function init() {}

  	return { 

  		getItems : function() { return inventory; },
        getMoney : function () { return money; },
  		init : init,
        transaction : transaction,
        removeQty : removeQty,
        addMoney : addMoney,
        pickRandomItem : function() {return pickRandomItem(); },
        addQty : addQty

  	};
}());

Inventory.init();
