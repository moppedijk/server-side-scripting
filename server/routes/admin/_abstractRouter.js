var config = require('../../config'),
	fs = require('fs'),
	im = require('imagemagick'),
	path = require('path'),
	MongoClient = require('mongodb').MongoClient,
	MongoObjectId = require('mongodb').ObjectID,
 	connectionString = 'mongodb://';
	connectionString += config.database.host;
	connectionString += ':';
	connectionString += config.database.port;
	connectionString += '/';
	connectionString += config.database.name;

var _abstractRouter = {
	MongoClient: MongoClient,
	MongoObjectId: MongoObjectId,
	fs: fs,
	im: im,
	path: path,
	config: config,
	/*
	 *	Initialize function
	 *	This function checks the mongodb connection
	 *	and calls an error or fetch cars function
	 */
	init: function (req, res, next) {
		this.req = req;
		this.res = res;
		this.next = next;

		// Check connection
		this.MongoClient.connect(connectionString, function(err, db) {
			if (err) {
				throw err;
			} else {
				// Add db var to detailRouter object
				this.db = db;

				if(this.initRouter) {
					this.initRouter();
				}else {
					console.log("initRouter not defined!");
				}
			}
		}.bind(this));
	}
};

module.exports = _abstractRouter;