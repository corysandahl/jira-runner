var _ = require('lodash'),
	reports = require('./reports.js'),
	utils = require('./utils.js');

var config = {
	title: 'Work Items and Story Points Report - By Project / Month',
	query: "resolutiondate >= startOfDay() ORDER BY project ASC",
	options: {
		startAt: 0,
		maxResults: 200,
		fields: ['summary','issuetype','status','project', 'assignee','customfield_10013', 'resolutiondate']
	},
	callback: function(payload) {

		utils.reportHeader(config, payload);
		var summary = {};

		var projects = _.groupBy(payload.Results, function (obj) {
			return (obj.fields.project.name);
		})

		for (project in projects) {
			// store in summary object
			summary[project] = {
				workItems: projects[project].length, 
				storyPoints: _.sumBy(projects[project], 
					function(obj) { 
						return obj.fields.customfield_10013;
					})
			};
		}

		// Print Summary
		console.log('\nSUMMARY\n')
		console.log(utils.tableCell('Name', 40), 
			utils.tableCell('Work Items'.toString(), 11), 
			utils.tableCell('Story Points'.toString(), 13));
		console.log('-'.repeat(65));
		for (name in summary) {
			console.log(utils.tableCell(name, 40), 
				utils.tableCell(summary[name].workItems.toString(), 11), 
				(summary[name].storyPoints) ? utils.tableCell(summary[name].storyPoints.toString(), 13) : 0);
		}

		console.log('\n\nDETAILS\n')

		payload.Results.forEach(function(item) {
			item.fields.resMonth = item.fields.resolutiondate.substring(0,7);
		})

		for (project in projects) {

			var projectTotals = 'work items: [' + summary[name].workItems + '] sum points: [' + summary[name].storyPoints + ']';
			console.log();
			console.log('-'.repeat(100));
			console.log(project + ' ' + projectTotals);
			console.log('-'.repeat(100));

			var months = _.groupBy(projects[project], function(obj) {
				return obj.fields.resMonth;
			})
			
			for (month in months) {

				console.log('\n  ' + month + ' work items: [' + months[month].length + '] sum points: [' + _.sumBy(months[month], function(obj) { return obj.fields.customfield_10013}) + ']\n');
				var l = {key: 18, assignee: 20, type: 10, points: 8, resMonth: 13, summary: 85};
				console.log('         '.concat(
					utils.tableCell('key', l.key), 
					utils.tableCell('assignee', l.assignee),
					utils.tableCell('type', l.type),
					utils.tableCell('points', l.points),
					utils.tableCell('resMonth', l.resMonth),
					utils.tableCell('summary', l.summary)
				));
				console.log('         ' + '-'.repeat(91))

				months[month].forEach(function(item) {
					var points = (item.fields.customfield_10013) ? item.fields.customfield_10013.toString() : 'null',
						assignee = (item.fields.assignee) ? item.fields.assignee.name : 'Unknown';
					console.log('         '.concat(
						utils.tableCell(item.key, l.key), 
						utils.tableCell(assignee, l.assignee), 
						utils.tableCell(item.fields.issuetype.name, l.type),
						utils.tableCell(points, l.points),
						utils.tableCell(item.fields.resolutiondate.substring(0,10), l.resMonth),
						utils.tableCell(item.fields.summary, l.summary)
					));
				})
				console.log();

			}
		}
	}	
}

module.exports = config;