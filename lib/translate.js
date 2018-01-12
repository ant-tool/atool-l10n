'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = translate;

require('babel-polyfill');

var _plugin = require('./plugin');

var _context = require('./context');

var _context2 = _interopRequireDefault(_context);

var _spmLog = require('spm-log');

var _spmLog2 = _interopRequireDefault(_spmLog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function translate(options) {
  var _cwd$options = _extends({
    cwd: process.cwd()
  }, options),
      cwd = _cwd$options.cwd,
      middlewares = _cwd$options.middlewares;

  var resolveDir = [cwd];
  var pluginNames = Array.isArray(middlewares) ? middlewares : Object.keys(middlewares).reduce(function (a, b) {
    return a.concat(middlewares[b]);
  }, []);

  var plugins = (0, _plugin.resolvePlugins)(pluginNames, resolveDir, cwd);

  var pluginThis = (0, _context2.default)({
    cwd: cwd
  });

  _spmLog2.default.info('atool-l10n', plugins.map(function (plugin) {
    return plugin.name;
  }).join(', '));
  plugins.reduce(function (a, b) {
    if (a instanceof Promise) {
      return a.then(function (result) {
        return b.plugin.call(pluginThis, b.query, result);
      });
    }
    return b.plugin.call(pluginThis, b.query, a);
  }, Promise.resolve());
}
module.exports = exports['default'];