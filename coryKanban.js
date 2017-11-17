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

		// Group By Status
		var status = _.groupBy(payload.Results, function(obj) {
			return obj.fields.status.name;
		});

		var statusOrder =  ['In Development', 'To Do', 'Done'];

		statusOrder.forEach(function(name) {
			console.log('  Status \"' + name + '\"');
			console.log(' ', '-'.repeat(55));
			status[name].forEach(function(item) {
				console.log(
					utils.tableCell(' ', 3),
					utils.tableCell(item.key, 8),
					utils.tableCell(item.fields.created, 11),
					utils.tableCell(item.fields.status.name, 7),
					utils.tableCell(item.fields.summary, 100)
				)
			})
			console.log();
		})
	}	
}

module.exports = config;