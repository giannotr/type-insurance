"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _hash = _interopRequireDefault(require("hash.js"));

var _baseconvert = _interopRequireDefault(require("baseconvert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function castString(input) {
  var isArray = Array.isArray(input);

  if (!input && typeof input === 'boolean') {
    return 'false';
  } else if (input === 0) {
    return '0';
  } else if (input && _typeof(input) === 'object') {
    if ((0, _isEmpty["default"])(input)) {
      return '';
    } else {
      if (isArray) {
        return "[".concat(input.join(', '), "]");
      } else if (!isArray) {
        var values = Object.values(input);
        var entries = Object.keys(input).map(function (k, i) {
          return [k, values[i]];
        });
        return "{".concat(entries.map(function (entry) {
          return entry.join(': ');
        }).join(', '), "}");
      }
    }
  } else {
    return input ? '' + input : '';
  }
}

function castNumber(input) {
  var isArray = Array.isArray(input);

  if (typeof input === 'string' && input) {
    return _baseconvert["default"].hex2dec(_hash["default"].sha1().update(input).digest('hex'));
  } else if (isArray) {
    return input.reduce(function (a, b) {
      return castNumber(a) + castNumber(b);
    }, 0);
  } else if (input && _typeof(input) === 'object' && !isArray) {
    return castNumber(Object.values(input));
  } else {
    return input ? +input : 0;
  }
}

function castBoolean(input) {
  if (_typeof(input) === 'object' && (0, _isEmpty["default"])(input)) {
    return false;
  } else {
    return !!input;
  }
}

function castArray(input) {
  if (Array.isArray(input)) {
    return input;
  } else if (_typeof(input) === 'object' && input) {
    return Object.values(input);
  } else if (input || typeof input === 'boolean' || input === 0) {
    return [input];
  } else {
    return [];
  }
}

function castObject(input, defaultKey) {
  var isArray = Array.isArray(input);

  if (!(input || typeof input === 'boolean' || input === 0)) {
    return {};
  } else if (_typeof(input) === 'object' && !isArray) {
    return input;
  } else if (isArray) {
    return _objectSpread({}, input);
  } else {
    return _defineProperty({}, defaultKey, input);
  }
}

var TypeInsurance = /*#__PURE__*/function () {
  function TypeInsurance(input) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, TypeInsurance);

    this.input = input;
    this.defaultKey = options.hasOwnProperty('defaultKey') ? castString(options.defaultKey, {
      hash: true
    }) : 'key';
    this.string = this._string();
    this.number = this._number();
    this["boolean"] = this._boolean();
    this.array = this._array();
    this.object = this._object();
  }

  _createClass(TypeInsurance, [{
    key: "_string",
    value: function _string() {
      var input = this.input;
      return castString(input);
    }
  }, {
    key: "_number",
    value: function _number() {
      var input = this.input;
      return castNumber(input);
    }
  }, {
    key: "_boolean",
    value: function _boolean() {
      var input = this.input;
      return castBoolean(input);
    }
  }, {
    key: "_array",
    value: function _array() {
      var input = this.input;
      return castArray(input);
    }
  }, {
    key: "_object",
    value: function _object() {
      var input = this.input,
          defaultKey = this.defaultKey;
      return castObject(input, defaultKey);
    }
  }]);

  return TypeInsurance;
}();

exports["default"] = TypeInsurance;