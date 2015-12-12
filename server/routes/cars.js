var abstractRouter = require('./_abstractRouter');
var extend = require('extend');

var carsRouter = extend(abstractRouter, {

	initRouter: function() {

		this.router.get('/', function (req, res, next){
			res.render('cars', this.data());
		}.bind(this));

		// A module always needs to export something
		module.exports = this.router;
	},
	data: function() {

		var data = {
				title: 'Cars', 
				headerTitle: 'This is the cars page',
				menuItems: [
					{title: 'Home', hash: '/'}, 
					{title: 'Auto\'s', hash: 'cars'},
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