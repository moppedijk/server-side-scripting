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
				cars: [
					{
					brand: "Toyota",
					model: "Celica"
					},
					{
					brand: "Ferrari",
					model: "F40"
					},
					{
					brand: "Tesla",
					model: "X"
					},
					{
					brand: "BMW",
					model: "i118"
					},
					{
					brand: "Audi",
					model: "A4"
					}
				]
			}

		return data;
	}
});

carsRouter.init();