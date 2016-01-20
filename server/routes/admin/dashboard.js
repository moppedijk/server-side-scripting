var extend = require('node.extend'),
    abstractRouter = require('./_abstractRouter');

var dashboardRouter = extend(true, {
	data: {},
	initRouter: function () {
        this._fetchCars();
	},
	_fetchCars:function () {
		this.db.collection('cars').find().toArray(function(err, result) {
            this._onFetchCarsComplete(err, result);
        }.bind(this));
	},
	_onFetchCarsComplete: function (err, result) {
		if (err) {
            throw err;
        } else {
        	this.data = result;
            this._render();
        }
	},
	_render: function () {
		var msg = false;

        if(this.req.query.message) {
            msg = this.req.query.message;
        }

        this.res.render('admin/dashboard', {
            message: msg,
            cars: this.data
        });
	}

}, abstractRouter);

module.exports = dashboardRouter;