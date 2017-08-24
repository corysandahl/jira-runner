var utils = {
    getJiraNames: function(users) {
        var names = [];
        for ( user in users ) { 
            names.push(users[user].jiraName);
        }
        return names.join();
    },
    objToCSV: function(obj) {
        var s = [];
        for (attr in obj) {
            s.push(obj[attr]);
        }
        return s.join(',');
    },
    reportHeader: function(config, result) { // header
        var num = 100,
            chr = '-',
            res = ''.concat(chr.repeat(num),'\n',
                '           Title: ',config.title,'\n',
                '           Query: ',config.query,'\n',
                '        DateTime: ',new Date().toString(),'\n',
                'TotalResultCount: ',result.TotalResultCount,'\n',
                chr.repeat(num),'\n');
        console.log(res);
    }, 
    out: function(title, value) {
    	console.log(''.concat('  ', title, ': ', value))
    },
    concat: function(str, target)
    {
        target += str;
        return target;
    },
    debug: function(obj) {
        console.log(JSON.stringify(obj, null, 4));
    },
    tableCell: function(str, len) {
        if (str == undefined || str == null) return '?';
        var cell = str.substring(0,len-1),
            rpt = (len > cell.length) ? (len - cell.length) : cell.length - len;
        return cell += ' '.repeat(rpt);
    }
}

module.exports = utils;