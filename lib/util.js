'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.arrayToObject = arrayToObject;
exports.isRelative = isRelative;
exports.isAbsolute = isAbsolute;
exports.isProvided = isProvided;
exports.existsResolve = existsResolve;
exports.isObject = isObject;
exports.format = format;
exports.maxKeys = maxKeys;
exports.typeOf = typeOf;

var _fs = require('fs');

var _path = require('path');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function arrayToObject(arr, key) {
  return arr.reduce(function (collection, current) {
    return _extends({}, collection, _defineProperty({}, current[key], _extends({}, current)));
  }, {});
}

function isRelative(filepath) {
  return filepath.charAt(0) === '.';
}

function isAbsolute(filepath) {
  return filepath.charAt(0) === '/';
}

function isProvided(filepath) {
  return (0, _fs.existsSync)((0, _path.join)(__dirname, 'plugins', filepath + '.js'));
}

function existsResolve(path) {
  try {
    require.resolve(path);
  } catch (e) {
    return false;
  }
  return true;
}

function isObject(something) {
  return something && something.constructor === Object;
}

function format(target, prefix) {
  var before = prefix || '';
  if (Array.isArray(target)) {
    return target.reduce(function (collection, item) {
      return _extends({}, collection, _defineProperty({}, item + ' - ' + before, item));
    }, {});
  } else if (isObject(target)) {
    return Object.keys(target).reduce(function (collection, key) {
      return _extends({}, collection, _defineProperty({}, target[key] + ' - ' + before + ' ' + key, target[key]));
    }, {});
  }
  return _defineProperty({}, target + ' - ' + before, target);
}

function maxKeys(arr) {
  return Object.keys(arr[0]);
}

function typeOf(thing) {
  if (thing && thing.constructor === Object) {
    return 'object';
  } else if (Array.isArray(thing)) {
    return 'array';
  }
  return typeof thing === 'undefined' ? 'undefined' : _typeof(thing);
}