var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers.js');
var _ = require('underscore');

// require more modules/folders here!
var contentType = {
  html: "text/html",
  css: "text/css"
};

exports.handleRequest = function (req, res) {
  var archivedUrl = req.url.split('/')[1];
  console.log("This is before our if statements: ", req.method === 'GET', req.url);
  if(req.method === 'GET') {
    if(req.url === '/') {
      console.log("url: ", req.url)
      httpHelper.serveAssets(res, './public/index.html', 200, contentType.html);
    } else if(req.url === '/styles.css') {
      console.log("url: ", req.url)
      httpHelper.serveAssets(res, './public/styles.css', 200, contentType.css);
    } else if(archive.isUrlArchived(archivedUrl, function(exists) { return exists }) ) {
      var asset = archive.paths.archivedSites + req.url;
      httpHelper.serveAssets(res, asset, 200, contentType.html);
    } else {
      var error = archive.paths.archivedSites + '/error';
      httpHelper.serveAssets(res, error, 404, contentType.html)
    }
  }
  // check if req.method is a post
  if(req.method === 'POST') {
    var body = '';
    //req.on('data') convert the chunk into a string
    req.on('data', function(chunk) {
      console.log("I'm in data and I am a chunk: ", chunk.toString())
      body += chunk;
      console.log("This is the body when inside data: ", body);
    });
    // body = body.split('undefinedurl=')[1];
    // console.log("body is: ", body);
    //req.on('end')
    req.on('end', function(){
      body = body.split('url=')[1];
      console.log('this is the body inside of end: ', body)
      //read the list of URLs
      //check to see if the submitted URL is in our list
      if(!archive.isUrlInList(body, function(urlArray){
        return _.contains(urlArray, body)
      })) {
        //if it is not in our list
        //add the submitted URL to our list
        archive.addUrlToList(body, function() {} );
        //serveAssets the loading.html
        httpHelper.serveAssets(res, './public/loading.html', 201, contentType.html)
          // when the file is done being created
          // serveAssets the newly archived file
      } else {
        //serveAssets the archived file
        var archivedUrl = archive.paths.archivedSites + '/' + body;
        serveAssets(res, archivedUrl, 201, contentType.html);
      }
    })
  }
  // res.end('test');
};
