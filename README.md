# gulp-up-and-running
[![npm version](https://badge.fury.io/js/gulp-up-and-running.svg)](https://badge.fury.io/js/gulp-up-and-running)

Gulp extension to wait until a webserver is up and running.

```javascript
var upAndRunning = require('gulp-up-and-running');

// waits until selenium is up-and-running
gulp.task('selenium-up-and-running', function() {
    return upAndRunning({
      name: 'selenium-server',
      url: 'http://localhost:4444/wd/hub/status',
      retry: {
        retries: 30,
        minTimeout: 1000,     // 1 second
        maxTimeout: 5 * 1000, // 5 seconds
        randomize: true
      }
    });
});

// you can start your end to end tests once selenium is up-and-running
gulp.task('e2e-tests', ['selenium-up-and-running'], function(){ 
  // some code to start your e2e tests here ...
});
```

 
