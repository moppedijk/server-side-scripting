var abstractRouter = {
	init:function() {
		this.express = require('express');
		this.router = this.express.Router();
		this.MongoClient = require('mongodb').MongoClient;

		// Call initRouter in child object
		this.initRouter();
	}
}

module.exports = abstractRouter;