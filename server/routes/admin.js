/*
 *	ROUTER VARIABLES
 */

var config = require('../config'),
    fs = require('fs'),
    express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    im = require('imagemagick'),
    path = require('path'),
    MongoClient = require('mongodb').MongoClient,
    MongoObjectId = require('mongodb').ObjectID,
    connectionString = 'mongodb://';
    connectionString += config.database.host;
    connectionString += ':';
    connectionString += config.database.port;
    connectionString += '/';
    connectionString += config.database.name;

// Define upload dir
var upload = multer({dest: 'public/uploads/'});

/*
 *	AUTHENTICATION
 *	Passport:
 *	https://orchestrate.io/blog/2014/06/26/build-user-authentication-with-node-js-express-passport-and-orchestrate/
 */

 var auth = function (req, res, next) {
	// Authentication and Authorization Middleware
	// Authenticate with user id
    if (req.session.admin && req.session.user === config.credentials.username) {
        return next();
    } else {
        return res.redirect('/admin/');
    }
};

/*
 *	ROUTER DEFINITIONS
 */

// Default route
router.get('/', function (req, res, next){

    if (req.session.admin && req.session.user === config.credentials.username) {
        res.redirect('admin/dashboard');
    } else {
        res.render('admin/index', {
            title: 'Admin',
            headerTitle: 'SSS - Admin',
            menuItems: [
            {title: 'Home', hash: '/'}, 
            {title: 'Auto\'s', hash: 'cars'},
            ]
        });
    }
});

// Login router
router.post('/login', function (req, res) {
    if (!req.body.username || !req.body.password) {
        res.redirect("admin");
    } else if(req.body.username === config.credentials.username || req.body.password === config.credentials.password) {
        // Authenticate with user id
        req.session.user = config.credentials.username;
        req.session.admin = true;
        res.redirect("dashboard");
    }
});

// Logout router
router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect("/admin");
});

// Dashboard router
router.get('/dashboard', auth, function (req, res, next) {
    MongoClient.connect(connectionString, function(err, db) {
        if (err) {
            throw err;
        } else {
            db.collection('cars').find().toArray(function(err, result) {
                if (err) {
                    throw err;
                } else {
                    var msg = false;

                    if(req.query.message) {
                        msg = req.query.message;
                    }

                    res.render('admin/dashboard', {
                        message: msg,
                        cars: result
                    });
                }
            });
        }
    });

});

// Add router
router.get('/dashboard/add', auth, function (req, res, next) {
    var msg = false;

    if(req.query.message) {
        msg = req.query.message;
    }

    res.render('admin/add', {
        message: msg
    });
});

// Add new item router
router.post('/dashboard/add/new', upload.single('image'), auth, function (req, res, next) {
    var isValid = true;

    if(req.body.name == '')
        isValid = false
    if(req.body.price == '')
        isValid = false
    if(req.body.color == '')
        isValid = false
    if(req.file == undefined)
        isValid = false

    if(isValid) {

        var data = {
            name: req.body.name,
            price: req.body.price,
            color: req.body.color,
        }

        /*
         *  How does this work?
         */
        fs.rename(req.file.path, req.file.destination + req.file.originalname, function(err) {
            if(err) {
                throw err;
            } else {
                var parsedName = path.parse(req.file.originalname);
                var imageSmall = parsedName.name + '-small' + parsedName.ext;
                var imageLarge = parsedName.name + '-large' + parsedName.ext;
                var imageThumb = parsedName.name + '-thumb' + parsedName.ext;

                // Small Image
                im.resize( {
                    srcPath: req.file.destination + req.file.originalname,
                    dstPath: req.file.destination + imageSmall,
                    width: 350,
                    height: 350, 
                }, function(err, stdout, stderr) {
                    if (err) throw err;
                });

                // large image
                im.resize( {
                    srcPath: req.file.destination + req.file.originalname,
                    dstPath: req.file.destination + imageLarge,
                    width: 760
                }, function(err, stdout, stderr) {
                    if (err) throw err;
                });

                // thumb image
                im.resize( {
                    srcPath: req.file.destination + req.file.originalname,
                    dstPath: req.file.destination + imageThumb,
                    width: 40,
                    height:40,
                }, function(err, stdout, stderr) {
                    if (err) throw err;
                });

                data.imageSmall = imageSmall;
                data.imageLarge = imageLarge;
                data.imageThumb = imageThumb;
                data.image = req.file.originalname;
            }
        });

        MongoClient.connect(connectionString, function(err, db) {
            if (err) {
                throw err;
            } else {

                db.collection('cars').insertOne(data, function(err, result){
                    if(err) {
                        throw err;
                    } else {
                        res.redirect('/admin/dashboard/?message=' + 'New car added!');
                    }
                });
            }
        });

    } else {
        res.redirect('/admin/dashboard/add/?message=' + 'Please fillin the form');
    }

});

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