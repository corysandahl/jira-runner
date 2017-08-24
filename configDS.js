var utils = require('./utils.js');

var users = 
{
	"Nathan Deren": {
		"gitAliases": ["Nathan Deren", "nathan.deren"],
		"email": "nderen@gmail.com",
		"jiraName": "nathan.deren",
		"commits": {}
	},
	"Parker Coleman": {
		"gitAliases": ["Parker Coleman", "parkercoleman"],
		"email": "	",
		"jiraName": "parker.coleman",
		"commits": {}
	},
	"Taylor Rolison": {
		"gitAliases": ["Taylor Rolison", "trolison", "taylor-rolison"],
		"email": "",
		"jiraName": "taylor.rolison",
		"commits": {}
	},
	"Tim Sweany": {
		"gitAliases": ["Tim Sweany", "Timothy Sweany"],
		"email": "",
		"jiraName": "tim.sweany",
		"commits": {}
	}
}

var config = {
	users: users,
	jiraConfig: {
		title: 'DS POD - Since Beginning of 2017',
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