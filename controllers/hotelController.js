var hotels = require('../data/hotels/hotelsConfig.json');

exports.list = function(req, res) {
	var ids = [];

	hotels.forEach(function(hotel) { 
		ids.push(hotel.id)
	});

	res.render('hotel/index', {hotels: hotels});
};

exports.get = function(req, res) {
	var hotelFound = [];
	var hotelId = req.params.hotelId

	hotels.forEach(function(hotel) { 
		if(hotel.id == hotelId) {
			hotelFound = hotel;
		}
	});

	hotelFound.text = hotelFound.text.replace(/\n/g, "")

	res.render('hotel/show', {hotel: hotelFound});
};
