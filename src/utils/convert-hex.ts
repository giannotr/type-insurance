export const ErrorNotDigit = new Error(
	'Input is not a single digit'
);

export const ErrorInvalidHexString = new Error(
	'Can only convert strings containing hexadecimal digits'
);

export function _isHex(input: string): boolean {
	const _exec = /[\da-f]*/im.exec(input);
	return _exec ? _exec[0] === input : false;
}

export function _hexMap(input: string): number {
	if(input && input.length === 1) {
		switch(input) {
			case 'a': return 10;
			case 'b': return 11;
			case 'c': return 12;
			case 'd': return 13;
			case 'e': return 14;
			case 'f': return 15;
			default: return +input;
		}
	} else {
		throw ErrorNotDigit;
	}
}

function convertHex(input: string): number {
	if(_isHex(input)) {
		const {length} = input;
		return input.split('').reduce((accum, value, index) => (
			accum + (_hexMap(value) * (16 ** (length - index - 1)))
		), 0);
	} else {
		throw ErrorInvalidHexString;
	}
}

export default convertHex;
