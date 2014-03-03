var hotelsConfig = require('../data/hotels/hotelsConfig.json');
var categoriesConfig = require('../data/hotels/categoriesConfig.json');
var fs = require('fs');

exports.getAll = function() {
	var hotels = [];

	hotelsConfig.forEach(function(hotel) {
		hotel.url = '/hoteles/' + hotel.name.replace(/ /g, '-').toLowerCase();

		hotels.push(hotel);
	});

	return hotels;
};

exports.getByName = function(hotelName) {
	var hotelFound;
	hotelName = hotelName.replace(/-/g, ' ');

	var hotels = this.getAll();

	hotels.forEach(function(hotel) {
		if( hotel.name.replace(/-/g, ' ').toLowerCase() == hotelName.toLowerCase() ) {
			hotelFound = hotel;
		}
	});

	return hotelFound;
};

exports.getHtml = function(hotel) {
	var pathHtml = 'data/hotels/' + hotel.categoryId + '/' + hotel.id + '.html';

	return fs.readFileSync(pathHtml, 'utf-8').replace(/\n/g, ' ');
};

exports.getCategoriesWithHotels = function() {
	var categoriesHotels = new Object();

	var hotels = this.getAll();

	hotels.forEach(function(hotel) {
		var categoryHotel = categoriesHotels[hotel.categoryId]
		if( categoryHotel === undefined ) {
			categoryHotel = []
		}
		categoryHotel.push({ id: hotel.id, name: hotel.name, url: hotel.url });

		categoriesHotels[hotel.categoryId] = categoryHotel
	});

	return categoriesHotels;
};

exports.getCategories = function() {
	var categories = [];

	categoriesConfig.forEach(function(category) {
		categories.push(category)
	});

	categories.sort(sortFunctionDesc);

	return categories;
};

exports.getCategory = function(categoryId) {
	var categoryFound;

	categoriesConfig.forEach(function(category) {
		if( category.id == categoryId ) {
			categoryFound = category;
		}
	});

	return categoryFound;
};

function sortFunctionDesc(a, b) {
	return b.weight - a.weight
}