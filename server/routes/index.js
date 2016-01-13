/*
 *	ROUTER VARIABLES
 */

var config = require('../config'),
	express = require('express'),
	router = express.Router(),
	MongoClient = require('mongodb').MongoClient,
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
router.get('/', function (req, res, next){
	
	MongoClient.connect(connectionString, function(err, db) {
		if (err) {
			throw err;
		} else {
			db.collection('cars').find().toArray(function(err, result) {
				if (err) {
					throw err;
				} else {
					res.render('index', {
						title: 'SSS | Index',
						headerTitle: 'SSS',
						menuItems: [
							{title: 'Home', hash: '/', active: true}, 
							{title: 'Auto\'s', hash: 'cars'},
						],
						cars: result
					});
				}
			});
		}
	});
});

router.get('/:id', function (req, res, next) {
	console.log('Detail');
});
		
/*
 *	CUSTOM FUNCTIONS
 */

// A module always needs to export
module.exports = router;