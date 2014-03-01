var hotelsConfig = require('../data/hotels/hotelsConfig.json');

exports.getAll = function() {
	var hotels = [];

	hotelsConfig.forEach(function(hotel) {
		hotel.url = '/hoteles/' + hotel.name.replace(/ /g, '-');

		hotels.push(hotel);
	});

	return hotels;
}