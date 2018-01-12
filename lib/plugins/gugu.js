'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var words = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url, text) {
    var from = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'zh';
    var to = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'en';
    var res;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _coRequest2.default)(url + '?' + (0, _queryString.stringify)({ from: from, to: to, text: text }));

          case 2:
            res = _context.sent;
            return _context.abrupt('return', JSON.parse(res.body).data);

          case 4:
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

var _coRequest = require('co-request');

var _coRequest2 = _interopRequireDefault(_coRequest);

var _queryString = require('query-string');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(query) {
    var _this = this;

    var _from$to$query, from, to, todo, url, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step;

    return regeneratorRuntime.wrap(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _from$to$query = _extends({
              from: 'zh',
              to: 'en'
            }, query), from = _from$to$query.from, to = _from$to$query.to;
            todo = this.getTodo();

            if (todo.length) {
              _context3.next = 5;
              break;
            }

            _spmLog2.default.info('gugu', 'no element need to be processed');
            return _context3.abrupt('return');

          case 5:

            _spmLog2.default.info('gugu', 'from ' + from + ' to ' + to);

            url = 'http://gugu.alipay.net/suggestion';
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context3.prev = 10;
            _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop() {
              var id, text, result;
              return regeneratorRuntime.wrap(function _loop$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      id = _step.value;
                      text = _this.getOptionValues(id, from);

                      if (text.length) {
                        _context2.next = 6;
                        break;
                      }

                      _spmLog2.default.warn('gugu', 'skip ' + id + ' from ' + to + ' to ' + to);
                      _context2.next = 10;
                      break;

                    case 6:
                      _context2.next = 8;
                      return words(url, text, from, to);

                    case 8:
                      result = _context2.sent;

                      result.forEach(function (each) {
                        _spmLog2.default.info('gugu:' + from + ' -> ' + each.to, each.text + ' -> ' + each.translate);
                        _this.setOption(id, each.to, _defineProperty({}, 'gugu, ' + each.text, each.translate));
                      });

                    case 10:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, _loop, _this);
            });
            _iterator = todo[Symbol.iterator]();

          case 13:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context3.next = 18;
              break;
            }

            return _context3.delegateYield(_loop(), 't0', 15);

          case 15:
            _iteratorNormalCompletion = true;
            _context3.next = 13;
            break;

          case 18:
            _context3.next = 24;
            break;

          case 20:
            _context3.prev = 20;
            _context3.t1 = _context3['catch'](10);
            _didIteratorError = true;
            _iteratorError = _context3.t1;

          case 24:
            _context3.prev = 24;
            _context3.prev = 25;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 27:
            _context3.prev = 27;

            if (!_didIteratorError) {
              _context3.next = 30;
              break;
            }

            throw _iteratorError;

          case 30:
            return _context3.finish(27);

          case 31:
            return _context3.finish(24);

          case 32:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee2, this, [[10, 20, 24, 32], [25,, 27, 31]]);
  }));

  function gugu(_x5) {
    return _ref2.apply(this, arguments);
  }

  return gugu;
}();

module.exports = exports['default'];