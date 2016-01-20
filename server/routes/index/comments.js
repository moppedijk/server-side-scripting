/*
 *	ROUTER VARIABLES
 */

var extend = require('node.extend'),
	abstractRouter = require('./_abstractRouter');

/*
 *	DETAIL ROUTER OBJECT
 */

var commentsRouter = extend(true, {
	initRouter: function () {
		this.addComment();
	},
	addComment: function () {
		var allValid = true;

		// validate input
		if(this.req.body.email == '')
			allValid = false;
		if(this.req.body.comment == '')
			allValid = false;
		if(this.req.body.id == '')
			allValid = false;

		if(allValid) {

			var comment = {
				email: this.req.body.email,
				comment: this.req.body.comment,
				photoId: this.req.body.id,
				timeStamp: new Date()
			}

			this.db.collection('comments').insert(comment, function(err, result) {
				this.onAddCommentComplete(err, result);
			}.bind(this));

		} else {
			console.log("Error!");
		}
	},
	onAddCommentComplete: function (err, result) {
		if (err) {
			throw err;
		} else {
			this.res.redirect('/photo/' + this.req.body.id);
		}
	}
}, abstractRouter);

// A module always needs to export
module.exports = commentsRouter;