// Inheritance of an abstract router

var express = require('express');
var app = express();
var router = express.Router();

router.get('/', function (req, res, next){
	res.render('index', {
		title: 'Index',
		headerTitle: 'This is the index',
		menuItems: [
			{title: 'Home', hash: '/'}, 
			{title: 'Auto\'s', hash: 'cars'},
		]
	});
});

// A module always needs to export something
module.exports = router;