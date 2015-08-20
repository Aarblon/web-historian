var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helper');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var archivedUrl = req.url.split('/')[1];

  if(req.method === 'get') {
    if(req.url === '/') {
      httpHelper.serveAssets(res, './public/index.html', function(){

      })
      httpHelper.serveAssets(res, './public/styles.css', function(){

      })
    } else if(isUrlArchived(archivedUrl, function(exists) { return exists }) ) {
      httpHelper
    }

  }
  //check if req.method is a post
  if(req.method === 'post') {
    var body = '';
    //req.on('data') convert the chunk into a string
    req.on('data', function(chunk) {
      body += chunk;
    });
    //req.on('end')
    req.on('end', function(){
      //read the list of URLs
      //check to see if the submitted URL is in our list
      if(!archive.isUrlInList(body, function(urlArray){
        return _.contains(urlArray, body)
      })) {
        //if it is not in our list
        //add the submitted URL to our list
        archive.addUrlToList(body, function() {} );
        //serveAssets the loading.html
        httpHelper.serveAssets(res, './public/loading.html', function() {

        })
          // when the file is done being created
          // serveAssets the newly archived file
      } else {
        //serveAssets the archived file

      }

    })
  }
  res.end(archive.paths.list);
};
