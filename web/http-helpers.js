var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
exports.serveAssets = function(res, asset, statusCode, contentType) {
  var content = fs.createReadStream(asset);
  // var html = fs.readFile(asset, function(err, data) {
  //   return data.toString();
  // })
  exports.headers['Content-Type'] = contentType;
  res.writeHead(statusCode, exports.headers);
  content.pipe(res);
  content.on('finish', function() {
    res.end('complete');
  })


};



// As you progress, keep thinking about what helper functions you can put here!
