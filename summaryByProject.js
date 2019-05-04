var _ = require('lodash'),
	utils = require('./utils.js'),
	reports = require('./reports.js'),
	teams = require('./teams.js'),
	projects = ['DAS','RTB','GTC','RV'];
	

var config = {
	title: 'Work Items and Story Points Report - By Project / Month',
	query: "project IN (" + projects.toString() + ") AND resolutiondate >= startOfYear() ORDER BY project ASC, resolutiondate ASC",
	options: {
		startAt: 0,
		maxResults: 200,
		fields: ['summary','project','issuetype','status','customfield_10105', 'resolutiondate']
	},
	callback: function(payload) {
		// utils.debug(payload);
		reports.summaryByProject(config, payload);
	}	
}

module.exports = config;