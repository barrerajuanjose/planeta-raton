var hotelsConfig = require('../data/hotels/hotelsConfig.json');
var categoriesConfig = require('../data/hotels/categoriesConfig.json');
var fs = require('fs');

exports.list = function(req, res) {
	var categoryId = req.params.categoryId;
	var categoriesHotels = new Object();
	var categories = [];

	categoriesConfig.forEach(function(category) {
		if ( !categoryId || category.id == categoryId ) {
			categories.push(category)
		}
	});

	categories.sort(sortFunctionDesc);

	hotelsConfig.forEach(function(hotel) {
		var categoryHotel = categoriesHotels[hotel.categoryId]
		if( categoryHotel === undefined ) {
			categoryHotel = []
		}
		categoryHotel.push({ id: hotel.id, name: hotel.name, url: hotel.name.replace(/ /g, '-') });

		categoriesHotels[hotel.categoryId] = categoryHotel
	});

	var title = 'Hoteles en Orlando Planeta Raton';
	if( categoryId && categories[0] ) {
		title = 'Hoteles categoría ' + categories[0].name + ' en Orlando Planeta Raton';
	}

	res.render('hotel/index', { categories: categories, categoriesHotels: categoriesHotels, title: title });
};

exports.get = function(req, res) {
	var hotelFound;
	var hotelName = req.params.hotelName;

	if( hotelName ) {
		hotelName = hotelName.replace(/-/g, ' ');
	}

	hotelsConfig.forEach(function(hotel) {
		if(hotel.name.replace(/-/g, ' ') == hotelName) {
			hotelFound = hotel;
		}
	});

	if( hotelFound ) {
		var hotelPath = 'data/hotels/' + hotelFound.categoryId + '/' + hotelFound.id + '.html';

		hotelFound.html = fs.readFileSync(hotelPath, 'utf-8').replace(/\n/g, ' ');

		res.render('hotel/show', {hotel: hotelFound, title: 'Hotel ' + hotelFound.name + ' Planeta Raton'});
	} else {
		res.status(404).send('Not found');
	}
};

function sortFunctionDesc(a, b) {
	return b.weight - a.weight
}

