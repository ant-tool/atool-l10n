'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var select = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(target) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'pick the best one';
    var optionKeys, answer;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            optionKeys = Object.keys(target);

            if (!(optionKeys.length > 1)) {
              _context.next = 8;
              break;
            }

            _context.next = 4;
            return _inquirer2.default.prompt({
              name: 'value',
              type: 'list',
              message: message,
              choices: Object.keys(target).map(function (each) {
                return {
                  value: target[each],
                  name: target[each] + ' - from ' + each
                };
              })
            });

          case 4:
            answer = _context.sent;
            return _context.abrupt('return', answer.value);

          case 8:
            if (!(optionKeys.length === 1)) {
              _context.next = 11;
              break;
            }

            _spmLog2.default.info('only one', 'pick ' + target[optionKeys[0]]);
            return _context.abrupt('return', target[optionKeys[0]]);

          case 11:
            return _context.abrupt('return', false);

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function select(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _spmLog = require('spm-log');

var _spmLog2 = _interopRequireDefault(_spmLog);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(query) {
    var _this = this;

    var _autoPick$autoReduce$, autoPick, autoReduce, todo, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step;

    return regeneratorRuntime.wrap(function _callee2$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _autoPick$autoReduce$ = _extends({
              autoPick: false,
              autoReduce: ['local', 'meta']
            }, query), autoPick = _autoPick$autoReduce$.autoPick, autoReduce = _autoPick$autoReduce$.autoReduce;
            todo = this.getTodo();

            if (todo.length) {
              _context4.next = 5;
              break;
            }

            _spmLog2.default.info('reduce', 'no element need to be processed');
            return _context4.abrupt('return');

          case 5:

            _spmLog2.default.info('reduce', 'autoPick ' + autoPick + ' autoReduce ' + autoReduce);

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context4.prev = 9;
            _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop() {
              var id, record, langs, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _loop2, _iterator2, _step2;

              return regeneratorRuntime.wrap(function _loop$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      id = _step.value;
                      record = _this.getResult(id);
                      langs = Object.keys(record);
                      _iteratorNormalCompletion2 = true;
                      _didIteratorError2 = false;
                      _iteratorError2 = undefined;
                      _context3.prev = 6;
                      _loop2 = /*#__PURE__*/regeneratorRuntime.mark(function _loop2() {
                        var lang, success;
                        return regeneratorRuntime.wrap(function _loop2$(_context2) {
                          while (1) {
                            switch (_context2.prev = _context2.next) {
                              case 0:
                                lang = _step2.value;

                                if (!(autoPick && record[lang][autoPick])) {
                                  _context2.next = 6;
                                  break;
                                }

                                _spmLog2.default.warn('autoPick ' + lang + '@' + id + ' with ' + autoPick, record[lang][autoPick]);
                                _this.setResult(id, _defineProperty({}, lang, record[lang][autoPick]));
                                _context2.next = 12;
                                break;

                              case 6:
                                if (autoReduce && autoReduce.length) {
                                  autoReduce.reduceRight(function (end, start) {
                                    if (record[lang][start]) {
                                      // refactor to parse split
                                      _this.removeOption(id, lang, end);
                                      return start;
                                    }
                                    return end;
                                  });
                                }

                                if (!(_this.typeOf(record[lang]) === 'object')) {
                                  _context2.next = 12;
                                  break;
                                }

                                _context2.next = 10;
                                return select(record[lang], 'pinking ' + lang + ' for ' + id);

                              case 10:
                                success = _context2.sent;

                                _this.setResult(id, _defineProperty({}, lang, success));

                              case 12:
                              case 'end':
                                return _context2.stop();
                            }
                          }
                        }, _loop2, _this);
                      });
                      _iterator2 = langs[Symbol.iterator]();

                    case 9:
                      if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                        _context3.next = 14;
                        break;
                      }

                      return _context3.delegateYield(_loop2(), 't0', 11);

                    case 11:
                      _iteratorNormalCompletion2 = true;
                      _context3.next = 9;
                      break;

                    case 14:
                      _context3.next = 20;
                      break;

                    case 16:
                      _context3.prev = 16;
                      _context3.t1 = _context3['catch'](6);
                      _didIteratorError2 = true;
                      _iteratorError2 = _context3.t1;

                    case 20:
                      _context3.prev = 20;
                      _context3.prev = 21;

                      if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                      }

                    case 23:
                      _context3.prev = 23;

                      if (!_didIteratorError2) {
                        _context3.next = 26;
                        break;
                      }

                      throw _iteratorError2;

                    case 26:
                      return _context3.finish(23);

                    case 27:
                      return _context3.finish(20);

                    case 28:
                    case 'end':
                      return _context3.stop();
                  }
                }
              }, _loop, _this, [[6, 16, 20, 28], [21,, 23, 27]]);
            });
            _iterator = todo[Symbol.iterator]();

          case 12:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context4.next = 17;
              break;
            }

            return _context4.delegateYield(_loop(), 't0', 14);

          case 14:
            _iteratorNormalCompletion = true;
            _context4.next = 12;
            break;

          case 17:
            _context4.next = 23;
            break;

          case 19:
            _context4.prev = 19;
            _context4.t1 = _context4['catch'](9);
            _didIteratorError = true;
            _iteratorError = _context4.t1;

          case 23:
            _context4.prev = 23;
            _context4.prev = 24;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 26:
            _context4.prev = 26;

            if (!_didIteratorError) {
              _context4.next = 29;
              break;
            }

            throw _iteratorError;

          case 29:
            return _context4.finish(26);

          case 30:
            return _context4.finish(23);

          case 31:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee2, this, [[9, 19, 23, 31], [24,, 26, 30]]);
  }));

  function reduce(_x3) {
    return _ref2.apply(this, arguments);
  }

  return reduce;
}();

module.exports = exports['default'];