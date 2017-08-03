var config = {
	users: {
		"Alexander North": {
			"aliases": ["Alexander North", "Alex North"],
			"email": "alexander.north@zonarsystems.com",
			"commits": {}
		},
		"Brandon Warren": {
			"aliases": ["Brandon Warren"],
			"email": "brandon.warren@zonarsystems.com",
			"commits": {}
		},
		"Brian MacDonald": {
			"aliases": ["Brian MacDonald", "brian-macdonald-zonar", "c-brian-macdonald"],
			"email": "",
			"commits": {}
		},
		"James Hutchison": {
			"aliases": ["James Hutchison", "JamesHutchison"],
			"email": "james.hutchison@zonarsystems.com",
			"commits": {}
		},
		"Michael Delaney": {
			"aliases": ["Michael Delaney","Mike Delaney","MikeDelaney"],
			"email": "mdelaney@utexas.edu",
			"commits": {}
		},
	},
	jiraConfig: {
		title: 'OEM POD - Since Beginning of 2017',
		query: "assignee IN ('brian.macdonald','alexander.north','brandon.warren','James.Hutchison','michael.delaney') AND resolutiondate >= startOfYear() ORDER BY assignee ASC, resolutiondate ASC",
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