var utils = require('./utils.js');

var users = 
{
	"Alexander North": {
		"gitAliases": ["Alexander North", "Alex North"],
		"email": "alexander.north@zonarsystems.com",
		"jiraName": "alexander.north",
		"commits": {}
	},
	"Brandon Warren": {
		"gitAliases": ["Brandon Warren"],
		"email": "brandon.warren@zonarsystems.com",
		"jiraName": "brandon.warren",
		"commits": {}
	},
	"Brian MacDonald": {
		"gitAliases": ["Brian MacDonald", "brian-macdonald-zonar", "c-brian-macdonald"],
		"email": "",
		"jiraName": "brian.macdonald",
		"commits": {}
	},
	"James Hutchison": {
		"gitAliases": ["James Hutchison", "JamesHutchison"],
		"email": "james.hutchison@zonarsystems.com",
		"jiraName": "James.Hutchison",
		"commits": {}
	},
	"Michael Delaney": {
		"gitAliases": ["Michael Delaney","Mike Delaney","MikeDelaney"],
		"email": "mdelaney@utexas.edu",
		"jiraName": "michael.delaney",
		"commits": {}
	}
}

var config = {
	users: users,
	jiraConfig: {
		title: 'OEM POD - Since Beginning of 2017',
		query: "assignee IN (" + utils.getJiraNames(users) + ") AND resolutiondate >= startOfYear() ORDER BY assignee ASC, resolutiondate ASC",
		options: {
			startAt: 0,
			maxResults: 100,
			fields: ['summary','description','issuetype','status','assignee','customfield_10013', 'resolutiondate']
		}
	},
	gitRepos: [
		'/Users/cory.sandahl/git/yeti', 
		'/Users/cory.sandahl/git/zvt', 
		'/Users/cory.sandahl/git/PLOW', 
		'/Users/cory.sandahl/git/hardware-api', 
		'/Users/cory.sandahl/git/honeybadger', 
		'/Users/cory.sandahl/git/cobra', 
		'/Users/cory.sandahl/git/data-pipeline', 
		'/Users/cory.sandahl/git/data-pump', 
		'/Users/cory.sandahl/git/data_dump', 
		'/Users/cory.sandahl/git/tempo', 
		'/Users/cory.sandahl/git/zonar-data-service', 
		'/Users/cory.sandahl/git/gtc_db' 	
	]
}

module.exports = config;