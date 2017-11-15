var utils = require('./utils.js');

var users = 
{
	"Jeff Vandenberg": {
		"gitAliases": ["Jeff Vandenberg", "JeffVandenberg"],
		"jiraName": "jeff.vandenberg",
		"commits": {}
	},
	"An Nguyen": {
		"gitAliases": ["An Nguyen", "an nguyen"],
		"jiraName": "an.nguyen",
		"commits": {}
	},
	"Eric Perser": {
		"gitAliases": ["Eric Perser","wigglyworld"],
		"jiraName": "eric.perser",
		"commits": {}
	},
	"Ronel Fernandez": {
		"gitAliases": ["Ronel Fernandez"],
		"jiraName": "c.ronel.fernandez",
		"commits": {}
	},
	"Erika Rudzis": {
		"gitAliases": ["Erika Rudzis"],
		"jiraName": "erika.rudzis",
		"commits": {}
	},
	"Jerissa Lumansoc": {
		"gitAliases": ["Jerissa Lumansoc"],
		"jiraName": "c.jerissa.lumansoc",
		"commits": {}
	}
}

var config = {
	users: users,
	jiraConfig: {
		title: 'GTC POD - Since Beginning of 2017',
		// query: "assignee IN (" + utils.getJiraNames(users) + ") AND resolutiondate >= startOfYear() ORDER BY assignee ASC, resolutiondate ASC",
		query: "assignee IN (" + utils.getJiraNames(users) + ") AND resolutiondate >= '2017-08-01' ORDER BY assignee ASC, resolutiondate ASC",
		options: {
			startAt: 0,
			maxResults: 100,
			fields: ['summary','description','issuetype','status','assignee','customfield_10013', 'resolutiondate']
		}
	},
	gitRepos: [
	    '/Users/cory.sandahl/git/gtc',
	    '/Users/cory.sandahl/git/GTC4',
	    '/Users/cory.sandahl/git/gtc_db'
	]
}

module.exports = config;