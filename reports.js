var _ = require('lodash'),
	utils = require('./utils.js'),

reports = {

	workItemsStoryPointsByMonth: function (config, payload) {

		utils.reportHeader(config, payload);
		summary = {};
		results = payload.Results;

		// Set resDate for all
		results.forEach(function(item) {
			if (item.fields.resolutiondate) {
				item.fields.resDate = item.fields.resolutiondate.substring(0,7);
			}
		})

		// Group By Assignee
		var assignees = _.groupBy(results, function(obj) {
			if (obj.fields.assignee) {
				return obj.fields.assignee.displayName;
			} else {
				return 'Unknown';
			}
		});

		for (name in assignees) {
			// store in summary object
			summary[name] = {
				workItems: assignees[name].length, 
				storyPoints: _.sumBy(assignees[name], 
					function(obj) { 
						return obj.fields.customfield_10013;
					})
			};
		}

		// Print Summary
		console.log('\nSUMMARY\n')
		console.log(utils.tableCell('Name', 20), 
			utils.tableCell('Work Items'.toString(), 11), 
			utils.tableCell('Story Points'.toString(), 13));
		console.log('-'.repeat(45));
		for (name in summary) {
			console.log(utils.tableCell(name, 20), 
				utils.tableCell(summary[name].workItems.toString(), 11), 
				(summary[name].storyPoints) ? utils.tableCell(summary[name].storyPoints.toString(), 13) : 0);
		}

		console.log('\n\nDETAILS')
		
		// For Each Assignee, Group By resDate
		for (name in assignees) {
			var grp = _.groupBy(assignees[name], function(obj) {
				return obj.fields.resDate;
			})

			var assigneeTotals = '- WORK ITEMS: [' + summary[name].workItems + ']- SUM POINTS: [' + summary[name].storyPoints + ']';
			console.log();
			console.log('-'.repeat(100));
			console.log(name + ' ' + assigneeTotals);
			console.log('-'.repeat(100));
			
			for (date in grp) {
				console.log('\nMONTH: ' + date + ' - WORK ITEMS: [' + grp[date].length + '] - SUM POINTS: [' + _.sumBy(grp[date], function(obj) { return obj.fields.customfield_10013}) + ']\n');
				var l = {key: 18, type: 10, points: 8, resdate: 13, summary: 85};
				console.log('    '.concat(
					utils.tableCell('key', l.key), 
					utils.tableCell('type', l.type),
					utils.tableCell('points', l.points),
					utils.tableCell('resdate', l.resdate),
					utils.tableCell('summary', l.summary)
				));
				console.log('    ' + '-'.repeat(96))

				grp[date].forEach(function(item) {
					var points = (item.fields.customfield_10013) ? item.fields.customfield_10013.toString() : 'null';
					console.log('    '.concat(
						utils.tableCell(item.key, l.key), 
						utils.tableCell(item.fields.issuetype.name, l.type),
						utils.tableCell(points, l.points),
						utils.tableCell(item.fields.resolutiondate.substring(0,10), l.resdate),
						utils.tableCell(item.fields.summary, l.summary)
					));
				})
				console.log();
			}
		}
	}
}

module.exports = reports;
