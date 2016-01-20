/*
 *	ROUTER VARIABLES
 */

var extend = require('node.extend'),
	abstractRouter = require('./_abstractRouter');

/*
 *	DETAIL ROUTER OBJECT
 */

var indexRouter = extend(true, {
	data: {},
	initRouter: function () {
		this._fetchCars();
	},
	_fetchCars: function () {
		this.db.collection('cars').find().toArray(function(err, result) {
			this._onFetchCarsComplete(err, result);
		}.bind(this));
	},
	_onFetchCarsComplete: function (err, result) {
		if (err) {
			throw err;
		} else {
			this.data.cars = result;
			this._render();
		}
	},
	_render: function (req, res, next) {
		this.data.title = 'SSS | Index';
		this.data.headerTitle = 'SSS | Photo\'s';

		this.res.render('index/index', this.data);
	}
}, abstractRouter);

// A module always needs to export
module.exports = indexRouter;