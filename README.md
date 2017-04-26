# jira-runner

JIRA Runner is a simple node module that wraps a node JIRA client (https://github.com/steves/node-jira).  The wrapper exposes only the read operation and currently only supports executing JQL queries.  

You will need provide Zonar URL, user name and password in settings.js.

## Installation ##

  Install with the node package manager [npm](http://npmjs.org):

    $ npm install

## Example ##

Find all issues where resolutiondate is greater than the start of current day.

  ~~~~var utils = require('./utils.js'),
    reports = require('./reports.js')

  ~~~~var config = {
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

  ~~~~module.exports = config;

