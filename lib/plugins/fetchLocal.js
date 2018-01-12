'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = skipLocal;

var _spmLog = require('spm-log');

var _spmLog2 = _interopRequireDefault(_spmLog);

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function skipLocal(query) {
  var _this = this;

  var _source$skip$query = _extends({
    source: 'locales',
    skip: true
  }, query),
      source = _source$skip$query.source,
      skip = _source$skip$query.skip;

  var langs = Object.keys(this.LANGS).filter(function (lang) {
    return _this.existsResolve((0, _path.join)(_this.context.cwd, source, lang));
  });

  if (!langs.length) {
    _spmLog2.default.info('fetchLocal', 'no local files need to be processed');
    return;
  }

  _spmLog2.default.info('fetchLocal', 'from ' + source + ', language: ' + langs + ', skip ' + skip);

  var localCollect = langs.reduce(function (collect, lang) {
    var content = require((0, _path.join)(_this.context.cwd, source, lang));
    _this.getList().forEach(function (id) {
      if (content[id]) {
        _this.setOption(id, lang, {
          local: content[id]
        });
      }
    });
    return _extends({}, collect, _defineProperty({}, lang, content));
  }, {});
  this._store.local = localCollect;

  if (skip) {
    this.getTodo().forEach(function (id) {
      var needSkip = langs.every(function (lang) {
        return _this.getLocal(lang)[id];
      });
      if (needSkip) {
        _this.addSkip(id);
        _this.setResult(id, langs.reduce(function (collect, lang) {
          return _extends({}, collect, _defineProperty({}, lang, _this.getLocal(lang)[id]));
        }, {}));
        _spmLog2.default.warn('add to skip', id);
      }
    });
  }
}
module.exports = exports['default'];