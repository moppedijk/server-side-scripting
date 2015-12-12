var express = require('express'),
	router = express.Router();

var credentials = {
		username:'admin',
		password: '1234'
	}

// Authentication and Authorization Middleware
var auth = function(req, res, next) {
  	if (req.session && req.session.user === credentials.username && req.session.admin)
    	return next();
  	else
       	return res.sendStatus(401);
};

// Default route
router.get('/', function (req, res, next){
	res.render('admin/index', {
		title: 'Admin',
		headerTitle: 'Please login for the admin panel',
		menuItems: [
			{title: 'Home', hash: '/'}, 
			{title: 'Auto\'s', hash: 'cars'},
		]
	});
});

// Login endpoint
router.post('/login', function (req, res) {
  	if (!req.body.username || !req.body.password) {
    	res.send('login failed');
  	} else if(req.body.username === credentials.username || req.body.password === credentials.password) {
	    req.session.user = credentials.username;
	    req.session.admin = true;
	    res.send("login success!");
  	}
});

// Logout endpoint
router.get('/logout', function (req, res) {
  	req.session.destroy();
  	res.send("logout success!");
});

// Get content endpoint
router.get('/content', auth, function (req, res) {
    res.send("You can only see this after you've logged in.");
});

// A module always needs to export something
module.exports = router;