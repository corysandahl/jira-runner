var config = {
	users: {
		"Alexander North": {
			"aliases": ["Alexander North", "Alex North"],
			"commits": {}
		},
		"Brandon Warren": {
			"aliases": ["Brandon Warren"],
			"commits": {}
		},
		"James Hutchison": {
			"aliases": ["James Hutchison", "JamesHutchison"],
			"commits": {}
		},
		"Michael Delaney": {
			"aliases": ["Michael Delaney","Mike Delaney","MikeDelaney"],
			"commits": {}
		},
		"Nathan Deren": {
			"aliases": ["Nathan Deren", "nathan.deren"],
			"commits": {}
		},
		"Parker Coleman": {
			"aliases": ["Parker Coleman", "parkercoleman"],
			"commits": {}
		},
		"Taylor Rolison": {
			"aliases": ["Taylor Rolison", "trolison", "taylor-rolison"],
			"commits": {}
		},
		"Tim Sweany": {
			"aliases": ["Tim Sweany", "Timothy Sweany"],
			"commits": {}
		},
		"Brian MacDonald": {
			"aliases": ["Brian MacDonald", "brian-macdonald-zonar", "c-brian-macdonald"],
			"commits": {}
		},
	},
	jiraConfig: {
		title: 'Example JIRA Runner Report',
		query: "assignee IN ('brian.macdonald','alexander.north','brandon.warren','James.Hutchison','michael.delaney','nathan.deren','parker.coleman','taylor.rolison', 'tim.sweany') AND resolutiondate >= startOfYear() ORDER BY assignee ASC, resolutiondate ASC",
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