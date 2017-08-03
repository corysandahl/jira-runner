var config = {
	users: {
		"Nathan Deren": {
			"aliases": ["Nathan Deren", "nathan.deren"],
			"email": "nderen@gmail.com",
			"commits": {}
		},
		"Parker Coleman": {
			"aliases": ["Parker Coleman", "parkercoleman"],
			"email": "	",
			"commits": {}
		},
		"Taylor Rolison": {
			"aliases": ["Taylor Rolison", "trolison", "taylor-rolison"],
			"email": "",
			"commits": {}
		},
		"Tim Sweany": {
			"aliases": ["Tim Sweany", "Timothy Sweany"],
			"email": "",
			"commits": {}
		},
	},
	jiraConfig: {
		title: 'DS POD - Since Beginning of 2017',
		query: "assignee IN ('nathan.deren','parker.coleman','taylor.rolison', 'tim.sweany') AND resolutiondate >= startOfYear() ORDER BY assignee ASC, resolutiondate ASC",
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