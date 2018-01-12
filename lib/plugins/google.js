'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// https://github.com/matheuss/google-translate-response-spec

var words = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(q, params) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', (0, _googleTranslateApi2.default)(q, _extends({}, params)).then(function (res) {
              return res.text;
            }).catch(function (err) {
              return _spmLog2.default.error(err);
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function words(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _spmLog = require('spm-log');

var _spmLog2 = _interopRequireDefault(_spmLog);

var _googleTranslateApi = require('google-translate-api');

var _googleTranslateApi2 = _interopRequireDefault(_googleTranslateApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(query) {
    var _query$from, from, _query$to, to, todo, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, id, texts, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, q, result;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _query$from = query.from, from = _query$from === undefined ? 'zh-cn' : _query$from, _query$to = query.to, to = _query$to === undefined ? 'en' : _query$to;
            todo = this.getTodo();

            if (todo.length) {
              _context2.next = 5;
              break;
            }

            _spmLog2.default.info('google', 'no element need to be processed');
            return _context2.abrupt('return');

          case 5:

            _spmLog2.default.info('google translate starts');

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 9;
            _iterator = todo[Symbol.iterator]();

          case 11:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context2.next = 50;
              break;
            }

            id = _step.value;
            texts = this.getOptionValues(id, 'zh');

            if (texts.length) {
              _context2.next = 18;
              break;
            }

            _spmLog2.default.warn('google', 'skip ' + id + ' from zh to en');
            _context2.next = 47;
            break;

          case 18:
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context2.prev = 21;
            _iterator2 = texts[Symbol.iterator]();

          case 23:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context2.next = 33;
              break;
            }

            q = _step2.value;
            _context2.next = 27;
            return words(q, { from: from, to: to });

          case 27:
            result = _context2.sent;

            _spmLog2.default.info('google: zh -> en', q + ' -> ' + result);

            this.setOption(id, 'en', _defineProperty({}, 'google, ' + q, result));

          case 30:
            _iteratorNormalCompletion2 = true;
            _context2.next = 23;
            break;

          case 33:
            _context2.next = 39;
            break;

          case 35:
            _context2.prev = 35;
            _context2.t0 = _context2['catch'](21);
            _didIteratorError2 = true;
            _iteratorError2 = _context2.t0;

          case 39:
            _context2.prev = 39;
            _context2.prev = 40;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 42:
            _context2.prev = 42;

            if (!_didIteratorError2) {
              _context2.next = 45;
              break;
            }

            throw _iteratorError2;

          case 45:
            return _context2.finish(42);

          case 46:
            return _context2.finish(39);

          case 47:
            _iteratorNormalCompletion = true;
            _context2.next = 11;
            break;

          case 50:
            _context2.next = 56;
            break;

          case 52:
            _context2.prev = 52;
            _context2.t1 = _context2['catch'](9);
            _didIteratorError = true;
            _iteratorError = _context2.t1;

          case 56:
            _context2.prev = 56;
            _context2.prev = 57;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 59:
            _context2.prev = 59;

            if (!_didIteratorError) {
              _context2.next = 62;
              break;
            }

            throw _iteratorError;

          case 62:
            return _context2.finish(59);

          case 63:
            return _context2.finish(56);

          case 64:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[9, 52, 56, 64], [21, 35, 39, 47], [40,, 42, 46], [57,, 59, 63]]);
  }));

  function google(_x3) {
    return _ref2.apply(this, arguments);
  }

  return google;
}();

module.exports = exports['default'];