var utils = require('./utils.js'),
	reports = require('./reports.js'),
	_ = require('lodash');

var config = {
	title: 'Cory Kanban Report',
	query: "project = CORY and issuetype = Story ORDER BY created",
	options: {
		startAt: 0,
		maxResults: 100,
		fields: ['key','customfield_12121','customfield_10431','customfield_10430','summary','issuetype','status','created','resolutiondate']
	},
	callback: function(payload) {
		utils.reportHeader(config, payload);

		// Group By Assignee
		var status = _.groupBy(payload.Results, function(obj) {
			return obj.fields.status.name;
		});

		for (name in status) {
			console.log('  Items In Status \"' + name + '\"');
			console.log(' ', '-'.repeat(55));
			status[name].forEach(function(item) {
				console.log(
					utils.tableCell(' ', 3),
					utils.tableCell(item.key, 8),
					utils.tableCell(item.fields.created, 11),
					utils.tableCell(item.fields.status.name, 8),
					utils.tableCell(item.fields.summary, 50)
				)
			})
			console.log();
		}
	}	
}

module.exports = config;