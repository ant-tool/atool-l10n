'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = save;

var _fs = require('fs');

var _spmLog = require('spm-log');

var _spmLog2 = _interopRequireDefault(_spmLog);

var _path = require('path');

var _ensureDir = require('ensure-dir');

var _ensureDir2 = _interopRequireDefault(_ensureDir);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function sortKey(obj) {
  return Object.keys(obj).sort(function (a, b) {
    return a.toString().toLowerCase() > b.toString().toLowerCase();
  }).reduce(function (collect, current) {
    return _extends({}, collect, _defineProperty({}, current, obj[current]));
  }, {});
}

function save(query) {
  var _dest$query = _extends({
    dest: 'locales'
  }, query),
      dest = _dest$query.dest;

  _spmLog2.default.info('save task', 'dest is ' + dest);

  var results = this.getResult();

  var saveResult = {};

  var dir = (0, _path.join)(this.context.cwd, dest);

  results.forEach(function (result) {
    var langs = Object.keys(result).filter(function (lang) {
      return lang !== 'id';
    });
    langs.forEach(function (lang) {
      saveResult[lang] = saveResult[lang] || {
        lang: lang,
        content: {},
        file: (0, _path.join)(dir, lang) + '.json'
      };

      saveResult[lang].content[result.id] = result[lang];
    });
  });

  (0, _ensureDir2.default)(dir).then(function () {
    Object.keys(saveResult).forEach(function (item) {
      (0, _fs.writeFileSync)(saveResult[item].file, JSON.stringify(sortKey(saveResult[item].content), null, 2));
    });
  });
}
module.exports = exports['default'];