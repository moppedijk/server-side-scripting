var abstractRouter = require('./_abstractRouter');
var extend = require('extend');

var indexRouter = extend(abstractRouter, {
	initRouter: function() {

		this.router.get('/', function (req, res, next){
			res.render('index', this.data());
		}.bind(this));

		// A module always needs to export
		module.exports = this.router;
	},
	data: function() {

		var data = {
			title: 'Index',
			headerTitle: 'This is the index',
			menuItems: [
				{title: 'Home', hash: '/'}, 
				{title: 'Auto\'s', hash: 'cars'},
			]
		}

		return data;
	}
});

// Initialze init in abstract router
indexRouter.init();