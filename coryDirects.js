var _ = require('lodash'),
	utils = require('./utils.js'),
	reports = require('./reports.js'),
	assignees = [
	'amina.mansour',
	'matthew.roberts',
	'dan.butler',
	'agata.kargol',
	'nicole.peoples',
	'nadia.bahrami',
	'an.nguyen',
	'jeff.vandenberg',
	'eric.perser',
	'c.erika.rudzis',
	'c.jose.collas', 
	'c.ronel.fernandez'
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