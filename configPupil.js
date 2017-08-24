var utils = require('./utils.js');

var users = 
{
	"Nadia Bahrami": {
		"gitAliases": ["Nadia Bahrami", "nadiabahrami"],
		"jiraName": "nadia.bahrami",
		"commits": {},
	},
	"Agata Kargol": {
		"gitAliases": ["Agata Kargol", "aukargol"],
		"jiraName": "agata.kargol",
		"commits": {}
	},
	"Amina Mansour": {
		"gitAliases": ["amina.mansour","aminamansour"],
		"jiraName": "amina.mansour",
		"commits": {}
	},
	"Jeff Brown": {
		"gitAliases": ["Jeff Brown"],
		"jiraName": "c.jeff.brown",
		"commits": {}
	},
	"Dan Butler": {
		"gitAliases": ["Dan Butler"],
		"jiraName": "dan.butler",
		"commits": {}
	}
}

var config = {
	users: users,
	jiraConfig: {
		title: 'Pupil POD - Since Beginning of 2017',
		query: "assignee IN (" + utils.getJiraNames(users) + ") AND resolutiondate >= startOfYear() ORDER BY assignee ASC, resolutiondate ASC",
		options: {
			startAt: 0,
			maxResults: 100,
			fields: ['summary','description','issuetype','status','assignee','customfield_10013', 'resolutiondate']
		}
	},
	gitRepos: [
		'/Users/cory.sandahl/git/route_board',
	    '/Users/cory.sandahl/git/ansible-pupil',
	    '/Users/cory.sandahl/git/Rider-Verification'
	]
}

module.exports = config;