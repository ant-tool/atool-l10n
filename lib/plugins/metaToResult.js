'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = metaToResult;

var _spmLog = require('spm-log');

var _spmLog2 = _interopRequireDefault(_spmLog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function metaToResult(query) {
  var _this = this;

  var _from$to$query = _extends({
    from: 'defaultMessage',
    to: 'zh'
  }, query),
      from = _from$to$query.from,
      to = _from$to$query.to;

  var todo = this.getTodo();
  if (!todo.length) {
    _spmLog2.default.info('metaToResult', 'no element need to be processed');
    return;
  }

  _spmLog2.default.info('metaToResult', 'from meta.' + from + ' to result.' + to);

  todo.forEach(function (id) {
    if (_this.getLocal(to)[id] && _this.getMeta(id)[from] !== _this.getLocal(to)[id]) {
      _spmLog2.default.warn('multiple ' + to + '@' + id, _this.getMeta(id)[from] + '(meta) !== ' + _this.getLocal(to)[id] + '(local)');
    }
    _this.setOption(id, to, {
      meta: _this.getMeta(id)[from]
    });
  });
}
module.exports = exports['default'];