"use strict";

var _index = _interopRequireDefault(require("./index"));

var _hash = _interopRequireDefault(require("hash.js"));

var _baseconvert = _interopRequireDefault(require("baseconvert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _loop = function _loop() {
  var falsy = _arr[_i];
  var testFalsy = new _index["default"](falsy);
  test('falsy: ' + falsy, function () {
    expect(testFalsy.string).toBe('');
    expect(testFalsy.number).toBe(0);
    expect(testFalsy["boolean"]).toBe(false);
    expect(testFalsy.array).toEqual([]);
    expect(testFalsy.object).toEqual({});
  });
};

for (var _i = 0, _arr = [undefined, null, '']; _i < _arr.length; _i++) {
  _loop();
}

var testFalse = new _index["default"](false);
test('false', function () {
  expect(testFalse.string).toBe('false');
  expect(testFalse.number).toBe(0);
  expect(testFalse["boolean"]).toBe(false);
  expect(testFalse.array).toEqual([false]);
  expect(testFalse.object).toEqual({
    key: false
  });
});
var testTrue = new _index["default"](true);
test('true', function () {
  expect(testTrue.string).toBe('true');
  expect(testTrue.number).toBe(1);
  expect(testTrue["boolean"]).toBe(true);
  expect(testTrue.array).toEqual([true]);
  expect(testTrue.object).toEqual({
    key: true
  });
});
var testString = new _index["default"]('foo');
test('non-empty string', function () {
  expect(testString.string).toBe('foo');
  expect(testString.number).toBe(_baseconvert["default"].hex2dec(_hash["default"].sha1().update('foo').digest('hex')));
  expect(testString["boolean"]).toBe(true);
  expect(testString.array).toEqual(['foo']);
  expect(testString.object).toEqual({
    key: 'foo'
  });
});
var testNumber = new _index["default"](123);
test('non-zero number', function () {
  expect(testNumber.string).toBe('123');
  expect(testNumber.number).toBe(123);
  expect(testNumber["boolean"]).toBe(true);
  expect(testNumber.array).toEqual([123]);
  expect(testNumber.object).toEqual({
    key: 123
  });
});
var testZero = new _index["default"](0);
test('zero', function () {
  expect(testZero.string).toBe('0');
  expect(testZero.number).toBe(0);
  expect(testZero["boolean"]).toBe(false);
  expect(testZero.array).toEqual([0]);
  expect(testZero.object).toEqual({
    key: 0
  });
});
var testArray = new _index["default"]([1, 2, 3]);
test('non-empty array', function () {
  expect(testArray.string).toBe('[1, 2, 3]');
  expect(testArray.number).toBe(6);
  expect(testArray["boolean"]).toBe(true);
  expect(testArray.array).toEqual([1, 2, 3]);
  expect(testArray.object).toEqual({
    0: 1,
    1: 2,
    2: 3
  });
});
var testObject = new _index["default"]({
  a: 1,
  b: 2,
  c: 3
});
test('non-empty object', function () {
  expect(testObject.string).toBe('{a: 1, b: 2, c: 3}');
  expect(testObject.number).toBe(6);
  expect(testObject["boolean"]).toBe(true);
  expect(testObject.array).toEqual([1, 2, 3]);
  expect(testObject.object).toEqual({
    a: 1,
    b: 2,
    c: 3
  });
});
var testEmptyArray = new _index["default"]([]);
test('empty array', function () {
  expect(testEmptyArray.string).toBe('');
  expect(testEmptyArray.number).toBe(0);
  expect(testEmptyArray["boolean"]).toBe(false);
  expect(testEmptyArray.array).toEqual([]);
  expect(testEmptyArray.object).toEqual({});
});
var testEmptyObject = new _index["default"]({});
test('empty object', function () {
  expect(testEmptyObject.string).toBe('');
  expect(testEmptyObject.number).toBe(0);
  expect(testEmptyObject["boolean"]).toBe(false);
  expect(testEmptyObject.array).toEqual([]);
  expect(testEmptyObject.object).toEqual({});
});