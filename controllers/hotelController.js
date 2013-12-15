var hotels = require('../data/hotels/hotelsConfig.json');

exports.list = function(req, res) {
	var categoriesHotels = new Object();
	var categories = [];

	hotels.forEach(function(hotel) { 
		var categoryHotel = categoriesHotels[hotel.category]
		if( categoryHotel === undefined ) {
			categoryHotel = []
			categories.push(hotel.category)
		}
		categoryHotel.push({ id: hotel.id, name: hotel.name });

		categoriesHotels[hotel.category] = categoryHotel
	});

	res.render('hotel/index', { categories: categories, categoriesHotels: categoriesHotels, title: 'Hoteles Orlando Planeta Raton' });
};

exports.get = function(req, res) {
	var hotelFound;
	var hotelId = req.params.hotelId;

	hotels.forEach(function(hotel) { 
		if(hotel.id == hotelId) {
			hotelFound = hotel;
		}
	});

	if( hotelFound ) {
		hotelFound.text = hotelFound.text.replace(/\n/g, "");

		res.render('hotel/show', {hotel: hotelFound, title: 'Hotel ' + hotelFound.name + ' Planeta Raton'});
	} else {
		res.status(404).send('Not found');
	}
};

