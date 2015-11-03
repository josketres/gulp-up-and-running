'use strict';

var http = require('http'),
  retry = require('retry'),
  gutil = require('gulp-util'),
  Q = require('q');

function upAndRunning(options) {
  var deferred = Q.defer();
  gutil.log('Checking if', options.name, 'is up and listening to', gutil.colors.magenta(options.url));
  var operation = retry.operation(options.retry);
  operation.attempt(function () {
    process.stdout.write('.');
    http.get(options.url, function (response) {
      response.on('data', function () {
        // do nothing, this is needed to consume the request
      }).on('end', function () {
        if (response.statusCode === 200) {
          process.stdout.write('\n');
          gutil.log(gutil.colors.green(options.name, 'is up and running!'));
          deferred.resolve();
        } else {
          // no retry here it makes no sense
          deferred.reject(new Error('Unexpected status code: ' + response.statusCode));
        }
      }).on('error', function (e) {
        if (!operation.retry(e)) {
          process.stdout.write('\n');
          deferred.reject(operation.mainError());
        }
      });
    }).on('error', function (e) {
      if (!operation.retry(e)) {
        process.stdout.write('\n');
        deferred.reject(operation.mainError());
      }
    });
  });
  return deferred.promise;
}

module.exports = upAndRunning;