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
			"aliases": ["Matthew Roberts"],
			"commits": {}
		},
		"Jeff Vandenberg": {
			"aliases": ["Jeff Vandenberg", "JeffVandenberg"],
			"commits": {}
		},
		"An Nguyen": {
			"aliases": ["An Nguyen", "an nguyen"],
			"commits": {}
		},
		"Eric Perser": {
			"aliases": ["Eric Perser"],
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
		title: 'Example JIRA Runner Report',
		query: "assignee IN (amina.mansour,c.matthew.roberts,dan.butler,agata.kargol,nadia.bahrami,c.jeff.brown,an.nguyen,jeff.vandenberg,eric.perser,c.erika.rudzis,c.ronel.fernandez) AND resolutiondate >= startOfYear() ORDER BY assignee ASC, resolutiondate ASC",
		options: {
			startAt: 0,
			maxResults: 100,
			fields: ['summary','description','issuetype','status','assignee','customfield_10013', 'resolutiondate']
		}
	},
	gitRepos: [
		'/Users/cory.sandahl/git/route_board',
	    '/Users/cory.sandahl/git/ansible-pupil',
	    '/Users/cory.sandahl/git/Rider-Verification',
	    '/Users/cory.sandahl/git/gtc',
	    '/Users/cory.sandahl/git/GTC4',
	    '/Users/cory.sandahl/git/gtc_db'
	]
}

module.exports = config;