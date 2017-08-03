var config = {
	users: {
		"Jeff Vandenberg": {
			"aliases": ["Jeff Vandenberg", "JeffVandenberg"],
			"commits": {}
		},
		"An Nguyen": {
			"aliases": ["An Nguyen", "an nguyen"],
			"commits": {}
		},
		"Eric Perser": {
			"aliases": ["Eric Perser","wigglyworld"],
			"commits": {}
		},
		"Ronel Fernandez": {
			"aliases": ["Ronel Fernandez"],
			"commits": {}
		},
		"Erika Rudzis": {
			"aliases": ["Erika Rudzis"],
			"commits": {}
		}
	},
	jiraConfig: {
		title: 'GTC POD - Since Beginning of 2017',
		query: "assignee IN (an.nguyen,jeff.vandenberg,eric.perser,c.erika.rudzis,c.ronel.fernandez) AND resolutiondate >= startOfYear() ORDER BY assignee ASC, resolutiondate ASC",
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