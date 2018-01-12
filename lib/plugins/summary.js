'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = summary;

var _glob = require('glob');

var _path = require('path');

var _spmLog = require('spm-log');

var _spmLog2 = _interopRequireDefault(_spmLog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseMeta(cwd, sourcePattern) {
  var patternArray = Array.isArray(sourcePattern) ? sourcePattern : [sourcePattern];
  try {
    return patternArray.map(function (pattern) {
      return (0, _glob.sync)((0, _path.join)(cwd, pattern));
    }).reduce(function (a, b) {
      return a.concat(b);
    }, []).map(function (file) {
      return require(file);
    }).reduce(function (a, b) {
      return a.concat(b);
    }, []);
  } catch (e) {
    _spmLog2.default.error('summary', e);
    return false;
  }
}

function summary(query) {
  var _sourcePattern$query = _extends({
    sourcePattern: 'i18n-messages/**/*.json'
  }, query),
      sourcePattern = _sourcePattern$query.sourcePattern;

  _spmLog2.default.info('summary', sourcePattern);

  var metaArray = parseMeta(this.context.cwd, sourcePattern);

  if (metaArray.length === 0) {
    _spmLog2.default.warn('summary', 'no local files find, run webpack with babel-plugin-react-intl first');
  }

  var meta = this.arrayToObject(metaArray, 'id');
  this._store.meta = meta;
  this._store.list = Object.keys(meta);
}
module.exports = exports['default'];