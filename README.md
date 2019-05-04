# jira-runner

JIRA Runner is a simple node module that wraps an existing node JIRA client (https://github.com/steves/node-jira).  The wrapper exposes only executing JQL queries.  

**Note:** You will need provide your JIRA URL, user name and password (API Token provided by Atlassian) in **settings.js**.  

See [API Tokens](https://confluence.atlassian.com/cloud/api-tokens-938839638.html) for more information on creating your API token.

## Installation ##

  Install with the node package manager [npm](http://npmjs.org):

    $ npm install

## Example ##

The included **example.js** file is configured to find all issues where resolutiondate is greater than the start of current day:

  ```
  var utils = require('./utils.js'),
    reports = require('./reports.js')

  var config = {
    title: 'Example JIRA Runner Report',
    query: "resolutiondate >= startOfDay() ORDER BY resolutiondate ASC",
    options: {
      startAt: 0,
      maxResults: 100,
      fields: ['summary','issuetype','status','assignee','customfield_10013', 'resolutiondate']
    },
    callback: function(payload) {
      reports.workItemsStoryPointsByMonth(config, payload);
    }	
  }

  module.exports = config;
  ```
To run this report:

```node jiraRunner.js example.js```

The callback function can contain any valid JavaScript.  In the example above, the callback is executing an included report template **workItemsStoryPointsByMonth** that provides a summary by assignee plus a detail rollup by assignee and month.
