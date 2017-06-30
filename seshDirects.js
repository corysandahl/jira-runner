var _ = require('lodash'),
	reports = require('./reports.js'),
	utils = require('./utils.js'),
	assignees = [
		'alexander.north',
		'brandon.warren', 
		'James.Hutchison', 
		'michael.delaney', 
		'nathan.deren', 
		'parker.coleman', 
		'taylor.rolison', 
		'tim.sweany', 	
]

var config = {
	title: 'Work Items and Story Points Report since the beginning of 2017 - By Assignee / Month',
	query: "assignee IN (" + assignees.toString() + ") AND resolutiondate >= startOfYear() ORDER BY resolutiondate ASC",
	options: {
		startAt: 0,
		maxResults: 100,
		fields: ['summary','issuetype','status','assignee','customfield_10013', 'resolutiondate']
	},
	callback: function(payload) {
		reports.workItemsStoryPointsByMonth(config, payload);
	}	
}

module.exports = config;