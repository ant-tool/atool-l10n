'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var words = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url, params) {
    var times, _ref2, body;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            times = 5;

          case 1:
            if (!(times > 0)) {
              _context.next = 16;
              break;
            }

            times--;
            _context.prev = 3;
            _context.next = 6;
            return (0, _coRequest2.default)(url + '?' + (0, _queryString.stringify)(params));

          case 6:
            _ref2 = _context.sent;
            body = _ref2.body;
            return _context.abrupt('return', JSON.parse(body).translation);

          case 11:
            _context.prev = 11;
            _context.t0 = _context['catch'](3);
            return _context.abrupt('continue', 1);

          case 14:
            _context.next = 1;
            break;

          case 16:
            if (params.key) {
              _spmLog2.default.error('youdao', 'apikey is forbidden, apply another in http://fanyi.youdao.com/openapi?path=data-mode');
            }
            return _context.abrupt('return', false);

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 11]]);
  }));

  return function words(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _spmLog = require('spm-log');

var _spmLog2 = _interopRequireDefault(_spmLog);

var _coRequest = require('co-request');

var _coRequest2 = _interopRequireDefault(_coRequest);

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _queryString = require('query-string');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(query) {
    var _this = this;

    var _apiname$apikey$appke, appkey, appsecret, from, to, keyfrom, key, _from, _to, todo, url, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step;

    return regeneratorRuntime.wrap(function _callee2$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _apiname$apikey$appke = _extends({
              apiname: 'iamatestmanx',
              apikey: '2137553564',
              appkey: '',
              appsecret: '',
              from: 'zh',
              to: 'en'
            }, query), appkey = _apiname$apikey$appke.appkey, appsecret = _apiname$apikey$appke.appsecret, from = _apiname$apikey$appke.from, to = _apiname$apikey$appke.to, keyfrom = _apiname$apikey$appke.apiname, key = _apiname$apikey$appke.apikey;
            _from = from, _to = to;

            if (_from === 'zh') _from = 'zh-CHS';
            if (_from === 'en') _from = 'EN';
            if (_to === 'zh') _to = 'zh-CHS';
            if (_to === 'en') _to = 'EN';

            // if (!appkey || !appsecret) {
            //   log.error('youdao', 'appkey or appsecret is missing, can apply in http://ai.youdao.com');
            //   return;
            // }

            todo = this.getTodo();

            if (todo.length) {
              _context4.next = 10;
              break;
            }

            _spmLog2.default.info('youdao', 'no element need to be processed');
            return _context4.abrupt('return');

          case 10:
            url = void 0;

            if (appkey && appsecret) {
              _spmLog2.default.info('youdao', 'using appkey: ' + appkey + ', appsecret: ' + appsecret);
              url = 'http://openapi.youdao.com/api';
            } else {
              _spmLog2.default.info('youdao', 'using apiname: ' + keyfrom + ', apikey: ' + key);
              url = 'http://fanyi.youdao.com/openapi.do';
            }

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context4.prev = 15;
            _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop() {
              var id, texts, salt, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _loop2, _iterator2, _step2;

              return regeneratorRuntime.wrap(function _loop$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      id = _step.value;
                      texts = _this.getOptionValues(id, from);
                      salt = Date.now();

                      if (texts.length) {
                        _context3.next = 7;
                        break;
                      }

                      _spmLog2.default.warn('youdao', 'skip ' + id + ' from zh to en');
                      _context3.next = 32;
                      break;

                    case 7:
                      _iteratorNormalCompletion2 = true;
                      _didIteratorError2 = false;
                      _iteratorError2 = undefined;
                      _context3.prev = 10;
                      _loop2 = /*#__PURE__*/regeneratorRuntime.mark(function _loop2() {
                        var q, params, sign, result;
                        return regeneratorRuntime.wrap(function _loop2$(_context2) {
                          while (1) {
                            switch (_context2.prev = _context2.next) {
                              case 0:
                                q = _step2.value;
                                params = {
                                  keyfrom: keyfrom,
                                  key: key,
                                  type: 'data',
                                  doctype: 'json',
                                  version: '1.1',
                                  q: q
                                };

                                if (appkey && appsecret) {
                                  sign = (0, _md2.default)(appkey + q + salt + appsecret);

                                  params = {
                                    q: q,
                                    appKey: appkey,
                                    salt: salt,
                                    from: _from,
                                    to: _to,
                                    sign: sign
                                  };
                                }
                                _context2.next = 5;
                                return words(url, params);

                              case 5:
                                result = _context2.sent;

                                result.forEach(function (each) {
                                  _spmLog2.default.info('youdao: zh -> en', q + ' -> ' + each);
                                  _this.setOption(id, 'en', _defineProperty({}, 'youdao, ' + q, each));
                                });

                              case 7:
                              case 'end':
                                return _context2.stop();
                            }
                          }
                        }, _loop2, _this);
                      });
                      _iterator2 = texts[Symbol.iterator]();

                    case 13:
                      if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                        _context3.next = 18;
                        break;
                      }

                      return _context3.delegateYield(_loop2(), 't0', 15);

                    case 15:
                      _iteratorNormalCompletion2 = true;
                      _context3.next = 13;
                      break;

                    case 18:
                      _context3.next = 24;
                      break;

                    case 20:
                      _context3.prev = 20;
                      _context3.t1 = _context3['catch'](10);
                      _didIteratorError2 = true;
                      _iteratorError2 = _context3.t1;

                    case 24:
                      _context3.prev = 24;
                      _context3.prev = 25;

                      if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                      }

                    case 27:
                      _context3.prev = 27;

                      if (!_didIteratorError2) {
                        _context3.next = 30;
                        break;
                      }

                      throw _iteratorError2;

                    case 30:
                      return _context3.finish(27);

                    case 31:
                      return _context3.finish(24);

                    case 32:
                    case 'end':
                      return _context3.stop();
                  }
                }
              }, _loop, _this, [[10, 20, 24, 32], [25,, 27, 31]]);
            });
            _iterator = todo[Symbol.iterator]();

          case 18:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context4.next = 23;
              break;
            }

            return _context4.delegateYield(_loop(), 't0', 20);

          case 20:
            _iteratorNormalCompletion = true;
            _context4.next = 18;
            break;

          case 23:
            _context4.next = 29;
            break;

          case 25:
            _context4.prev = 25;
            _context4.t1 = _context4['catch'](15);
            _didIteratorError = true;
            _iteratorError = _context4.t1;

          case 29:
            _context4.prev = 29;
            _context4.prev = 30;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 32:
            _context4.prev = 32;

            if (!_didIteratorError) {
              _context4.next = 35;
              break;
            }

            throw _iteratorError;

          case 35:
            return _context4.finish(32);

          case 36:
            return _context4.finish(29);

          case 37:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee2, this, [[15, 25, 29, 37], [30,, 32, 36]]);
  }));

  function youdao(_x3) {
    return _ref3.apply(this, arguments);
  }

  return youdao;
}();

module.exports = exports['default'];