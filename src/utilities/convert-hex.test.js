const convertHex = require('./convert-hex').default;

test('hex converter', () => {
	expect(convertHex('')).toBe(0);
	expect(convertHex('0')).toBe(0);
	expect(convertHex('a')).toBe(10);
	expect(convertHex('12')).toBe(18);
	expect(convertHex('2a')).toBe(42);
	expect(convertHex('1bfd423a6c5e')).toBe(30774551800926);
});
