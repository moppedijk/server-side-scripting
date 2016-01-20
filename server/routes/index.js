/*
 *	ROUTER VARIABLES
 */

var express = require('express'),
	router = express.Router();

/*
 *	ROUTER REQUIREMENTS
 */

var indexRouter = require('./index/index');
var detailRouter = require('./index/detail');
var commentsRouter = require('./index/comments');

/*
 *	ROUTER ENDPOINTS
 */

// Default router
router.get('/', function (req, res, next) {
	indexRouter.init(req, res, next);
});

// Photo detail router
router.get('/photo/:id', function (req, res, next) {
	detailRouter.init(req, res, next);
});

// Add comment router
router.post('/comment', function (req, res, next) {
	commentsRouter.init(req, res, next);
});

// A module always needs to export
module.exports = router;