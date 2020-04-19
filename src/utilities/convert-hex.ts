function _isHex(input: string): boolean {
	const _exec = /[\da-f]*/im.exec(input);
	let match;
	if(_exec) {
		[match] = _exec;
	}

	return match === input;
}

function _hexMap(input: string): number {
	switch(input) {
		case 'a': return 10;
		case 'b': return 11;
		case 'c': return 12;
		case 'd': return 13;
		case 'e': return 14;
		case 'f': return 15;
		default: return +input;
	}
}

function convertHex(input: string): number {
	if(_isHex(input)) {
		return input.split('').reverse().reduce((accum, value, index) => (
			accum + (_hexMap(value) * (16 ** index))
		), 0);
	} else {
		throw new Error('Can only convert string containing hexadecimal digits');
	}
}

export default convertHex;
