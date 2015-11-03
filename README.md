# gulp-up-and-running
[![npm version](https://badge.fury.io/js/gulp-up-and-running.svg)](https://badge.fury.io/js/gulp-up-and-running)

Gulp extension to wait until a webserver is up and running.

```javascript
var upAndRunning = require('gulp-up-and-running');
```

## API

### upAndRunning(options)
Returns an asynchronous promise that is resolved when the specified url returns an HTTP code 200. It is rejected after the retries limit is reached.

`options` is a JS object containing the following keys:
* `name`: The name of the webserver for logging purposes.
* `url`: The url that should be queried until an HTTP code 200 is returned or the retries limit is reached.
* `retry`: A JS object containing [node-retry timeout-options](https://github.com/tim-kos/node-retry/tree/0.6.0#retrytimeoutsoptions).

## Usage
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

 
