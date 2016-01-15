/*
 *  APP VARIABLES
 */

var config = require('./config'),
    express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    app = express();

// Required routes
var indexRouter = require('./routes/index'),
    adminRouter = require('./routes/admin');

/*
 *  DEFINE TEMPLATE ENGINE
 */

app.set('views', './views');
app.set('view engine', 'jade');

/*
 *  DEFINE STATIC FOLDER
 */

app.use(express.static('public'));

/*
 *  DEFINE BODY PARSER
 */

app.use(bodyParser.urlencoded({
    extended: false 
}));

/*
 *  DEFINE SESSION
 */

app.use(session({
    secret: 'adjkn89234jnkdKioHIOJJKND9asd12ashjkf3nad',
    resave: true,
    saveUninitialized: true
}));

/*
 *  DEFINE ROUTES
 */

app.use('/', indexRouter);
app.use('/admin', adminRouter);

// Define 404

/*
 *  DEFINE SERVER
 */

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://', host, port);
});