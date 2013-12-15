var hotel = require('../controllers/hotelController');

exports.hotelList = function(req, res){
	hotel.list(req, res);
};

exports.hotelGet = function(req, res){
	hotel.get(req, res);
};

exports.index = function(req, res){
 	res.render('index');
};