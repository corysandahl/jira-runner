var ejs = require('ejs'), 
  fs = require('fs'),
  path = __dirname + '/jiraGitSummary.ejs',
  str = fs.readFileSync(path, 'utf8'),
  utils = require('./utils.js'),
  _ = require('lodash'),
  configMaster = require(process.argv[3]),
  config = configMaster.jiraConfig,
  monthsMaster = []

var callback = function(payload) {

	console.log('JIRA payload received - processing GIT repos...')

	// ************************************************
	// Get the git commits
	// ************************************************

	var i = 0, commits = [];

	(function loop() {
	    if (i < configMaster.gitRepos.length) {
	    	console.log('Processing Git repo ' + configMaster.gitRepos[i]);
			require('simple-git')(configMaster.gitRepos[i])
				.pull()
				.log(function(err, log) {

				// Append repo name and display name
				log.all.forEach(function(commit) {
					commit.repo = configMaster.gitRepos[i];					
					for (name in configMaster.users) {
						configMaster.users[name].gitAliases.forEach(function(alias) {
							if (alias == commit.author_name) {
								commit.display_name = name;
							}
						})
					}
					commits.push(commit);
				})

	        	i++;
	        	loop();
			})
        } else {

			// ************************************************
			// Process both the JIRA and GIT Data
			// ************************************************

			// Group By Display Name
			var authors = _.groupBy(commits, function(obj) {
				return obj.display_name;
			});

			var gitDetails = {};

			// Group by Months
			for (name in authors) {
				var months = _.groupBy(authors[name], function(obj) {
					return obj.date.substring(0,7);
				})
				gitDetails[name] = months;
			}

			// Summarize commits
			for (name in configMaster.users) {
				for (month in gitDetails[name]) {
					if (configMaster.users.hasOwnProperty(name)) {
						configMaster.users[name].commits[month] = gitDetails[name][month].length;
					}
				}
			}

			summary = {}, results = payload.Results;

			results.forEach(function(item) {
				var monthString = item.fields.resolutiondate.substring(0,7);
				if (monthsMaster.indexOf(monthString) < 0) {
					monthsMaster.push(monthString);
				}
			})

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
							return obj.fields.customfield_10105;
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


			// console.log(JSON.stringify(configMaster, null, 4))
			// return;

			var ret = ejs.render(str, 
			{
			  monthsMaster: monthsMaster,
			  gitDetails: gitDetails,
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