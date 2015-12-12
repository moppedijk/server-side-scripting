var express = require('express');
var app = express();
var router = express.Router();
var carsData = [
	{
	brand: "Toyota",
	model: "Celica"
	},
	{
	brand: "Ferrari",
	model: "F40"
	},
	{
	brand: "Tesla",
	model: "X"
	},
	{
	brand: "BMW",
	model: "i118"
	},
	{
	brand: "Audi",
	model: "A4"
	}
];

router.get('/', function (req, res, next){
	res.render('cars', {
		title: 'Cars', 
		headerTitle: 'This is the cars page',
		menuItems: [
			{title: 'Home', hash: '/'}, 
			{title: 'Auto\'s', hash: 'cars'},
		],
		cars: [
			{
			brand: "Toyota",
			model: "Celica"
			},
			{
			brand: "Ferrari",
			model: "F40"
			},
			{
			brand: "Tesla",
			model: "X"
			},
			{
			brand: "BMW",
			model: "i118"
			},
			{
			brand: "Audi",
			model: "A4"
			}
		]
	});
});

router.use('/add', function (req, res, next){
	console.log('add car to legacy');
	next();
})

// A module always needs to export something
module.exports = router;