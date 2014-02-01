var Shop = (function () {

  	// privates
  	var basket = []; 

  	function doSomethingPrivate() {
    	//...
  	}

  	// Return an object exposed to the public
  	return { 

		// Add items to our basket
		addItem: function( values ) {
			basket.push(values);
		},

		// Get the count of items in the basket
		getItemCount: function () {
			return basket.length;
		},

		// Get the total value of items in the basket
		getTotal: function () {

			var q = this.getItemCount(),
		    	p = 0;

		  	while (q--) {
		    	p += basket[q].price;
		  	}

		  	return p;
		}
  	};
}());


Shop.addItem({
	item: "bread",
	price: 5
});

Shop.addItem({
	item: "butter",
	price: 3
});

// Outputs: 2
console.log( Shop.getItemCount() );