"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _underscore = _interopRequireDefault(require("underscore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint no-empty: 0 */

/* eslint no-param-reassign: 0 */

/* eslint prefer-rest-params: 0 */
function splitNested(str) {
  return [str].join('.').replace(/\[/g, '.').replace(/\]/g, '').split('.');
}

function contains(list, value) {
  if (_underscore["default"].includes) {
    return _underscore["default"].includes(list, value);
  }

  return list.indexOf(value) > -1;
}

function get(target, field) {
  var directGet = target[field];

  if (directGet !== undefined && directGet !== null) {
    return directGet;
  }

  var pathArray = splitNested(field);
  var result;

  try {
    result = pathArray.reduce(function (curr, path) {
      return curr[path];
    }, target);
  } catch (e) {}

  return result;
}

function set(target, field, value) {
  var safe = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var pathArray = splitNested(field);
  var level = 0;
  pathArray.reduce(function (a, b) {
    level += 1;

    if (typeof a[b] === 'undefined') {
      if (!safe) throw new Error("".concat(a, ".").concat(b, " is undefined"));
      a[b] = {};
      return a[b];
    }

    if (level === pathArray.length) {
      a[b] = value;
      return value;
    }

    return a[b];
  }, target);
}

function isEmptyObject(obj) {
  if (!_underscore["default"].isObject(obj)) return false;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var keys = Object.keys(obj);

  for (var i = 0; i < keys.length; i += 1) {
    if (hasOwnProperty.call(obj, keys[i])) return false;
  }

  return true;
}

function isDefined(value) {
  return typeof value !== 'undefined' && value !== null;
}

function sleep(fn, ms) {
  return setTimeout(function () {
    return fn();
  }, ms);
}

function debounce(func, wait, immediate) {
  var _arguments = arguments,
      _this = this;

  var timeout;
  return function () {
    var later = function later() {
      timeout = null;

      if (!immediate) {
        func.apply(_this, _arguments);
      }
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait || 0);

    if (callNow) {
      func.apply(_this, _arguments);
    }
  };
}

var _default = Object.assign(_underscore["default"], {
  get: get,
  set: set,
  isDefined: isDefined,
  isEmptyObject: isEmptyObject,
  sleep: sleep,
  debounce: debounce,
  contains: contains
});

exports["default"] = _default;