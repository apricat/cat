var Shop = (function () {

  	// privates
  	var basket = []; 

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
	item: "Cat food",
	price: 5
});

Shop.addItem({
	item: "Mouse toy",
	price: 3
});

Shop.addItem({
	item: "Laser pointer",
	price: 3
});

Shop.addItem({
	item: "Mouse toy",
	price: 3
});