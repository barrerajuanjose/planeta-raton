var parksConfig = require('../data/hotels/parksConfig.json');
var fs = require('fs');

exports.getAll = function() {
	var parks = [];

	parksConfig.forEach(function(park) {
		park.url = '/parques/' + park.name.replace(/ /g, '-').toLowerCase();

		parks.push(park);
	});

	return parks;
}

exports.getHtml = function(park) {
	var pathHtml = 'data/parks/' + park.categoryId + '/' + park.id + '.html';

	return fs.readFileSync(pathHtml, 'utf-8').replace(/\n/g, ' ');
}