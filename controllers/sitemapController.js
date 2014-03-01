var hotelsService = require('../services/hotelService');

exports.build = function(req, res) {
	var sitemap = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>http://www.planetaraton.com.ar</loc></url><url><loc>http://www.planetaraton.com.ar/</loc></url><url><loc>http://www.planetaraton.com.ar/hoteles</loc></url><url><loc>http://www.planetaraton.com.ar/hoteles/categoria/economicos</loc></url><url><loc>http://www.planetaraton.com.ar/hoteles/categoria/moderados</loc></url><url><loc>http://www.planetaraton.com.ar/hoteles/categoria/lujosos</loc></url><url><loc>http://www.planetaraton.com.ar/hoteles/categoria/villas-de-lujo</loc></url>';

	var hotels = hotelsService.getAll();

	hotels.forEach(function(hotel) {
		sitemap += '<url><loc>http://www.planetaraton.com.ar' + hotel.url + '</loc></url>';
	});

	sitemap += '</urlset>';
	res.header('Content-Type','text/xml').send(sitemap);
};