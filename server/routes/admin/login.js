var extend = require('node.extend'),
    abstractRouter = require('./_abstractRouter');

var loginRouter = extend(true, {
	initRouter: function () {
		if (!this.req.body.username || !this.req.body.password) {
        	this.res.redirect("admin");
	    } else if(this.req.body.username === this.config.credentials.username || this.req.body.password === this.config.credentials.password) {
	        // Authenticate with user id
	        this.req.session.user = this.config.credentials.username;
	        this.req.session.admin = true;
	        this.res.redirect("dashboard");
	    }
	}
}, abstractRouter);

module.exports = loginRouter;