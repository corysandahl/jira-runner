var ejs = require('ejs')
  , fs = require('fs')
  , path = __dirname + '/exampleEJS.ejs'
  , str = fs.readFileSync(path, 'utf8')
  , utils = require('./utils.js')
  , reports = require('./reports.js')
  , _ = require('lodash');


var config = {
	title: 'Example JIRA Runner Report',
	query: "assignee IN (amina.mansour,c.matthew.roberts,dan.butler,agata.kargol,nadia.bahrami,c.jeff.brown,an.nguyen,jeff.vandenberg,eric.perser,c.erika.rudzis,c.ronel.fernandez) AND resolutiondate >= startOfYear() ORDER BY assignee ASC, resolutiondate ASC",
	options: {
		startAt: 0,
		maxResults: 100,
		fields: ['summary','description','issuetype','status','assignee','customfield_10013', 'resolutiondate']
	},
	callback: function(payload) {

		summary = {}, results = payload.Results;

		// Set resDate (2017-06 for example)
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

		// Create Summary by Assignee and Group By resDate for details
		for (name in assignees) {
			summary[name] = {
				workItems: assignees[name].length, 
				storyPoints: _.sumBy(assignees[name], 
					function(obj) { 
						return obj.fields.customfield_10013;
					})
			};
			var grp = _.groupBy(assignees[name], function(obj) {
				return obj.fields.resDate;
			})
			summary[name].details = grp;			
		}
		
		var ret = ejs.render(str, 
		{
		  utils: utils,
		  summary: summary,
		  config: config,
		  filename: path,
		  _: _
		});
		console.log(ret);
	}	
}

module.exports = config;