var _ = require('lodash'),
	utils = require('./utils.js'),
	confluence = require('./confluence.js'),
	reports = require('./reports.js'),
	teams = require('./teams.js');

// manager = 'Cory';
manager = 'Sesh';
// manager = 'Leo';
// manager = 'Conner';
// manager = 'Jennifer';

var config = {
	query: "assignee in (" + teams[manager].toString() + ") AND resolutiondate >= startOfYear() ORDER BY resolutiondate ASC",
	options: {
		startAt: 0,
		maxResults: 100,
		fields: ['summary','issuetype','status','assignee','customfield_10013', 'resolutiondate']
	},
	callback: function(payload) {
		confluence.getContentByPageTitle('~cory.sandahl', 'JIRA Runner Reports', function(err, data) {

			var results = payload.Results, summary = {}, str = '';

			// Group By Assignee
			var assignees = _.groupBy(results, function(obj) {
				if (obj.fields.assignee) {
					return obj.fields.assignee.displayName;
				} else {
					return 'Unknown';
				}
			});

			for (name in assignees) {
				summary[name] = {
					workItems: assignees[name].length, 
					storyPoints: _.sumBy(assignees[name], 
						function(obj) { 
							if (obj.fields.customfield_10013) {
								return obj.fields.customfield_10013;
							} else {
								return 0;
							}
						})
				};
			}

			// Print Summary
			var title = '   Title: ' + manager + '\'s Directs - Current Year\n';
			console.log(title);

			str += title;
			str += 'Run Date: ' + new Date().toString() + '\n\n';
			str += 'SUMMARY\n\n';
			str += utils.tableCell('Name', 20) + utils.tableCell('Work Items'.toString(), 11) + utils.tableCell('Story Points'.toString(), 13) + '\n';
			str += '-'.repeat(45) + '\n';
			for (name in summary) {
				str += utils.tableCell(name, 20) 
				+ utils.tableCell(summary[name].workItems.toString(), 11) 
				+ utils.tableCell(summary[name].storyPoints.toString(), 13) + '\n'
			}

			var newVersion = parseInt(data.results[0].version.number) + 1;
			var space = '~cory.sandahl',
				id = '52695775',
				version = newVersion,
				title = 'JIRA Runner Reports',
				content = '<div style="background-color: gray; padding-left: 25px; padding-top: 25px; padding-bottom: 25px;"><pre style="color: white; font-family: courier new; font-size: 10pt;">' + str + '</pre></div>',
				callback = function (err, data) {
					console.log(data);
				}

			// console.log(content) 
			confluence.putContent(space,id,version,title,content,callback);
		})
	}	
}

module.exports = config;