'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (name, _resolveDir) {
  var resolveDir = Array.isArray(_resolveDir) ? _resolveDir : [_resolveDir];

  var result = void 0;
  resolveDir.some(function (dirname) {
    result = tryResolve('intl-plugin-' + name, dirname) || tryResolve(name, dirname);
    return result;
  });
  return result;
};

var _resolve = require('resolve');

var _resolve2 = _interopRequireDefault(_resolve);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function tryResolve(name, dirname) {
  var result = void 0;
  try {
    result = _resolve2.default.sync(name, {
      basedir: dirname
    });
  } catch (e) {} // eslint-disable-line no-empty
  return result;
}

module.exports = exports['default'];