var hotel = require('../controllers/hotelController');

exports.list = function(req, res){
	hotel.list(req, res);
};

exports.get = function(req, res){
	hotel.get(req, res);
};