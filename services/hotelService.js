var hotelsConfig = require('../data/hotels/hotelsConfig.json');
var fs = require('fs');

exports.getAll = function() {
	var hotels = [];

	hotelsConfig.forEach(function(hotel) {
		hotel.url = '/hoteles/' + hotel.name.replace(/ /g, '-').toLowerCase();

		hotels.push(hotel);
	});

	return hotels;
}

exports.getHtml = function(hotel) {
	var pathHtml = 'data/hotels/' + hotel.categoryId + '/' + hotel.id + '.html';

	return fs.readFileSync(pathHtml, 'utf-8').replace(/\n/g, ' ');
}