//import hash from 'hash.js';
//import objectHash from 'object-hash';
//import baseConvert from 'baseconvert';
const hash = require('hash.js');
//const objectHash = require('object-hash');
const baseConvert = require('baseconvert');
const isEmpty = require('lodash/isEmpty');

function castString(input) {
  const isArray = Array.isArray(input);

  if(!input && typeof input === 'boolean') {
    return 'false';
  } else if(input === 0) {
    return '0';
  } else if(input && typeof input === 'object') {
    if(isEmpty(input)) {
      return '';
    } else {
      if(isArray) {
        return `[${input.join(', ')}]`;
      } else if(!isArray) {
        const values = Object.values(input);
        const entries = Object.keys(input).map((k, i) => [k, values[i]]);
        return `{${entries.map(e => e.join(': ')).join(', ')}}`;
      }
    }
  } else {
    return input ? ''+input : '';
  }
}

//console.log(castString({ a: 1, b: 2, c: 3 }));

function castNumber(input) {
  const isArray = Array.isArray(input);

  if(typeof input === 'string' && input) {
    return baseConvert.hex2dec(hash.sha1().update(input).digest('hex'));
  } else if(isArray) {
    return input.reduce((a, b) => castNumber(a) + castNumber(b), 0);
  } else if(input && typeof input === 'object' && !isArray) {
    return castNumber(Object.values(input));
  } else {
    return input ? +input : 0;
  }
}

function castBoolean(input) {
  if(typeof input === 'object' && isEmpty(input)) {
    return false;
  } else {
    return !!input;
  }
}

function castArray(input) {
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

function castObject(input, defaultKey) {
  const isArray = Array.isArray(input);

  if(!(input || typeof input === 'boolean' || input === 0)) {
    return {};
  } else if(typeof input === 'object' && !isArray) {
    return input;
  } else if(isArray) {
    return {...input};
  } else {
    return { [defaultKey]: input };
  }
}

class TypeInsurance {
  constructor(input, options = {}) {
    this.input = input;

    this.defaultKey = options.hasOwnProperty('defaultKey') ?
      castString(options.defaultKey, { hash: true }) : 'key';
    this.hashedObjects = options.hasOwnProperty('hashedObjects') ?
      castBoolean(options.hashedObjects) : false;

    this.string = this._string();
    this.number = this._number();
    this.boolean = this._boolean();
    this.array = this._array();
    this.object = this._object();
  }
  
  _string() {
    const { input } = this;
    return castString(input);
  }
  
  _number() {
    const { input } = this;
    return castNumber(input);
  }
  
  _boolean() {
    const { input } = this;
    return castBoolean(input);
  }
  
  _array() {
    const { input } = this;
    return castArray(input);
  }
  
  _object() {
    const { input, defaultKey } = this;
    return castObject(input, defaultKey);
  }
}

//export default TypeInsurance;
module.exports = TypeInsurance;
