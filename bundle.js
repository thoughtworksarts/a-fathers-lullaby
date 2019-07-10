(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
/*
* loglevel - https://github.com/pimterry/loglevel
*
* Copyright (c) 2013 Tim Perry
* Licensed under the MIT license.
*/
(function (root, definition) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        define(definition);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = definition();
    } else {
        root.log = definition();
    }
}(this, function () {
    "use strict";
    var noop = function() {};
    var undefinedType = "undefined";

    function realMethod(methodName) {
        if (typeof console === undefinedType) {
            return false; // We can't build a real method without a console to log to
        } else if (console[methodName] !== undefined) {
            return bindMethod(console, methodName);
        } else if (console.log !== undefined) {
            return bindMethod(console, 'log');
        } else {
            return noop;
        }
    }

    function bindMethod(obj, methodName) {
        var method = obj[methodName];
        if (typeof method.bind === 'function') {
            return method.bind(obj);
        } else {
            try {
                return Function.prototype.bind.call(method, obj);
            } catch (e) {
                // Missing bind shim or IE8 + Modernizr, fallback to wrapping
                return function() {
                    return Function.prototype.apply.apply(method, [obj, arguments]);
                };
            }
        }
    }

    // these private functions always need `this` to be set properly

    function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
        return function () {
            if (typeof console !== undefinedType) {
                replaceLoggingMethods.call(this, level, loggerName);
                this[methodName].apply(this, arguments);
            }
        };
    }

    function replaceLoggingMethods(level, loggerName) {
        /*jshint validthis:true */
        for (var i = 0; i < logMethods.length; i++) {
            var methodName = logMethods[i];
            this[methodName] = (i < level) ?
                noop :
                this.methodFactory(methodName, level, loggerName);
        }
    }

    function defaultMethodFactory(methodName, level, loggerName) {
        /*jshint validthis:true */
        return realMethod(methodName) ||
               enableLoggingWhenConsoleArrives.apply(this, arguments);
    }

    var logMethods = [
        "trace",
        "debug",
        "info",
        "warn",
        "error"
    ];

    function Logger(name, defaultLevel, factory) {
      var self = this;
      var currentLevel;
      var storageKey = "loglevel";
      if (name) {
        storageKey += ":" + name;
      }

      function persistLevelIfPossible(levelNum) {
          var levelName = (logMethods[levelNum] || 'silent').toUpperCase();

          // Use localStorage if available
          try {
              window.localStorage[storageKey] = levelName;
              return;
          } catch (ignore) {}

          // Use session cookie as fallback
          try {
              window.document.cookie =
                encodeURIComponent(storageKey) + "=" + levelName + ";";
          } catch (ignore) {}
      }

      function getPersistedLevel() {
          var storedLevel;

          try {
              storedLevel = window.localStorage[storageKey];
          } catch (ignore) {}

          if (typeof storedLevel === undefinedType) {
              try {
                  var cookie = window.document.cookie;
                  var location = cookie.indexOf(
                      encodeURIComponent(storageKey) + "=");
                  if (location) {
                      storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
                  }
              } catch (ignore) {}
          }

          // If the stored level is not valid, treat it as if nothing was stored.
          if (self.levels[storedLevel] === undefined) {
              storedLevel = undefined;
          }

          return storedLevel;
      }

      /*
       *
       * Public API
       *
       */

      self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,
          "ERROR": 4, "SILENT": 5};

      self.methodFactory = factory || defaultMethodFactory;

      self.getLevel = function () {
          return currentLevel;
      };

      self.setLevel = function (level, persist) {
          if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
              level = self.levels[level.toUpperCase()];
          }
          if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
              currentLevel = level;
              if (persist !== false) {  // defaults to true
                  persistLevelIfPossible(level);
              }
              replaceLoggingMethods.call(self, level, name);
              if (typeof console === undefinedType && level < self.levels.SILENT) {
                  return "No console available for logging";
              }
          } else {
              throw "log.setLevel() called with invalid level: " + level;
          }
      };

      self.setDefaultLevel = function (level) {
          if (!getPersistedLevel()) {
              self.setLevel(level, false);
          }
      };

      self.enableAll = function(persist) {
          self.setLevel(self.levels.TRACE, persist);
      };

      self.disableAll = function(persist) {
          self.setLevel(self.levels.SILENT, persist);
      };

      // Initialize with the right level
      var initialLevel = getPersistedLevel();
      if (initialLevel == null) {
          initialLevel = defaultLevel == null ? "WARN" : defaultLevel;
      }
      self.setLevel(initialLevel, false);
    }

    /*
     *
     * Package-level API
     *
     */

    var defaultLogger = new Logger();

    var _loggersByName = {};
    defaultLogger.getLogger = function getLogger(name) {
        if (typeof name !== "string" || name === "") {
          throw new TypeError("You must supply a name when creating a logger.");
        }

        var logger = _loggersByName[name];
        if (!logger) {
          logger = _loggersByName[name] = new Logger(
            name, defaultLogger.getLevel(), defaultLogger.methodFactory);
        }
        return logger;
    };

    // Grab the current global log variable in case of overwrite
    var _log = (typeof window !== undefinedType) ? window.log : undefined;
    defaultLogger.noConflict = function() {
        if (typeof window !== undefinedType &&
               window.log === defaultLogger) {
            window.log = _log;
        }

        return defaultLogger;
    };

    return defaultLogger;
}));

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApiClient = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _shims = require("./shims");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Handles HTTP interactions with the Roundware API server, v2.
// NOTE: Every HTTP method except ".get()" will cause most browsers to issue a preflight requirements check to the server via the OPTIONS verb,
// to verify CORS will allow the response to load in the browser. Sometimes this OPTIONS call can get obscured in debugging tools.
// @see http://roundware.org/docs/terminology/index.html
var ApiClient = exports.ApiClient = function () {
  /** Create a new ApiClient
   * @param {Object} window - representing the context in which we are executing - provides reference to window.jQuery.ajax()
   * @param {String} baseServerUrl - identifies the Roundware server to receive API requests
   * @param {Boolean} [options.fetch = fetch] - for testing purposes, you can inject the fetch mechanism to use for making network requests **/
  function ApiClient(window, baseServerUrl) {
    _classCallCheck(this, ApiClient);

    this._jQuery = window.jQuery;
    this._serverUrl = baseServerUrl;
  }

  /** Make a GET request to the Roundware server
   * @param {String} path - the path for your API request, such as "/streams/"
   * @param {Object} options - see the "send" method
   * @see {send} **/


  _createClass(ApiClient, [{
    key: "get",
    value: function get(path, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      options.method = "GET";
      options.contentType = 'x-www-form-urlencoded';
      return this.send(path, data, options);
    }

    /** Make a POST request to the Roundware server
     * @param {String} path - the path for your API request, such as "/streams/"
     * @param {Object} options - see the "send" method
     * @see {send} **/

  }, {
    key: "post",
    value: function post(path, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      options.method = "POST";
      return this.send(path, data, options);
    }

    /** Make a PATCH request to the Roundware server
     * @param {String} path - the path for your API request, such as "/streams/"
     * @param {Object} options - see the "send" method
     * @see {send} **/

  }, {
    key: "patch",
    value: function patch(path, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      options.method = "PATCH";
      return this.send(path, data, options);
    }

    /** Transmit an Ajax request to the Roundware API. Note that the Roundware Server expects paths to end with a trailing slash: /sessions/ instead of /sessions
     * @param path {string} - identifies the endpoint to receive the request
     * @param data {object} - the payload to send
     * @param options {object} - any additional options to add to the Ajax request
     * @return {Promise} - will resolve or reject depending on the status of the request
     * @todo might be a good place to implement exponential retry of certain types of errors
     * **/

  }, {
    key: "send",
    value: function send(path, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var url = this._serverUrl + path;

      options = Object.assign({}, options);

      if (!options.timeout) {
        options.timeout = 30000; // 30 seconds, arbitrary
      }

      // If you specify a contentType, we assume you already have formatted your data
      if (options.contentType === 'multipart/form-data') {
        // multipart/form-data requires special treatment with jquery.ajax
        // in order to properly format the POST data
        options.data = data;
        options.contentType = false;
      } else if (options.contentType === 'x-www-form-urlencoded') {
        options.data = data;
      } else {
        // If you don't specify a contentType, we assume you want us to convert your payload to JSON
        options.contentType = 'application/json';
        options.data = JSON.stringify(data);
      }

      options.mode = "no-cors";

      var deferred = this._jQuery.Deferred();

      var promise = deferred.promise();

      this._jQuery.ajax(url, options).then(function (data) {
        return deferred.resolve(data);
      }).fail(function (jqXHR, textStatus, errorThrown) {
        var techMsg = textStatus + ": " + errorThrown;
        var usrMsg = "We were unable to contact the audio server due to a network problem; please try again: '" + techMsg + "'";
        _shims.logger.error(techMsg, jqXHR);
        deferred.reject(usrMsg);
      });

      return promise;
    }

    /** Set the authorization token to use as the header for future API requests. Most Roundware API calls require an auth token to be set.
     * @param {String} authToken - characters to use in the authorization header **/

  }, {
    key: "setAuthToken",
    value: function setAuthToken(authToken) {
      this._jQuery.ajaxSetup({
        headers: { "Authorization": "token " + authToken }
      });
    }
  }]);

  return ApiClient;
}();
},{"./shims":10}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Asset = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _shims = require("./shims");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var projectId, apiClient;

var Asset = exports.Asset = function () {
  function Asset(newProjectId, options) {
    _classCallCheck(this, Asset);

    projectId = newProjectId;
    apiClient = options.apiClient;
  }

  _createClass(Asset, [{
    key: "toString",
    value: function toString() {
      return "Roundware Assets '" + projectName + "' (#" + projectId + ")";
    }
  }, {
    key: "connect",
    value: function connect() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var path = "/assets/";
      // add project_id to any incoming filter data
      data['project_id'] = projectId;

      return apiClient.get(path, data).then(function connectionSuccess(data) {
        return data;
      });
    }
  }]);

  return Asset;
}();
},{"./shims":10}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Envelope = exports.Envelope = function () {
  /** Create an Envelope
   * @param {number} sessionId - identifies the session associated with this asset
   * @param {ApiClient} apiClient - the API client object to use for server API calls
   * @param {geoPosition} geoPosition -
   **/
  function Envelope(sessionId, apiClient, geoPosition) {
    _classCallCheck(this, Envelope);

    this._envelopeId = "(unknown)";
    this._sessionId = sessionId;
    this._apiClient = apiClient;
    this._geoPosition = geoPosition;
  }

  /** @returns {String} human-readable representation of this asset **/


  _createClass(Envelope, [{
    key: "toString",
    value: function toString() {
      return "Envelope " + this._assetId;
    }

    /** Create a new Envelope in the server to which we can attach audio recordings as assets
     * @returns {Promise} represents the pending API call **/

  }, {
    key: "connect",
    value: function connect() {
      var _this = this;

      var data = {
        session_id: this._sessionId
      };

      return this._apiClient.post("/envelopes/", data).then(function (data) {
        _this._envelopeId = data.id;
      });
    }

    /** Sends an audio file to the server
     * @param {blob} audioData
     * @param {string} fileName - name of the file
     * @return {Promise} - represents the API call */

  }, {
    key: "upload",
    value: function upload(audioData, fileName) {
      var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (!this._envelopeId) {
        return Promise.reject("cannot upload audio without first connecting this envelope to the server");
      }

      var formData = new FormData();
      var coordinates = this._geoPosition.getLastCoords();
      console.log(coordinates);

      formData.append('session_id', this._sessionId);
      formData.append('file', audioData);
      formData.append('latitude', coordinates.latitude);
      formData.append('longitude', coordinates.longitude);

      if ('tag_ids' in data) {
        formData.append('tag_ids', data.tag_ids);
      }

      var path = "/envelopes/" + this._envelopeId + "/";

      console.info("Uploading " + fileName + " to envelope " + path);

      var options = {
        contentType: 'multipart/form-data',
        processData: false
      };

      return this._apiClient.patch(path, formData, options).then(function (data) {
        console.info("UPLOADDATA", data);
      });
    }
  }]);

  return Envelope;
}();
},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeoPosition = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _shims = require("./shims");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var initialGeoTimeoutSeconds = 1;

var defaultCoords = {
  latitude: 1,
  longitude: 1
};

// for an initial rapid, low-accuracy position
var fastGeolocationPositionOptions = {
  enableHighAccuracy: false,
  timeout: initialGeoTimeoutSeconds
};

// subsequent position monitoring should be high-accuracy
var accurateGeolocationPositionOptions = {
  enableHighAccuracy: true
};

/** Responsible for tracking the user's position, when geo listening is enabled and the browser is capable
 * @property {Boolean} geoListenEnabled - whether or not the geo positioning system is enabled and available
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation **/

var GeoPosition = exports.GeoPosition = function () {
  /** Create a new GeoPosition.
   * @param {Object} navigator - provides access to geolocation system
   * @param {Object} options - parameters for initializing this GeoPosition
   * @param {Boolean} [options.geoListenEnabled = false] - whether or not to attempt to use geolocation **/
  function GeoPosition(navigator) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, GeoPosition);

    this._navigator = navigator;
    this._initialGeolocationPromise = Promise.resolve(defaultCoords);
    this._lastCoords = defaultCoords;

    if (this._navigator.geolocation && options.geoListenEnabled) {
      this.geoListenEnabled = true;
    } else {
      this.geoListenEnabled = false;
    }
  }

  /** @return {String} Human-readable representation of this GeoPosition **/


  _createClass(GeoPosition, [{
    key: "toString",
    value: function toString() {
      return "GeoPosition (enabled: " + this.geoListenEnabled + ")";
    }

    /** @return {Object} coordinates - last known coordinates received from the geolocation system (defaults to latitude 1, longitude 1) **/

  }, {
    key: "getLastCoords",
    value: function getLastCoords() {
      return this._lastCoords;
    }

    /** Attempts to get an initial rough geographic location for the listener, then sets up a callback
     * to update the position.
     * @param {Function} geoUpdateCallback - object that should receive geolocation coordinate updates
     * @see geoListenEnabled **/

  }, {
    key: "connect",
    value: function connect() {
      var _this = this;

      var geoUpdateCallback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

      if (!this.geoListenEnabled) {
        _shims.logger.info("Geolocation disabled");
        this._initialGeolocationPromise = Promise.resolve({});
        return;
      }

      _shims.logger.info("Initializing geolocation system");

      this._initialGeolocationPromise = new Promise(function (resolve, reject) {
        _this._navigator.geolocation.getCurrentPosition(function (initialPosition) {
          var coords = initialPosition.coords;
          _shims.logger.info("Received initial geolocation", coords);
          geoUpdateCallback(coords);
          _this._lastCoords = coords;

          var geoWatchId = _this._navigator.geolocation.watchPosition(function (updatedPosition) {
            var newCoords = updatedPosition.coords;
            geoUpdateCallback(newCoords);
            _this._lastCoords = coords;
          }, function (error) {
            _shims.logger.warn("Unable to watch position: " + error.message + " (code #" + error.code + ")");
          }, accurateGeolocationPositionOptions);

          _shims.logger.info("Monitoring geoposition updates (watch ID " + geoWatchId + ")");
          resolve(coords);
        }, function initialGeoError(error) {
          _shims.logger.warn("Unable to get initial geolocation: " + error.message + " (code #" + error.code + ")");
          resolve(defaultCoords);
        }, fastGeolocationPositionOptions);
      });
    }

    /** Allows you to wait on the progress of the .connect() behavior, attempting to get an initial
     * estimate of the user's position. Note that this promise will never fail - if we cannot get an
     * accurate estimate, we fall back to default coordinates (currently latitude 1, longitude 1)
     * @return {Promise} Represents the attempt to get an initial estimate of the user's position **/

  }, {
    key: "waitForInitialGeolocation",
    value: function waitForInitialGeolocation() {
      return this._initialGeolocationPromise;
    }
  }]);

  return GeoPosition;
}();
},{"./shims":10}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Project = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _shims = require("./shims");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var projectId, apiClient;
var projectName = "(unknown)";
var pubDate, audioFormat, recordingRadius, location, geoListenEnabled;

var Project = exports.Project = function () {
  function Project(newProjectId, options) {
    _classCallCheck(this, Project);

    projectId = newProjectId;
    apiClient = options.apiClient;
  }

  _createClass(Project, [{
    key: "toString",
    value: function toString() {
      return "Roundware Project '" + projectName + "' (#" + projectId + ")";
    }

    // getRecordingRadius() {
    //   return recordingRadius;
    // }

  }, {
    key: "connect",
    value: function connect(sessionId) {
      var path = "/projects/" + projectId + "/";

      var data = {
        session_id: sessionId
      };

      var that = this;

      return apiClient.get(path, data).then(function connectionSuccess(data) {
        projectName = data.name;
        pubDate = data.pub_date;
        audioFormat = data.audio_format;
        that.recordingRadius = data.recording_radius;
        that.location = { "latitude": data.latitude,
          "longitude": data.longitude };
        that.maxRecordingLength = data.max_recording_length;
        return sessionId;
      });
    }
  }, {
    key: "uiconfig",
    value: function uiconfig(sessionId) {
      var path = "/projects/" + projectId + "/uiconfig/";

      var data = {
        session_id: sessionId
      };

      return apiClient.get(path, data).then(function connectionSuccess(data) {
        // let this._uiConfig = data;
        return data;
      });
    }
  }]);

  return Project;
}();
},{"./shims":10}],8:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _project = require("./project");

var _session = require("./session");

var _speaker = require("./speaker");

var _geoPosition = require("./geo-position");

var _stream = require("./stream");

var _asset = require("./asset");

var _shims = require("./shims");

var _apiClient = require("./api-client");

var _user = require("./user");

var _envelope = require("./envelope");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** This class is the primary integration point between Roundware's server and your application
    NOTE that we depend on jQuery being injected, because we use its $.ajax function. As browsers
    evolve and the whatwg-fetch polyfill evolves, we may be able to switch over to using window.fetch

   @example
   var roundwareServerUrl = "http://localhost:8888/api/2";
   var roundwareProjectId = 1;

   var roundware = new Roundware(window,{
     serverUrl: roundwareServerUrl,
     projectId: roundwareProjectId
   });

   function ready() {
     console.info("Connected to Roundware Server. Ready to play.");
     // this is a good place to initialize audio player controls, etc.
   }

   // Generally we throw user-friendly messages and log a more technical message
   function handleError(userErrMsg) {
     console.error("Roundware Error: " + userErrMsg);
   }

  roundware.connect().
    then(ready).
    catch(handleError);

  function startListening(streamURL) {
    console.info("Loading " + streamURL);
    // good place to connect your audio player to the audio stream
  }

  roundware.play(startListening).catch(handleError);
**/
var Roundware = function () {
  /** Initialize a new Roundware instance
   * @param {Object} window - representing the context in which we are executing - provides references to window.navigator, window.console, etc.
   * @param {Object} options - Collection of parameters for configuring this Roundware instance
   * @param {String} options.serverUrl - identifies the Roundware server
   * @param {Number} options.projectId - identifies the Roundware project to connect
   * @param {Boolean} options.geoListenEnabled - whether or not to attempt to initialize geolocation-based listening
   * @throws Will throw an error if serveUrl or projectId are missing **/
  function Roundware(window) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Roundware);

    this._serverUrl = options.serverUrl;
    this._projectId = options.projectId;
    this._speakerFilters = options.speakerFilters;
    this._assetFilters = options.assetFilters;

    if (this._serverUrl === undefined) {
      throw "Roundware objects must be initialized with a serverUrl";
    }

    if (this._projectId === undefined) {
      throw "Roundware objects must be initialized with a projectId";
    }

    this._apiClient = new _apiClient.ApiClient(window, this._serverUrl);
    options.apiClient = this._apiClient;

    var navigator = window.navigator;

    this._user = options.user || new _user.User(options);
    this._geoPosition = options.geoPosition || new _geoPosition.GeoPosition(navigator, options);
    this._session = options.session || new _session.Session(navigator, this._projectId, this._geoPosition.geoListenEnabled, options);
    this._project = options.project || new _project.Project(this._projectId, options);
    this._stream = options.stream || new _stream.Stream(options);
    this._speaker = options.speaker || new _speaker.Speaker(this._projectId, options);
    this._asset = options.asset || new _asset.Asset(this._projectId, options);
  }

  /** Initiate a connection to Roundware
   *  @return {Promise} - Can be resolved in order to get the audio stream URL, or rejected to get an error message; see example above **/


  _createClass(Roundware, [{
    key: "connect",
    value: function connect() {
      var _this = this;

      var that = this;

      this._geoPosition.connect(function (newCoords) {
        // want to start this process as soon as possible, as it can take a few seconds
        that._stream.update(newCoords);
      });

      _shims.logger.info("Initializing Roundware for project ID #" + this._projectId);

      return this._user.connect().then(this._session.connect).then(function (sessionId) {
        return _this._project.connect(sessionId);
      }).then(function (sessionId) {
        return _this._sessionId = sessionId;
      }).then(this._project.uiconfig).then(function (uiConfig) {
        return _this._uiConfig = uiConfig;
      }).then(function (data) {
        return _this._speaker.connect(_this._speakerFilters);
      }).then(function (speakerData) {
        return _this._speakerData = speakerData;
      }).then(function (data) {
        return _this._asset.connect(_this._assetFilters);
      }).then(function (assetData) {
        return _this._assetData = assetData;
      });
    }

    /** Create or resume the audio stream
     * @see Stream.play **/

  }, {
    key: "play",
    value: function play() {
      var _this2 = this;

      var firstPlayCallback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

      return this._geoPosition.waitForInitialGeolocation().then(function (initialCoordinates) {
        return _this2._stream.play(_this2._sessionId, initialCoordinates, firstPlayCallback);
      });
    }

    /** Tell Roundware server to pause the audio stream. You should always call this when the local audio player has been paused.
     * @see Stream.pause **/

  }, {
    key: "pause",
    value: function pause() {
      this._stream.pause();
    }

    /** Tell Roundware server to kill the audio stream.
     * @see Stream.kill **/

  }, {
    key: "kill",
    value: function kill() {
      this._stream.kill();
    }

    /** Tell Roundware server to replay the current asset.
     * @see Stream.replay **/

  }, {
    key: "replay",
    value: function replay() {
      this._stream.replay();
    }

    /** Tell Roundware server to skip the current asset.
     * @see Stream.skip **/

  }, {
    key: "skip",
    value: function skip() {
      this._stream.skip();
    }

    /** Update the Roundware stream with new tag IDs
     * @param {string} tagIdStr - comma-separated list of tag IDs to send to the streams API **/

  }, {
    key: "tags",
    value: function tags(tagIdStr) {
      this._stream.update({ tag_ids: tagIdStr });
    }

    /** Update the Roundware stream with new tag IDs and or geo-position
     * @param {object} data - containing keys latitude, longitude and tagIds **/

  }, {
    key: "update",
    value: function update() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      // Object.keys(data).map(e => console.log(`key=${e}  value=${data[e]}`));
      this._stream.update(data);
    }

    /** Attach new assets to the project
     * @param {Object} audioData - the binary data from a recording to be saved as an asset
     * @param {string} fileName - name of the file
     * @return {promise} - represents the API calls to save an asset; can be tested to find out whether upload was successful
     * @see Envelope.upload */

  }, {
    key: "saveAsset",
    value: function saveAsset(audioData, fileName, data) {
      if (!this._sessionId) {
        return Promise.reject("can't save assets without first connecting to the server");
      }

      var envelope = new _envelope.Envelope(this._sessionId, this._apiClient, this._geoPosition);

      return envelope.connect().then(function () {
        envelope.upload(audioData, fileName, data);
      });
    }
  }]);

  return Roundware;
}();

// Slight hack here to export Roundware module to browser properly; see https://github.com/webpack/webpack/issues/3929


module.exports = Roundware;
},{"./api-client":3,"./asset":4,"./envelope":5,"./geo-position":6,"./project":7,"./session":9,"./shims":10,"./speaker":11,"./stream":12,"./user":13}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Session = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _shims = require("./shims");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var clientSystem = "Unknown";
var projectId, sessionId, geoListenEnabled;
var apiClient = {};

/** Responsible for establishing a session with the Roundware server **/

var Session = exports.Session = function () {
  /** Create a new Session
   * @param {object} navigator - provides access to the userAgent string
   * @param {Number} newProjectId - identifies the Roundware project to associate with this session
   * @param {Boolean} geoListenEnablement - whether the server should enable geo listening features
   * @param {Object} options - Various configuration parameters for this session
   * @param {apiClient} options.apiClient - the API client object to use for server API calls
  **/
  function Session(navigator, newProjectId, geoListenEnablement, options) {
    _classCallCheck(this, Session);

    clientSystem = navigator.userAgent;

    if (clientSystem.length > 127) {
      // on mobile browsers, this string is longer than the server wants
      clientSystem = clientSystem.slice(0, 127);
    }

    projectId = newProjectId;
    geoListenEnabled = geoListenEnablement;

    apiClient = options.apiClient;
  }

  /** @returns {String} human-readable representation of this session **/


  _createClass(Session, [{
    key: "toString",
    value: function toString() {
      return "Roundware Session #" + sessionId;
    }

    /** Make an asynchronous API call to establish a session with the Roundware server
     * @return {Promise} represents the pending API call
     **/

  }, {
    key: "connect",
    value: function connect() {
      var requestData = {
        project_id: projectId,
        geo_listen_enabled: geoListenEnabled,
        client_system: clientSystem
      };

      return apiClient.post("/sessions/", requestData).then(function (data) {
        sessionId = data.id;
        return sessionId;
      });
    }
  }]);

  return Session;
}();
},{"./shims":10}],10:[function(require,module,exports){
(function (process){
'use strict';

var _loglevel = require('loglevel');

var logger = _interopRequireWildcard(_loglevel);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//logger.disableAll();

if (typeof process !== 'undefined' && process.env.ROUNDWARE_DEBUG === "true") {
  /* istanbul ignore next */
  logger.setDefaultLevel('debug');
}

module.exports = {
  logger: logger
};
}).call(this,require('_process'))
},{"_process":1,"loglevel":2}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Speaker = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _shims = require("./shims");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var projectId, apiClient;

var Speaker = exports.Speaker = function () {
  function Speaker(newProjectId, options) {
    _classCallCheck(this, Speaker);

    projectId = newProjectId;
    apiClient = options.apiClient;
  }

  _createClass(Speaker, [{
    key: "toString",
    value: function toString() {
      return "Roundware Speaker '" + projectName + "' (#" + projectId + ")";
    }
  }, {
    key: "connect",
    value: function connect() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var path = "/speakers/";
      // add project_id to any incoming filter data
      data['project_id'] = projectId;

      return apiClient.get(path, data).then(function connectionSuccess(data) {
        return data;
      });
    }
  }]);

  return Speaker;
}();
},{"./shims":10}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Stream = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _shims = require("./shims");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultHeartbeatIntervalSeconds = 60;
var heartbeatIntervalId = void 0;

/** Establishes an audio stream with the Roundware server, and notifies Roundware of events like tag
 * and geoposition updates
 * @todo skip/ - causes currently playing asset to fade out and next available asset in playlist to begin playing thereafter
 * @todo playasset/ - causes currently playing asset to fade out and asset specified by asset_id param is played thereafter
 * @todo replayasset/ - causes currently playing asset to fade out and start playing again
 * @todo pause/ - causes currently playing asset to fade out and prevents any further assets from being added to the stream (though the playlist continues to be updated per PATCH calls)
 * @todo resume/ - un-does pause by allowing assets to be added to stream again from the playlist
 * **/

var Stream = exports.Stream = function () {
  /** Create a new Stream
   * @param {Object} options - Various configuration parameters for this stream
   * @param {apiClient} options.apiClient - the API client object to use for server API calls
   * @param {Number} [options.heartbeatIntervalSeconds = 60"] how frequently to send a stream heartbeat
   **/
  function Stream(options) {
    _classCallCheck(this, Stream);

    this._apiClient = options.apiClient;
    this._streamId = "(unknown)";
    this._heartbeatInterval = (options.heartbeatIntervalSeconds || defaultHeartbeatIntervalSeconds) * 1000;
  }

  /** @returns {String} human-readable description of this stream **/


  _createClass(Stream, [{
    key: "toString",
    value: function toString() {
      return "Roundware Stream #" + this._streamId + " (" + this._streamApiPath + ")";
    }

    /** Request a streaming audio URL from Roundware server and establish a regular heartbeat. The heartbeat is used to keep a stream alive
     * during a session. Streams take a lot of resources on the server, so we put the auto-kill mechanism in place to not have useless
     * streams taking resources, but needed a method to keep them alive when we know they are still wanted. After we initially connect to Roundware,
     * subsequent calls are forwarded to the Roundware server as "resume playing" API messages.
     * @param {Number} sessionId - Identifies the current session, must have been previously established by an instance of the Session class
     * @param {Promise}  initialGeoLocation - we will wait on this promise to resolve with initial coordinates before attempting to establish a stream
     * @param {Stream~firstPlayCallback} firstPlayCallback - invoked the first time we connect to roundware and retrieve a stream URL
     * @returns {Promise} represents the pending API call
     * @see pause()
     * **/

  }, {
    key: "play",
    value: function play(sessionId, initialLocation) {
      var _this = this;

      var firstPlayCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (streamAudioUrl) {};

      if (this._streamApiPath) {
        var resumePlayingPath = this._streamApiPath + "resume/";
        return this._apiClient.post(resumePlayingPath);
      }

      this._sessionId = sessionId;

      // Object.assign(createStreamData,initialLocation,{ session_id: this._sessionId });

      var createStreamData = new FormData();

      createStreamData.append('session_id', this._sessionId);
      createStreamData.append('latitude', initialLocation.latitude); // marker.position.lat());
      createStreamData.append('longitude', initialLocation.longitude); //marker.position.lng());
      console.log(createStreamData.get('session_id'));

      var streamConnectionPromise = this._apiClient.post("/streams/", createStreamData, {
        cache: true, // to avoid CORS problems TODO remove this
        processData: false,
        contentType: 'multipart/form-data'
      });

      streamConnectionPromise.then(function (streamData) {
        _this._streamAudioUrl = streamData.stream_url;
        _this._streamId = streamData.stream_id;
        _this._streamApiPath = "/streams/" + _this._streamId + "/";

        _this._heartbeatUrl = "/streams/" + _this._streamId + "/heartbeat/";

        var heartbeatData = {
          session_id: _this._sessionId
        };

        firstPlayCallback(_this._streamAudioUrl);

        heartbeatIntervalId = setInterval(function () {
          _this._apiClient.post(_this._heartbeatUrl, heartbeatData);
        }, _this._heartbeatInterval);
      });

      return streamConnectionPromise;
    }

    /** Tells Roundware server to pause the audio stream - you should always call this when pausing
     * local playback, to avoid wasting server resources **/

  }, {
    key: "pause",
    value: function pause() {
      if (this._streamAudioUrl) {
        var pausePlayingPath = this._streamApiPath + "pause/";
        this._apiClient.post(pausePlayingPath);
      }
    }

    /** Sends data to the Roundware server. If the Stream has not been established, does nothing. Can use a list of tag_ids or a position (lat/lon) to filter the assets available to the stream.
     * Typically for a normal geo-listen project, the position PATCH calls are triggered automatically by the client’s GPS/location system: every time a new position is registered by the client,
     * a PATCH call is sent to let the server know and the server acts accordingly by adjusting the underlying music mix as well as modifying the playlist of available assets to be played.
     * @param {Object} data [{}]
     * **/

  }, {
    key: "update",
    value: function update() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (this._streamApiPath) {
        var updateStreamData = new FormData();

        updateStreamData.append('session_id', this._sessionId);
        updateStreamData.append('latitude', data.latitude);
        updateStreamData.append('longitude', data.longitude);
        updateStreamData.append('tag_ids', data.tagIds);
        if ('listener_range_max' in data) {
          updateStreamData.append('listener_range_max', data.listener_range_max);
        }
        if ('listener_range_min' in data) {
          updateStreamData.append('listener_range_min', data.listener_range_min);
        }

        data.session_id = this._sessionId;
        return this._apiClient.patch(this._streamApiPath, updateStreamData, {
          cache: true, // to avoid CORS problems TODO remove this
          processData: false,
          contentType: 'multipart/form-data'
        });
      }
    }

    /** Tells Roundware server to kill the audio stream **/

  }, {
    key: "kill",
    value: function kill() {
      clearInterval(heartbeatIntervalId);
      if (this._streamAudioUrl) {
        var killPlayingPath = this._streamApiPath + "kill/";
        this._apiClient.post(killPlayingPath);
      }
    }

    /** Tells Roundware server to replay the current asset **/

  }, {
    key: "replay",
    value: function replay() {
      if (this._streamAudioUrl) {
        var replayPlayingPath = this._streamApiPath + "replayasset/";
        this._apiClient.post(replayPlayingPath);
      }
    }

    /** Tells Roundware server to skip the current asset **/

  }, {
    key: "skip",
    value: function skip() {
      if (this._streamAudioUrl) {
        var skipPlayingPath = this._streamApiPath + "skipasset/";
        this._apiClient.post(skipPlayingPath);
      }
    }
  }]);

  return Stream;
}();

/**
 * This callback is invoked by play() the first time we connect to Roundware and get an audio stream URL
 * @callback Streamam~firstPlayCallback
 * @param {string} streamAudioUrl - the URL of the stream, ready to connect to an audio source for playback
 */
},{"./shims":10}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _shims = require("./shims");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var deviceId, clientType, userName, apiClient;
var authToken = "UNKNOWN";
var userName = "(anonymous)";

/** Responsible for identifying the user to the Roundware server and retrieving an auth token **/

var User = exports.User = function () {
  /** Create a User
   * @param {Object} options - Various configuration parameters for this user
   * @param {apiClient} options.apiClient - the API client object to use for server API calls
   * @param {String} options.deviceId - this value distinguishes a particular user, who may be anonymous, to the server; by default we will fingerprint the browser to get this value, but you can supply your own value (useful if your app has a preexisting authorization scheme)
   * @param {String} [options.clientType = "web"] 
   **/
  function User(options) {
    _classCallCheck(this, User);

    apiClient = options.apiClient;

    // TODO need to try to persist deviceId as a random value that can partially serve as "a unique identifier generated by the client" that can 
    // used to claim a anonymous user's contributions. Some ideas for implementation: https://clientjs.org/ and https://github.com/Valve/fingerprintjs2
    deviceId = options.deviceId || "00000000000000";
    clientType = options.clientType || "web";
  }

  /** @returns {String} human-readable representation of this user **/


  _createClass(User, [{
    key: "toString",
    value: function toString() {
      return "User " + userName + " (deviceId " + deviceId + ")";
    }

    /** Make an API call to associate the (possibly anonymous) application user with a Roundware user account.
     * Upon success, this function receives an auth token, which is passed onto the apiClient object.
     * @returns {Promise} represents the pending API call **/

  }, {
    key: "connect",
    value: function connect() {
      var data = {
        device_id: deviceId,
        client_type: clientType
      };

      // TODO need to also handle auth failures
      return apiClient.post("/users/", data).then(function (data) {
        userName = data.username;
        apiClient.setAuthToken(data.token);
      });
    }
  }]);

  return User;
}();
},{"./shims":10}],14:[function(require,module,exports){
var Roundware = require('roundware-web-framework/dist/roundware'); 

const roundwareServerUrl = 'http://localhost:8888/api/2'; 
const roundwareProjectId = 1; 

const rw = new Roundware(window, { serverUrl: roundwareServerUrl, projectId: roundwareProjectId,  }); 

console.log(rw)


},{"roundware-web-framework/dist/roundware":8}]},{},[14]);
