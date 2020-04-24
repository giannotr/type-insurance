const TypeInsurance = require('.').default;

for(const falsy of [undefined, null, '']) {
	test('falsy: ' + falsy, () => {
		const test = new TypeInsurance(falsy);

		expect(test.string).toBe('');
		expect(test.number).toBe(0);
		expect(test.boolean).toBe(false);
		expect(test.array).toEqual([]);
		expect(test.object).toEqual({});
	});
}

test('false', () => {
	const test = new TypeInsurance(false);

	expect(test.string).toBe('0');
	expect(test.number).toBe(0);
	expect(test.boolean).toBe(false);
	expect(test.array).toEqual([false]);
	expect(test.object).toEqual({ key: false });
});

test('true', () => {
	const test = new TypeInsurance(true);

	expect(test.string).toBe('1');
	expect(test.number).toBe(1);
	expect(test.boolean).toBe(true);
	expect(test.array).toEqual([true]);
	expect(test.object).toEqual({ key: true });
});

test('verbatim stringification of booleans', () => {
	const testA = new TypeInsurance(false, {stringifyBoolsVerbatim: true});
	expect(testA.string).toBe('false');

	const testB = new TypeInsurance(true, {stringifyBoolsVerbatim: true});
	expect(testB.string).toBe('true');
});

test('non-empty string', () => {
	const test = new TypeInsurance('foo');

	expect(test.string).toBe('foo');
	expect(test.number).toBe(440071440);
	expect(test.boolean).toBe(true);
	expect(test.array).toEqual(['foo']);
	expect(test.object).toEqual({ key: 'foo' });

	const testAlt = new TypeInsurance('12345');

	expect(testAlt.number).toBe(12345);
});

test('non-zero number', () => {
	const test = new TypeInsurance(123);

	expect(test.string).toBe('123');
	expect(test.number).toBe(123);
	expect(test.boolean).toBe(true);
	expect(test.array).toEqual([123]);
	expect(test.object).toEqual({ key: 123 });
});

test('zero', () => {
	const test = new TypeInsurance(0);

	expect(test.string).toBe('0');
	expect(test.number).toBe(0);
	expect(test.boolean).toBe(false);
	expect(test.array).toEqual([0]);
	expect(test.object).toEqual({ key: 0 });
});

test('non-empty array', () => {
	const test = new TypeInsurance([1, 2, 3]);

	expect(test.string).toBe('[1,2,3]');
	expect(test.number).toBe(6);
	expect(test.boolean).toBe(true);
	expect(test.array).toEqual([1, 2, 3]);
	expect(test.object).toEqual({ 0: 1, 1: 2, 2: 3 });
});

test('non-empty object', () => {
	const test = new TypeInsurance({ a: 1, b: 2, c: 3 });

	expect(test.string).toBe('{"a":1,"b":2,"c":3}');
	expect(test.number).toBe(6);
	expect(test.boolean).toBe(true);
	expect(test.array).toEqual([1, 2, 3]);
	expect(test.object).toEqual({ a: 1, b: 2, c: 3 });
});

test('empty array', () => {
	const test = new TypeInsurance([]);

	expect(test.string).toBe('');
	expect(test.number).toBe(0);
	expect(test.boolean).toBe(false);
	expect(test.array).toEqual([]);
	expect(test.object).toEqual({});
});

test('empty object', () => {
	const test = new TypeInsurance({});
	
	expect(test.string).toBe('');
	expect(test.number).toBe(0);
	expect(test.boolean).toBe(false);
	expect(test.array).toEqual([]);
	expect(test.object).toEqual({});
});

test('haseObjects option', () => {
	const testA = new TypeInsurance(['foo'], {hashObjects: true});
	expect(testA.number).toBe(2785136192);

	const testB = new TypeInsurance({foo: 'bar'}, {hashObjects: true});
	expect(testB.number).toBe(1270567586);
});

test('defaultKey option', () => {
	const test = new TypeInsurance('bar', {
		defaultKey: 'foo'
	});

	expect(test.object).toEqual({ foo: 'bar' });
});
