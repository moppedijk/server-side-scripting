var abstractRouter = {
	init:function() {
		this.express = require('express');
		this.router = this.express.Router();

		this.initRouter();
	}
}

module.exports = abstractRouter;