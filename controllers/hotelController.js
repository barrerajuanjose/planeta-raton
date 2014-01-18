var hotels = require('../data/hotels/hotelsConfig.json');
var fs = require('fs');

exports.list = function(req, res) {
	var categoryId = req.params.categoryId;
	var categoriesHotels = new Object();
	var categories = [];

	hotels.forEach(function(hotel) {
		if ( !categoryId || hotel.category == categoryId ) {
			var categoryHotel = categoriesHotels[hotel.category]
			if( categoryHotel === undefined ) {
				categoryHotel = []
				categories.push(hotel.category)
			}
			categoryHotel.push({ id: hotel.id, name: hotel.name, url: hotel.name.replace(/ /g, '-') });

			categoriesHotels[hotel.category] = categoryHotel
		}
	});

	var title = 'Hoteles en Orlando Planeta Raton';
	if( categoryId ) {
		title = 'Hoteles categoria ' + categoryId + ' Orlando Planeta Raton';
	}

	res.render('hotel/index', { categories: categories, categoriesHotels: categoriesHotels, title: title });
};

exports.get = function(req, res) {
	var hotelFound;
	var hotelName = req.params.hotelName;

	if( hotelName ) {
		hotelName = hotelName.replace(/-/g, ' ');
	}

	hotels.forEach(function(hotel) {
		if(hotel.name.replace(/-/g, ' ') == hotelName) {
			hotelFound = hotel;
		}
	});

	if( hotelFound ) {
		var hotelPath = 'data/hotels/' + hotelFound.category + '/' + hotelFound.id + '.html';

		hotelFound.html = fs.readFileSync(hotelPath, 'utf-8').replace(/\n/g, ' ');

		res.render('hotel/show', {hotel: hotelFound, title: 'Hotel ' + hotelFound.name + ' Planeta Raton'});
	} else {
		res.status(404).send('Not found');
	}
};

