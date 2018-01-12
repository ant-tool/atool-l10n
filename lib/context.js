'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createContext;

var _static = require('./static');

var _util = require('./util');

var utils = _interopRequireWildcard(_util);

var _spmLog = require('spm-log');

var _spmLog2 = _interopRequireDefault(_spmLog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createContext(context, others) {
  return _extends({
    context: context,
    LANGS: _static.LANGS,
    _store: {
      meta: {},
      local: {},
      list: [],
      skip: [],
      result: {}
    },
    getMeta: function getMeta(id) {
      return id ? this._store.meta[id] || {} : this._store.meta;
    },
    getLocal: function getLocal(lang) {
      return lang ? this._store.local[lang] || {} : this._store.local;
    },
    getList: function getList() {
      return this._store.list;
    },
    getSkip: function getSkip() {
      return this._store.skip;
    },
    addSkip: function addSkip(id) {
      if (this._store.skip.indexOf(id) === -1) {
        this._store.skip.push(id);
      }
    },
    getTodo: function getTodo() {
      var _this = this;

      return this._store.list.filter(function (id) {
        return _this._store.skip.indexOf(id) === -1;
      });
    },
    getResult: function getResult(id) {
      var _this2 = this;

      return id ? this._store.result[id] : Object.keys(this._store.result).map(function (each) {
        return _extends({
          id: each
        }, _this2._store.result[each]);
      });
    },
    setResult: function setResult(id, result) {
      if (id) {
        this._store.result[id] = _extends({}, this._store.result[id], result);
      } else {
        _spmLog2.default.error('set Result', 'set result failed');
      }
    },
    removeOption: function removeOption(id, lang, key) {
      delete this._store.result[id][lang][key];
    },
    setOption: function setOption(id, lang, option) {
      this._store.result[id] = this._store.result[id] || {};
      var record = this._store.result[id];

      switch (this.typeOf(record[lang])) {
        case 'object':
          record[lang] = _extends({}, record[lang], option);
          break;
        case 'array':
          _spmLog2.default.error('setOptionForLang', 'type error');
          break;
        case 'string':
          record[lang] = _extends(_defineProperty({}, record[lang], record[lang]), option);
          break;
        case 'undefined':
          record[lang] = _extends({}, option);
          break;
        default:
          _spmLog2.default.error('setOptionForLang', 'unSupported type');
      }
    },
    getOptionValues: function getOptionValues(id, lang) {
      var record = this._store.result[id][lang];
      switch (this.typeOf(record)) {
        case 'object':
          return Object.keys(record).map(function (key) {
            return record[key];
          });
        case 'string':
          return [record];
        case 'undefined':
          return [];
        default:
          _spmLog2.default.error('getResultValues', 'unSupported type');
          return false;
      }
    }
  }, utils, others);
}
module.exports = exports['default'];