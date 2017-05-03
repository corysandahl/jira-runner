var utils = require('./utils.js'),
	reports = require('./reports.js')

var config = {
	title: 'Example JIRA Runner Report',
	query: "resolutiondate >= startOfDay() ORDER BY resolutiondate ASC",
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