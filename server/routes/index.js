/*
 *	ROUTER VARIABLES
 */

var config = require('../config'),
	express = require('express'),
	router = express.Router(),
	MongoClient = require('mongodb').MongoClient,
	MongoObjectId = require('mongodb').ObjectID,
 	connectionString = 'mongodb://';
	connectionString += config.database.host;
	connectionString += ':';
	connectionString += config.database.port;
	connectionString += '/';
	connectionString += config.database.name;

/*
 *	ROUTER DEFINITIONS
 */

// Default router
router.get('/', function (req, res, next) {
	
	MongoClient.connect(connectionString, function(err, db) {
		if (err) {
			throw err;
		} else {
			db.collection('cars').find().toArray(function(err, result) {
				if (err) {
					throw err;
				} else {
					res.render('index/index', {
						title: 'SSS | Index',
						headerTitle: 'SSS | Photo\'s',
						cars: result
					});
				}
			});
		}
	});
});

// Photo detail router
router.get('/photo/:id', function (req, res, next) {
	var id = req.params.id;
	var o_id = new MongoObjectId(id);

	MongoClient.connect(connectionString, function(err, db) {
		if (err) {
			throw err;
		} else {
			db.collection('cars').findOne({"_id" : o_id }, function(err, result) {
				if (err) {
					throw err;
				} else {
					var carData = result;

					// $where:
					db.collection('comments').find({"photoId": o_id}).toArray(function(err, result) {
						if (err) {
							throw err;
						} else {
							console.log(result);

							res.render('index/detail', {
								title: 'SSS | ' + carData.name,
								headerTitle: 'Back',
								car: carData,
								comments: result
							});
						};
					});
				};
			});
		};
	});
});

router.post('/comment', function (req, res, next) {
	var allValid = true;

	// validate input
	if(req.body.email == '')
		allValid = false;
	if(req.body.comment == '')
		allValid = false;
	if(req.body.id == '')
		allValid = false;

	if(allValid) {
		MongoClient.connect(connectionString, function(err, db) {
			if (err) {
				throw err;
			} else {
				
				var date = new Date();
				var data = {
					email: req.body.email,
					message: req.body.comment,
					photoId: req.body.id,
					timeStamp: date
				}

				db.collection('comments').insert(data, function(err, result) {
					if (err) {
						throw err;
					} else {
						res.redirect('/photo/' + req.body.id);
					}
				});
			}
		});
	} else {
		console.log("Error!");
	}
});
		
/*
 *	CUSTOM FUNCTIONS
 */

// A module always needs to export
module.exports = router;