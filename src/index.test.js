import TypeInsurance from '.';
import hash from 'hash.js';
import baseConvert from 'baseconvert';

for(const falsy of [undefined, null, '']) {
	const testFalsy = new TypeInsurance(falsy);

	test('falsy: ' + falsy, () => {
		expect(testFalsy.string).toBe('');
		expect(testFalsy.number).toBe(0);
		expect(testFalsy.boolean).toBe(false);
		expect(testFalsy.array).toEqual([]);
		expect(testFalsy.object).toEqual({});
	});
}

const testFalse = new TypeInsurance(false);

test('false', () => {
	expect(testFalse.string).toBe('false');
	expect(testFalse.number).toBe(0);
	expect(testFalse.boolean).toBe(false);
	expect(testFalse.array).toEqual([false]);
	expect(testFalse.object).toEqual({ key: false });
});

const testTrue = new TypeInsurance(true);

test('true', () => {
	expect(testTrue.string).toBe('true');
	expect(testTrue.number).toBe(1);
	expect(testTrue.boolean).toBe(true);
	expect(testTrue.array).toEqual([true]);
	expect(testTrue.object).toEqual({ key: true });
});

const testString = new TypeInsurance('foo');

test('non-empty string', () => {
	expect(testString.string).toBe('foo');
	expect(testString.number).toBe(baseConvert.hex2dec(hash.sha1().update('foo').digest('hex')));
	expect(testString.boolean).toBe(true);
	expect(testString.array).toEqual(['foo']);
	expect(testString.object).toEqual({ key: 'foo' });
});

const testNumber = new TypeInsurance(123);

test('non-zero number', () => {
	expect(testNumber.string).toBe('123');
	expect(testNumber.number).toBe(123);
	expect(testNumber.boolean).toBe(true);
	expect(testNumber.array).toEqual([123]);
	expect(testNumber.object).toEqual({ key: 123 });
});

const testZero = new TypeInsurance(0);

test('zero', () => {
	expect(testZero.string).toBe('0');
	expect(testZero.number).toBe(0);
	expect(testZero.boolean).toBe(false);
	expect(testZero.array).toEqual([0]);
	expect(testZero.object).toEqual({ key: 0 });
});

const testArray = new TypeInsurance([1, 2, 3]);

test('non-empty array', () => {
	expect(testArray.string).toBe('[1, 2, 3]');
	expect(testArray.number).toBe(6);
	expect(testArray.boolean).toBe(true);
	expect(testArray.array).toEqual([1, 2, 3]);
	expect(testArray.object).toEqual({ 0: 1, 1: 2, 2: 3 });
});

const testObject = new TypeInsurance({ a: 1, b: 2, c: 3 });

test('non-empty object', () => {
	expect(testObject.string).toBe('{a: 1, b: 2, c: 3}');
	expect(testObject.number).toBe(6);
	expect(testObject.boolean).toBe(true);
	expect(testObject.array).toEqual([1, 2, 3]);
	expect(testObject.object).toEqual({ a: 1, b: 2, c: 3 });
});

const testEmptyArray = new TypeInsurance([]);

test('empty array', () => {
	expect(testEmptyArray.string).toBe('');
	expect(testEmptyArray.number).toBe(0);
	expect(testEmptyArray.boolean).toBe(false);
	expect(testEmptyArray.array).toEqual([]);
	expect(testEmptyArray.object).toEqual({});
});

const testEmptyObject = new TypeInsurance({});

test('empty object', () => {
	expect(testEmptyObject.string).toBe('');
	expect(testEmptyObject.number).toBe(0);
	expect(testEmptyObject.boolean).toBe(false);
	expect(testEmptyObject.array).toEqual([]);
	expect(testEmptyObject.object).toEqual({});
});
