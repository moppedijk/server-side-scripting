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
					console.log(result);

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

router.get('/photo/:id', function (req, res, next) {
	var id = req.params.id;
	var o_id = new MongoObjectId(id);

	MongoClient.connect(connectionString, function(err, db) {
		if (err) {
			throw err;
		} else {
			db.collection('cars').find({"_id" : o_id }).toArray(function(err, result) {
				if (err) {
					throw err;
				} else {
					res.render('index/detail', {
						title: 'SSS | ' + result[0].name,
						headerTitle: 'Back',
						cars: result
					});
				}
			});
		}
	});
});
		
/*
 *	CUSTOM FUNCTIONS
 */

// A module always needs to export
module.exports = router;