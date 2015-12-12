// Define app variables
var express = require('express'), 
	session = require('express-session'),
    bodyParser = require("body-parser"),
    mysql = require('mysql'),
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'moppedijk',
        password: 'UKbBu4QGDHVWZXBn',
        database: 'server_side_scripting',
        port: '8889'
    }),
	app = express();

// Required routes
var indexRouter = require('./routes/index'),
	carsRouter = require('./routes/cars'),
	adminRouter = require('./routes/admin');

connection.connect();

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

// Set template engine
app.set('views', './views');
app.set('view engine', 'jade');

// Static files directory
app.use(express.static('static'));

// User body parser for POST request
// Extended: true for querystring lib, false for qs lib
app.use(bodyParser.urlencoded({ extended: false }));

// Create session
app.use(session({
    secret: 'adjkn89234jnkdKioHIOJJKND9asd12ashjkf3nad',
    resave: true,
    saveUninitialized: true
}));

// Define routes
app.use('/', indexRouter);
app.use('/cars', carsRouter);
app.use('/admin', adminRouter);

// Start the server
var server = app.listen(3000, function () {
  	var host = server.address().address;
  	var port = server.address().port;

  	console.log('App listening at http://', host, port);
});