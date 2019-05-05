# jira-runner

JIRA Runner is a simple Node.js module that provides JQL querying of the JIRA Rest API.  This module wraps an existing node JIRA client (https://github.com/steves/node-jira). 

## Installation ##

  Install with the node package manager [npm](http://npmjs.org):

    $ npm install

  You will need to change the *url, userName and password* Api property settings in **settings.js** in order to connect to your JIRA instance.
  ```
     apiSettings: {
        url: 'mycompany.atlassian.net',
        userName: 'myJiraUserName',
        password: '<API Token>'
    },
  ```
*See [API Tokens](https://confluence.atlassian.com/cloud/api-tokens-938839638.html) for more information on creating your API token.*

## Example ##

The included **example.js** report configuration file returns all JIRA issues where resolutiondate is greater than the start of current day:

  ```
  var utils = require('./utils.js'),
    reports = require('./reports.js')

  var config = {
    title: 'Example JIRA Runner Report',
    query: "resolutiondate >= startOfDay() ORDER BY resolutiondate ASC",
    options: {
      startAt: 0,
      maxResults: 100,
      fields: ['summary','issuetype','status','assignee','customfield_10105','resolutiondate']
    },
    callback: function(payload) {
      reports.workItemsStoryPointsByMonth(config, payload);
    }	
  }

  module.exports = config;
  ```
There are 3 important properties of a report configuration object:

**query**
```
    query: "resolutiondate >= startOfDay() ORDER BY resolutiondate ASC",
```
This property defines the JQL that is passed along and executed by JIRA.

**fields**
```
      fields: ['summary','issuetype','status','assignee','customfield_10105','resolutiondate']
```
This property tells JIRA which fields to return under the fields property of the returned issue.

**callback**
```
    callback: function(payload) {
      // Can be any valid JavaScript
      reports.workItemsStoryPointsByMonth(config, payload);
    }	
```
This property contains the callback, or the code that does something with the returned records.  It can be any valid JavaScript.  In the example above, the callback passes both the report configuration and resulting payload to a JavaScript function workItemsStoryPointsByMonth that provides both a summary and detailed view of JIRA items by assignee by month. 

To run this file:

```node jiraRunner.js example.js```
