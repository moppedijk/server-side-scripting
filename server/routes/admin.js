/*
 *	ROUTER VARIABLES
 */

var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var credentials = {
	username:'admin',
	password: '1234'
};

/*
 *	AUTHENTICATION
 *	Passport:
 *	https://orchestrate.io/blog/2014/06/26/build-user-authentication-with-node-js-express-passport-and-orchestrate/
 */

var auth = function (req, res, next) {
	// Authentication and Authorization Middleware
	// Authenticate with user id
  	if (req.session.admin && req.session.user === credentials.username) {
  		return next();
  	} else {
  		return res.sendStatus(401);
  	}
};

MongoClient.connect('mongodb://localhost:27017/serverSideScripting', function(err, db) {
  	if (err) {
  		console.log("mongodb not runnning...");
    	throw err;
  	} else {
  		console.log("mongodb runnning...");
  	}
});

/*
 *	ROUTER DEFINITIONS
 */

// Default route
router.get('/', function (req, res, next){
	res.render('admin/index', {
		title: 'Admin',
		headerTitle: 'SSS - Admin',
		menuItems: [
			{title: 'Home', hash: '/'}, 
			{title: 'Auto\'s', hash: 'cars'},
		]
	});
});

// Login endpoint
router.post('/login', function (req, res) {
  	if (!req.body.username || !req.body.password) {
    	res.redirect("admin");
  	} else if(req.body.username === credentials.username || req.body.password === credentials.password) {
  		// Authenticate with user id
	    req.session.user = credentials.username;
	    req.session.admin = true;
      res.redirect("dashboard");
  	}
});

// Logout endpoint
router.get('/logout', function (req, res) {
  	req.session.destroy();
  	res.send("logout success!");
});

// Get dashboard endpoint
router.get('/dashboard', auth, function (req, res) {

 	res.render('admin/dashboard');
});

/*
 *	FUNCTION DEFINITIONS
 */

// A module always needs to export something
module.exports = router;