var hotelService = require('../services/hotelService');

exports.list = function(req, res) {
	var categoryId = req.params.categoryId;
	var categoriesHotels = hotelService.getCategoriesWithHotels();
	var categories = [];

	if( categoryId ) {
		var category = hotelService.getCategory(categoryId);
	}

	if( category ) {
		categories.push(category);
	} else {
		categories = hotelService.getCategories();
	}

	var title = 'Hoteles en Disney World Orlando - Planeta Raton';
	var description = 'Toda la información para tu viaje a Disney World Orlando';
	
	if( categories.length == 1 ) {
		title = 'Hoteles ' + categories[0].name.toLowerCase() + ' en Orlando Planeta Raton';
		description = 'Información sobre los hoteles ' + categories[0].name.toLowerCase() + ' dentro de Disney World';
	}

	res.render('hotel/index', { categories: categories, categoriesHotels: categoriesHotels, title: title, description: description });
};

exports.get = function(req, res) {
	var hotelName = req.params.hotelName;
	var hotelFound;
	
	if( hotelName ) {
		hotelFound = hotelService.getByName(hotelName)
	}

	if( hotelFound ) {
		hotelFound.html = hotelService.getHtml(hotelFound);

		var title = 'Hotel ' + hotelFound.name + ' en Disney World - Planeta Raton';
		var description = 'Descubrí lo mejor del hotel ' + hotelFound.name + ' en Disney World';

		res.render('hotel/show', { hotel: hotelFound, title: title, description: description });
	} else {
		res.status(404).send('Not found');
	}
};


