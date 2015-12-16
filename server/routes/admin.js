var abstractRouter = require('./_abstractRouter');
var extend = require('extend');

var adminRouter = extend(abstractRouter, {
	initRouter: function() {

		this.MongoClient.connect('mongodb://localhost:27017/serverSideScripting', function(err, db) {
		  	if (err) {
		  		console.log("mongodb not runnning...");
		    	throw err;
		  	} else {
		  		console.log("mongodb runnning...");
		  	}
		});

		this.credentials = {
			username:'admin',
			password: '1234'
		};

		this.auth = function (req, res, next) {
			// Authentication and Authorization Middleware

			// Authenticate with user id
		  	if (req.session.admin && req.session.user === this.credentials.username) {
		  		return next();
		  	} else {
		  		return res.sendStatus(401);
		  	}

		}.bind(this);

		// Default route
		this.router.get('/', function (req, res, next){
			res.render('admin/index', {
				title: 'Admin',
				headerTitle: 'SSS - Admin',
				menuItems: [
					{title: 'Home', hash: '/'}, 
					{title: 'Auto\'s', hash: 'cars'},
				]
			});
		}.bind(this));

		// Login endpoint
		this.router.post('/login', function (req, res) {
		  	if (!req.body.username || !req.body.password) {
		    	res.send('login failed');
		  	} else if(req.body.username === this.credentials.username || req.body.password === this.credentials.password) {
		  		// Authenticate with user id
			    req.session.user = this.credentials.username;
			    req.session.admin = true;
			    res.send("login success!");
		  	}
		}.bind(this));

		// Logout endpoint
		this.router.get('/logout', function (req, res) {
		  	req.session.destroy();
		  	res.send("logout success!");
		}.bind(this));

		// Get content endpoint
		this.router.get('/content', this.auth, function (req, res) {

		 	res.send("Content!");

		}.bind(this));

		// A module always needs to export something
		module.exports = this.router;
	}
});

adminRouter.init();