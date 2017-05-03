# jira-runner

JIRA Runner is a simple node module that wraps a node JIRA client (https://github.com/steves/node-jira).  The wrapper exposes only the read operation and currently only supports executing JQL queries.  

**Note:** You will need provide Zonar URL, user name and password in **settings.js**.

## Installation ##

  Install with the node package manager [npm](http://npmjs.org):

    $ npm install

## Example ##

The included **example.js** file is configured to find all issues where resolutiondate is greater than the start of current day:

  ```
  var utils = require('./utils.js');

  var config = {
    title: 'Example JIRA Runner Report',
    query: "resolutiondate >= startOfDay() ORDER BY resolutiondate ASC",
    options: {
      startAt: 0,
      maxResults: 100,
      fields: ['summary','issuetype','status','assignee','customfield_10013', 'resolutiondate']
    },
    callback: function(payload) {
      utils.debug(payload);
    }	
  }

  module.exports = config;
  ```
To run this report:

```node jiraRunner.js example.js```

The callback function can contain any valid JavaScript.  In the example above, the callback is executing an included utility method "debug" that pretty prints the returned JSON document.
