import isEmpty from 'lodash/isEmpty';
import hasOwnProp from 'has-own-prop';
import hash from 'hash-sum';
import convertHex from './utilities/convert-hex';

function castString(input: any, stringifyBoolVerb = false): string {
	let _return = input ? '' + input : '';

	if(typeof input === 'boolean') {
		if(stringifyBoolVerb) {
			_return = input ? 'true' : 'false';
		} else {
			_return = input ? '1' : '0';
		}
	} else if(typeof input === 'object') {
		if(isEmpty(input)) {
			_return = '';
		} else {
			_return = JSON.stringify(input);
		}
	} else if(input === 0) {
		_return = '0';
	}

	return _return;
}

function castNumber(input: any, hashObjects = false): number {
	const match = /\d+/.exec(input);
	const isDigitString = match ? match[0] === input : false;
	const isArray = Array.isArray(input);

	const _hash = convertHex(hash(input));

	if(typeof input === 'string' && !isDigitString && input) {
		return _hash;
	} else if(input && typeof input === 'object') {
		if(hashObjects) {
			return _hash;
		} else {
			if(isArray) {
				return input.reduce(
					(a: any, b: any) => (castNumber(a) + castNumber(b)), 0
				);
			} else {
				return castNumber(Object.values(input));
			}
		}
	} else {
		return input ? +input : 0;
	}
}

function castBoolean(input: any): boolean {
	if(typeof input === 'object' && isEmpty(input)) {
		return false;
	} else {
		return !!input;
	}
}

function castArray(input: any): any[] {
	if(Array.isArray(input)) {
		return input;
	} else if(typeof input === 'object' && input) {
		return Object.values(input);
	} else if(input || typeof input === 'boolean' || input === 0) {
		return [input];
	} else {
		return [];
	}
}

function castObject(input: any, defaultKey: string): object {
	const isArray = Array.isArray(input);

	if(!(input || typeof input === 'boolean' || input === 0)) {
		return {};
	} else if(typeof input === 'object' && !isArray) {
		return input;
	} else if(isArray) {
		return {...input};
	} else {
		return {[defaultKey]: input};
	}
}

interface Options {
	defaultKey: string;
	hashObjects: boolean;
	stringifyBoolsVerbatim: boolean;
}

export default class TypeInsurance {
	readonly input: string;
	readonly defaultKey: string;
	readonly hashObjects: boolean;
	readonly stringifyBoolsVerbatim: boolean;

	public string: string;
	public number: number;
	public boolean: boolean;
	public array: any[];
	public object: object;

	constructor(input: any, options?: Options) {
		this.input = input;
		this.defaultKey = 'key';
		this.hashObjects = false;
		this.stringifyBoolsVerbatim = false;

		if(options) {
			if(hasOwnProp(options, 'defaultKey')) {
				this.defaultKey = castString(options.defaultKey);
			}

			if(hasOwnProp(options, 'hashObjects')) {
				this.hashObjects = options.hashObjects;
			}

			if(hasOwnProp(options, 'stringifyBoolsVerbatim')) {
				this.stringifyBoolsVerbatim = options.stringifyBoolsVerbatim;
			}
		}

		this.string = this._string();
		this.number = this._number();
		this.boolean = this._boolean();
		this.array = this._array();
		this.object = this._object();
	}

	_string() {
		const {input, stringifyBoolsVerbatim} = this;
		return castString(input, stringifyBoolsVerbatim);
	}

	_number() {
		const {input, hashObjects} = this;
		return castNumber(input, hashObjects);
	}

	_boolean() {
		const {input} = this;
		return castBoolean(input);
	}

	_array() {
		const {input} = this;
		return castArray(input);
	}

	_object() {
		const {input, defaultKey} = this;
		return castObject(input, defaultKey);
	}
}
