const hexToDec = require('./hex-to-dec').default;

test('hex converter', () => {
	expect(hexToDec('')).toBe(0);
	expect(hexToDec('0')).toBe(0);
	expect(hexToDec('a')).toBe(10);
	expect(hexToDec('12')).toBe(18);
	expect(hexToDec('2a')).toBe(42);
	expect(hexToDec('13f09ad284b5e67c')).toBe(1436818510091511300);
});
