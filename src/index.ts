import isEmpty from 'lodash/isEmpty';
import hash from 'hash-sum';
import convertHex from './utilities/convert-hex';

function castString(input: any): string {
	if(!input && typeof input === 'boolean') {
		return 'false';
	} else if(input === 0) {
		return '0';
	} else if(input && typeof input === 'object') {
		if(isEmpty(input)) {
			return '';
		} else {
			return JSON.stringify(input);
		}
	}

	return input ? '' + input : '';
}

function castNumber(input: any): number {
	const isArray = Array.isArray(input);

	if(typeof input === 'string' && input) {
		return convertHex(hash(input));
	} else if(isArray) {
		return input.reduce((a: any, b: any) => castNumber(a) + castNumber(b), 0);
	} else if(input && typeof input === 'object' && !isArray) {
		return castNumber(Object.values(input));
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

function castArray(input: any): object {
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
	defaultKey?: string;
}

export default class TypeInsurance {
	readonly input: string;
	readonly defaultKey: string;

	public string: string;
	public number: number;
	public boolean: boolean;
	public array: object;
	public object: object;

	constructor(input: any, options: Options) {
		this.input = input;
		this.defaultKey = 'key';

		if(options) {
			this.defaultKey = castString(options.defaultKey);
		}

		this.string = this._string();
		this.number = this._number();
		this.boolean = this._boolean();
		this.array = this._array();
		this.object = this._object();
	}

	_string() {
		const {input} = this;
		return castString(input);
	}

	_number() {
		const {input} = this;
		return castNumber(input);
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
