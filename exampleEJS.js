var ejs = require('ejs'), 
  fs = require('fs'),
  path = __dirname + '/exampleEJS.ejs',
  str = fs.readFileSync(path, 'utf8'),
  utils = require('./utils.js'),
  _ = require('lodash'),
  configMaster = require(process.argv[3]),
  config = configMaster.jiraConfig;

var callback = function(payload) {

	console.log('JIRA payload received - processing GIT repos...')

	// ************************************************
	// Get the git commits
	// ************************************************

	var i = 0;		

	(function loop() {
        if (i < configMaster.gitRepos.length) {
        	console.log('Processing Git repo ' + configMaster.gitRepos[i]);
			require('simple-git')(configMaster.gitRepos[i])
				.pull()
				.log(function(err, log) {

				var customObj = {};

				// Group By Author
				var authors = _.groupBy(log.all, function(obj) {
					return obj.author_name;
				});

				// Group by Months
				for (name in authors) {
					var months = _.groupBy(authors[name], function(obj) {
						return obj.date.substring(0,7);
					})
					customObj[name] = months;
				}

				// Loop aliases and combine commit totals by month
				for (name in configMaster.users) {
					configMaster.users[name].aliases.forEach(function(alias) {
						for (month in customObj[alias]) {
							if (configMaster.users[name].commits.hasOwnProperty(month)) {
								configMaster.users[name].commits[month] += customObj[alias][month].length;
							} else {
								configMaster.users[name].commits[month] = customObj[alias][month].length;
							}
						}
					}) 
				}		
	        	i++;
	        	loop();
			})
        } else {

			// ************************************************
			// Process both the JIRA and GIT Data
			// ************************************************

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
				if (summary[name].storyPoints == undefined) summary[name].storyPoints = 0;
				var grp = _.groupBy(assignees[name], function(obj) {
					return obj.fields.resDate;
				})
				summary[name].details = grp;
			}

			// Summarize git commits and add to summary object
			for (name in configMaster.users) {
				if (summary[name] != undefined) {
					var sum = 0;
					for (month in summary[name].details) {
						if (typeof(configMaster.users[name].commits[month]) == "number") {
							sum += configMaster.users[name].commits[month];
						}
					}
					summary[name].commitTotals = sum;
				}
			}

			// ************************************************
			// Wrap it up in an object and send off to EJS land
			// ************************************************
			var ret = ejs.render(str, 
			{
			  commits: configMaster,
			  utils: utils,
			  summary: summary,
			  config: config,
			  filename: path,
			  _: _
			});
			console.log(ret);
        }
    }());
}	

config.callback = callback;

module.exports = config;