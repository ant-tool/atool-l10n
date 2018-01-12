'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.resolvePlugin = resolvePlugin;
exports.resolvePlugins = resolvePlugins;

var _path = require('path');

var _resolve = require('./resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var _loaderUtils = require('loader-utils');

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resolvePlugin(_pluginName, resolveDir) {
  var cwd = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : process.cwd();

  var plugin = void 0;
  var name = false;
  var query = {};

  if (typeof _pluginName === 'string') {
    var _pluginName$split = _pluginName.split('?'),
        _pluginName$split2 = _slicedToArray(_pluginName$split, 2),
        pluginName = _pluginName$split2[0],
        _query = _pluginName$split2[1];

    name = pluginName;
    if (_query) {
      query = (0, _loaderUtils.parseQuery)('?' + _query);
    }
    if ((0, _util.isRelative)(pluginName)) {
      plugin = require((0, _path.join)(cwd, pluginName));
    } else if ((0, _util.isAbsolute)(pluginName)) {
      plugin = require(pluginName);
    } else if ((0, _util.isProvided)(pluginName)) {
      plugin = require((0, _path.join)(__dirname, 'plugins', pluginName));
    } else {
      var pluginPath = (0, _resolve2.default)(pluginName, resolveDir);
      if (!pluginPath) {
        throw new Error('[Error] ' + pluginName + ' not found in ' + resolveDir);
      }
      plugin = require(pluginPath);
    }
  }

  return {
    query: query,
    plugin: plugin,
    name: name
  };
}

function resolvePlugins(pluginNames, resolveDir, cwd) {
  return pluginNames.map(function (pluginName) {
    return resolvePlugin(pluginName, resolveDir, cwd);
  });
}