var JiraApi = require('jira').JiraApi,
    utils = require('./utils.js'),
    fs = require('fs'),
    settings = require('./settings.js')
    reportConfig = process.argv[2];

var jira = new JiraApi('https', settings.apiSettings.url, null, settings.apiSettings.userName, settings.apiSettings.password, '2');

fs.readFile(reportConfig, 'utf8', function (err, JSFileContents) {    
    if (err) throw err;
    
    var config = eval(JSFileContents), resultCount = null, payload = settings.payloadObject;
    (function loop() {
        if (resultCount === null || parseInt(config.options.startAt) <= resultCount) {
            jira.searchJira(config.query, config.options, function(error, result) {
                if(error) {
                    console.log(error);
                } else {
                    resultCount = result.total;
                    payload.TotalResultCount = resultCount;
                    payload.Errors = result.Errors;
                    payload.Warnings = result.Warnings;
                    payload.Results.push.apply(payload.Results, result.issues);
                    config.options.startAt = parseInt(config.options.startAt) + parseInt(config.options.maxResults);
                    // console.log(config.options.startAt + ':' + resultCount);
                    loop();
                }
            });
        } else {
            config.callback(payload);
        }
    }());
});