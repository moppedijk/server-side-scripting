/*
 *	ROUTER VARIABLES
 */

var extend = require('node.extend'),
	abstractRouter = require('./_abstractRouter');

/*
 *	DETAIL ROUTER OBJECT
 */

var detailRouter = extend(true, {
	data: {},
	initRouter: function () {
		this._fetchCar();
	},
	/*
	 *	Fetch car function
	 *	This function does a query to the mongodb
	 *	and try's to find one car document
	 */
	_fetchCar: function () {
		// Create mongo id object for query
		var oId = new this.MongoObjectId(this.req.params.id);

		// Do query to mongodb
		this.db.collection('cars').findOne({"_id": oId}, function(err, result) {
			// Call onComplete function
			this._onFetchCarComplete(err, result);
		}.bind(this));
	},
	/*
	 *	On complete fetch car function
	 *	This function handles the callback function
	 *	of the fetch car function
	 */
	_onFetchCarComplete: function (err, result) {
		if (err) {
			throw err;
		} else {
			// Add car data to date object
			this.data.car = result;
			// Fetch car comments
			this._fetchComments();
		}
	},
	/*
	 *	Fetch comments function
	 * 	This function does a query to the mongodb
	 *	and try's to find all comments equal to photoId
	 */
	_fetchComments: function () {
		// Do query to mongodb
		this.db.collection('comments').find({
			"photoId": {
				$eq: this.req.params.id
			}
		}).toArray( function(err, result) {
			// Call onComplete function
			this._onFetchCommentsComplete(err, result);
		}.bind(this));
	},
	/*
	 *	On complete function for fetch comments
	 *	This function handles the callback function
	 *	of the fetch comments function
	 */
	_onFetchCommentsComplete: function (err, result) {
		if (err) {
			throw err;
		} else {
			// Add comments to data object
			this.data.comments = result;
			// Render view
			this._render();
		}
	},
	/*
	 *	Render function
	 * 	This function renders the data with the view
	 */
	_render: function () {
		this.data.headerTitle = 'Back';
		this.data.title = 'SSS | ' + this.data.car.name;
		this.res.render('index/detail', this.data);
	}
}, abstractRouter);

// A module always needs to export
module.exports = detailRouter;