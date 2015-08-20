var archive = require('../helpers/archive-helpers.js');
var CronJob = require('cron').CronJob;

module.exports = function() {
  var job = new CronJob({
    cronTime: '* 1 * * * *',
    onTick: function() {
      console.log('CronJob be cronnin\'');
      archive.downloadUrls();
    },
    start: true,
    timeZone: "America/Chicago"
  });
  job.start();
}

// For good measure
// ==========

//     var CronJob = require('cron').CronJob;
//     var job = new CronJob({
//       cronTime: '00 30 11 * * 1-5',
//       onTick: function() {
//         // Runs every weekday (Monday through Friday)
//         // at 11:30:00 AM. It does not run on Saturday
//         // or Sunday.
//       },
//       start: false,
//       timeZone: "America/Los_Angeles"
//     });
//     job.start();

// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.



//archive-helper functions used:
//  downloadURLs
//
