var settings = require('./settings.js'),
	Confluence = require('confluence-api'),
	config = {
	    username: settings.apiSettings.userName,
	    password: settings.apiSettings.password,
	    baseUrl:  settings.confluenceBaseURL
	};

module.exports = new Confluence(config);