var extend = require('node.extend'),
    abstractRouter = require('./_abstractRouter');

var logoutRouter = extend(true, {
	initRouter: function () {
		this.req.session.destroy();
    	this.res.redirect("/admin");
	}
}, abstractRouter);

module.exports = logoutRouter;