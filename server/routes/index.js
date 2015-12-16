var abstractRouter = require('./_abstractRouter');
var extend = require('extend');

var indexRouter = extend(abstractRouter, {
	initRouter: function() {

		this.router.get('/', function (req, res, next){
			res.render('index', this.getIndexData());
		}.bind(this));

		// A module always needs to export
		module.exports = this.router;
	},
	getIndexData: function() {

		var data = {
			title: 'SSS | Index',
			headerTitle: 'SSS',
			menuItems: [
				{title: 'Home', hash: '/', active: true}, 
				{title: 'Auto\'s', hash: 'cars'},
			]
		}

		return data;
	}
});

// Initialze init in abstract router
indexRouter.init();