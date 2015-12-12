var server = {

    /*
     *  Initialize function for servers
     *  sets all server variables  
     */

    init: function() {
        // Define app variables
        this.express = require('express');
        this.session = require('express-session');
        this.bodyParser = require("body-parser");
        this.app = this.express();

        // Required routes
        this.indexRouter = require('./routes/index');
        this.carsRouter = require('./routes/cars');
        this.adminRouter = require('./routes/admin');

        // Set template engine
        this.app.set('views', './views');
        this.app.set('view engine', 'jade');

        // Static files directory
        this.app.use(this.express.static('static'));

        // User body parser for POST request
        // Extended: true for querystring lib, false for qs lib
        this.app.use(this.bodyParser.urlencoded({ 
            extended: false 
        }));

        // Create session
        this.app.use(this.session({
            secret: 'adjkn89234jnkdKioHIOJJKND9asd12ashjkf3nad',
            resave: true,
            saveUninitialized: true
        }));

        // Define routes
        this.app.use('/', this.indexRouter);
        this.app.use('/cars', this.carsRouter);
        this.app.use('/admin', this.adminRouter);

        // Start server
        this.startServer();
    },

    /*
     *  Start server function which starts the server
     */
    startServer: function() {
        // Start the server
        var server = this.app.listen(3000, function () {
            var host = server.address().address;
            var port = server.address().port;

            console.log('App listening at http://', host, port);
        });
    }
}

// Initialze server
server.init();