var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http-request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb){
  //open site.txt
  fs.readFile(exports.paths.list, function(err, data) {
    console.log(data.toString());
    console.log('====================================')
    var urlArray = data.toString().split('\n');
    console.log('urlArray: ', urlArray);
    return cb(urlArray);
  })
};

exports.isUrlInList = function(url, cb){
  var urlArray = exports.readListOfUrls(cb);
  return urlArray;
};

exports.addUrlToList = function(url, cb){
  fs.appendFile(exports.paths.list, url);
  exports.readListOfUrls(cb);
};

exports.isUrlArchived = function(url, cb){
  var exists = fs.readdir(exports.paths.archivedSites, function(err, files) {
    console.log('files array: ', files);
    console.log('url within isUrlArchived', url);
    console.log(_.contains(files, url));
    return _.contains(files, url)
  });

  return cb(exists);
};

//to be used by the worker
exports.downloadUrls = function(urlArray){
  urlArray = urlArray || exports.readListofUrls();
  console.log('urlArray: ', urlArray);
  //check each url to see if they are archived
  urlArray.forEach(function(url) {
    //if they aren't archived, we'll use http.get to create a file of the html
    console.log('each url in for each loop: ', url);
    if(!exports.isUrlArchived(url, function(exists) {
      console.log('existing url is: ', exists);
      return exists;
    })) {
      console.log('we made it inside of the if statement!')
      http.get({
        url: url,
        progress: function(current, total) {
          console.log('downloaded %d bytes from %d with url: ', current, total, url);
        }
      }, './archives/sites/' + url, function(err, res) {
        if(err) {
          console.error(err);
          return;
        }
        //console.log('responses: ', res.code, res.headers, res.buffer.toString());
      });
    }
  })
};
