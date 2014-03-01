var hotel = require('../controllers/hotelController');
var sitemap = require('../controllers/sitemapController');

exports.hotelList = function(req, res){
	hotel.list(req, res);
};

exports.hotelGet = function(req, res){
	hotel.get(req, res);
};

exports.index = function(req, res){
	res.render('index', {title: 'Planeta Raton tu viaje a Orlando'});
};

exports.sitemap = function(req, res){
	sitemap.build(req, res);
};

exports.sitemap = function(req, res){
	sitemap.ping(req, res);
};