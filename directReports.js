var _ = require('lodash'),
	utils = require('./utils.js'),
	reports = require('./reports.js'),
	teams = require('./teams.js');
	
const manager = 'Cory';
// const manager = 'Sesh';
// const manager = 'Leo';
// const manager = 'Conner';
// const manager = 'Jennifer';

var config = {
	title: 'Team ' + manager + ' - Work Items and Story Points Report - By Assignee / Month',
	query: "assignee IN (" + teams[manager].toString() + ") AND resolutiondate >= startOfYear() ORDER BY assignee ASC, resolutiondate ASC",
	// query: "assignee IN (" + teams[manager].toString() + ") AND resolutiondate >= startOfMonth() ORDER BY assignee ASC, resolutiondate ASC",
	options: {
		startAt: 0,
		maxResults: 100,
		fields: ['summary','issuetype','status','assignee','customfield_10013', 'resolutiondate']
	},
	callback: function(payload) {
		// utils.debug(payload);
		reports.workItemsStoryPointsByMonth(config, payload);
		// reports.workItemsStoryPointsByMonthCSV(config, payload);
	}	
}

module.exports = config;