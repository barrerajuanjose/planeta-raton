
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('your secret here'));
	app.use(express.session());
	app.use(express.compress());
	app.use(app.router);

	var oneDay = 86400000;
	var oneYear = 86400000 * 365;

	app.use(express.static(path.join(__dirname, 'public'), { maxAge: oneYear }));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

app.get('/', routes.hotelList);
app.get('/hoteles', routes.hotelList);
app.get('/hoteles/:hotelName', routes.hotelGet);
app.get('/hoteles/categoria/:categoryId', routes.hotelList);
app.get('/sitemap.xml', routes.sitemap);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

setInterval(function(){
	var exec = require('child_process').exec;
	exec('curl http://www.planetaraton.com.ar', function(error, stdout, stderr) {
		console.log('ERROR' + error)
	});
}, 1000 * 60 * 30);