var config = {
	users: {
		"Nadia Bahrami": {
			"aliases": ["Nadia Bahrami", "nadiabahrami"],
			"commits": {}
		},
		"Agata Kargol": {
			"aliases": ["Agata Kargol", "aukargol"],
			"commits": {}
		},
		"Amina Mansour": {
			"aliases": ["amina.mansour","aminamansour"],
			"commits": {}
		},
		"Jeff Brown": {
			"aliases": ["Jeff Brown"],
			"commits": {}
		},
		"Dan Butler": {
			"aliases": ["Dan Butler"],
			"commits": {}
		},
		"Matthew Roberts": {
			"aliases": ["Matthew Roberts", "Matt Roberts"],
			"commits": {}
		}
	},
	jiraConfig: {
		title: 'Pupil POD - Since Beginning of 2017',
		query: "assignee IN (amina.mansour,c.matthew.roberts,dan.butler,agata.kargol,nadia.bahrami,c.jeff.brown) AND resolutiondate >= startOfYear() ORDER BY assignee ASC, resolutiondate ASC",
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