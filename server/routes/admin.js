/*
 *	ROUTER VARIABLES
 */

// var config = require('../config'),
//     fs = require('fs'),
//     express = require('express'),
//     router = express.Router(),
//     multer = require('multer'),
//     im = require('imagemagick'),
//     path = require('path'),
//     MongoClient = require('mongodb').MongoClient,
//     MongoObjectId = require('mongodb').ObjectID,
//     connectionString = 'mongodb://';
//     connectionString += config.database.host;
//     connectionString += ':';
//     connectionString += config.database.port;
//     connectionString += '/';
//     connectionString += config.database.name;

// Define upload dir
// var upload = multer({dest: 'public/uploads/'});

/*
 *	AUTHENTICATION
 *	Passport:
 *	https://orchestrate.io/blog/2014/06/26/build-user-authentication-with-node-js-express-passport-and-orchestrate/
 */

//  var auth = function (req, res, next) {
// 	// Authentication and Authorization Middleware
//     if (req.session.admin && req.session.user === config.credentials.username) {
//         return next();
//     } else {
//         return res.redirect('/admin/');
//     }
// };

/*
 *	ROUTER DEFINITIONS
 */

var indexRouter = require('./admin/index');
// var loginRouter = require('./admin/login');
// var logoutRouter = require('./admin/logout');
// var dashboardRouter = require('./admin/dashboard');
// var addRouter = require('./admin/add');
// var addNewRouter = require('./admin/addNew');

 // Default route
router.get('/', function (req, res, next){
    indexRouter.init(req, res, next);
});

// Login router
// router.post('/login', function (req, res, next) {
//     loginRouter.init(req, res, next);
// });

// // Logout router
// router.get('/logout', function (req, res, next) {
//     logoutRouter.init(req, res, next);
// });

// // Dashboard router
// router.get('/dashboard', auth, function (req, res, next) {
//     dashboardRouter.init(req, res, next);
// });

// // Add router
// router.get('/dashboard/add', auth, function (req, res, next) {
//     addRouter.init(req, res, next);
// });

// Add new item router
// router.post('/dashboard/add/new', upload.single('image'), auth, function (req, res, next) {
//     addNewRouter.init(req, res, next);
// });

// Edit item router
router.get('/dashboard/edit/:id', auth, function (req, res, next) {
    var id = req.params.id;
    var o_id = new MongoObjectId(id);

    // Check if mongodb connection is possible
    MongoClient.connect(connectionString, function(err, db) {
        if (err) {
            throw err;
        } else {
            // Get cars document
            db.collection('cars').findOne({"_id" : o_id }, function(err, result) {
                if (err) {
                    throw err;
                } else {
                    var msg = false;

                    if(req.query.message) {
                        msg = req.query.message;
                    }

                    res.render('admin/edit', {
                        message: msg,
                        car: result
                    });
                };
            });
        };
    });
});

// Edit item router
router.post('/dashboard/edit/item', upload.single('image'), auth, function (req, res, next) {
    
});

// Delete item router
router.get('/dashboard/delete/:id', auth, function (req, res, next) {
    var id = req.params.id;
    var o_id = new MongoObjectId(id);

    // Check if mongodb connection is possible
    MongoClient.connect(connectionString, function(err, db) {
        if (err) {
            throw err;
        } else {
            // Get cars document
            // Change to findOne();
            db.collection('cars').find({"_id" : o_id }).toArray(function(err, result) {
                if (err) {
                    throw err;
                } else {
                    var uploadDir = 'public/uploads/';
                    // inlink image
                    if(result[0].image)
                        deleteImage(uploadDir + result[0].image);
                    // unlink small image
                    if(result[0].imageSmall)
                        deleteImage(uploadDir + result[0].imageSmall);
                    // unlink large image
                    if(result[0].imageLarge)
                        deleteImage(uploadDir + result[0].imageLarge);
                    // unlink thumb image
                    if(result[0].imageThumb)
                        deleteImage(uploadDir + result[0].imageThumb);

                    // remove document
                    db.collection('cars').removeOne({"_id": o_id}, function(err, result){
                        if(err) {
                            throw err;
                        } else {
                            var message = 'Car with id: ' + id + ' deleted!'; 
                            res.redirect('/admin/dashboard/?message=' + message);
                        }
                    });
                }
            });
        }
    });
});

/*
 *	FUNCTION DEFINITIONS
 */

// Remove image
function deleteImage (imageUrl) {
    fs.unlink(imageUrl, function(err) {
        if (err) throw err;
    });
}

// A module always needs to export something
module.exports = router;