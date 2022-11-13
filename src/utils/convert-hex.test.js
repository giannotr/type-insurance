const convertHex = require('./convert-hex').default;
const {
	ErrorNotDigit,
	ErrorInvalidHexString,
	_isHex,
	_hexMap,
} = require('./convert-hex');

test('hex string tester', () => {
	expect(_isHex(undefined)).toBe(false);
	expect(_isHex(null)).toBe(false);
	expect(_isHex(false)).toBe(false);
	expect(_isHex(0)).toBe(false);
	expect(_isHex('')).toBe(true);
	expect(_isHex('0')).toBe(true);
	expect(_isHex('a')).toBe(true);
	expect(_isHex('1')).toBe(true);
	expect(_isHex('1a')).toBe(true);
	expect(_isHex('6d351cc')).toBe(true);
	expect(_isHex('g')).toBe(false);
	expect(_isHex('123z')).toBe(false);
});

test('hex digit mapper', () => {
	expect(_hexMap('1')).toBe(1);
	expect(_hexMap('2')).toBe(2);
	expect(_hexMap('3')).toBe(3);
	expect(_hexMap('4')).toBe(4);
	expect(_hexMap('5')).toBe(5);
	expect(_hexMap('6')).toBe(6);
	expect(_hexMap('7')).toBe(7);
	expect(_hexMap('8')).toBe(8);
	expect(_hexMap('9')).toBe(9);
	expect(_hexMap('a')).toBe(10);
	expect(_hexMap('b')).toBe(11);
	expect(_hexMap('c')).toBe(12);
	expect(_hexMap('d')).toBe(13);
	expect(_hexMap('e')).toBe(14);
	expect(_hexMap('f')).toBe(15);
	expect(() => _hexMap('')).toThrow(ErrorNotDigit);
	expect(() => _hexMap(0)).toThrow(ErrorNotDigit);
	expect(() => _hexMap(10)).toThrow(ErrorNotDigit);
	expect(() => _hexMap(undefined)).toThrow(ErrorNotDigit);
	expect(() => _hexMap(null)).toThrow(ErrorNotDigit);
	expect(() => _hexMap(false)).toThrow(ErrorNotDigit);
});

test('hex converter', () => {
	expect(convertHex('')).toBe(0);
	expect(convertHex('0')).toBe(0);
	expect(convertHex('a')).toBe(10);
	expect(convertHex('12')).toBe(18);
	expect(convertHex('2a')).toBe(42);
	expect(convertHex('1bfd423a6c5e')).toBe(30774551800926);
	expect(() => convertHex('zzz')).toThrow(ErrorInvalidHexString);
	expect(() => convertHex(undefined)).toThrow(ErrorInvalidHexString);
	expect(() => convertHex(null)).toThrow(ErrorInvalidHexString);
	expect(() => convertHex(false)).toThrow(ErrorInvalidHexString);
	expect(() => convertHex(0)).toThrow(ErrorInvalidHexString);
	expect(() => convertHex(1)).toThrow(ErrorInvalidHexString);
});
