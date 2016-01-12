var abstractRouter = require('./_abstractRouter');
var extend = require('extend');

var carsRouter = extend(abstractRouter, {

	initRouter: function() {

		this.router.get('/', function (req, res, next){
			res.render('cars', this.getCarsData());
		}.bind(this));

		// A module always needs to export something
		module.exports = this.router;
	},
	getCarsData: function() {

		var data = {
			title: 'SSS | Cars', 
			headerTitle: 'SSS',
			menuItems: [
				{title: 'Home', hash: '/'}, 
				{title: 'Auto\'s', hash: 'cars', active: true},
			],
			cars: this.fetchCars()
		};

		console.log(data);

		return data;
	},
	fetchCars: function() {

		var resultSet = false;

		this.MongoClient.connect('mongodb://localhost:27017/serverSideScripting', function(err, db) {
			if (err) throw err;

			db.collection('cars').find().toArray(function(err, result) {
				if (err) throw err;

				resultSet = result;

				// return result;
			}.bind(this));

		}.bind(this));

		console.log(resultSet);

		// console.log(typeof this.resultSet);

		return resultSet;
	}
});

carsRouter.init();