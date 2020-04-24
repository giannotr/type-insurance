# Type insurance

> Helper class to force (input) types, mainly for pure JavaScript environments

[![npm][npm-badge]][npm-url] [![build][build-badge]][build-url] [![coverage][coverage-badge]][coverage-url] [![Known Vulnerabilities][vulnerabilities-badge]][vulnerabilities-url] [![dependencies][dependencies-badge]][dependencies-url] [![size][size-badge]][size-url] [![types][types-badge]][types-url] [![unicorn][unicorn-badge]][unicorn-url] [![xo][xo-badge]][xo-url] [![license][license-badge]][license-url]

## Key notes / highlights

- Multi type container
- Ensures a type for a variable declaration (in opposition to type checking)
- e.g. when using the type 'any'
- Tailored for non type sensitive environments
- Useful when working with uncertain data from third party API's
- Returns actually `false` for empty objects (or any other implicitely falsy value)
- Simplistic approach
- Doesn't extend the built in `.prototype`s
- Clean and focused

## Install

```console
$ npm install type-insurance
```

## Usage (real world example)

```js
import TypeInsurance from 'type-insurance';

export const stripHTML = input => {
	const { string } = new TypeInsurance(input);
	return string.replace(/<[^>]*>/g, '');
}
```

This little utility function sanitizes an input parameter from HTML tags. `TypeInsurance` is used to force the regex to obtain a string no matter what.

## Usage (overview)

```js
import TypeInsurance from 'type-insurance';
// or using CommonJS
//const TypeInsurance = require('type-insurance');

const input = new TypeInsurance('foo');

console.log(input.string);  // "foo" 
console.log(input.number);  // 440071440
console.log(input.boolean); // true
console.log(input.array);   // ["foo"]
console.log(input.object);  // { key: "foo" }

const arr = new TypeInsurance([1, 2, 3]);

console.log(arr.string);  // "[1, 2, 3]" 
console.log(arr.number);  // 6
console.log(arr.boolean); // true
console.log(arr.array);   // [1, 2, 3]
console.log(arr.object);  // { 0: 1, 1: 2, 3: 2 }

// ...
```

## Assumptions

"Object", hereinafter is understood as a "real" object, meaning the the intersection of the sets "objects" and "not arrays".

All inputs should return themselves when requesting its original type. And all falsy values except `false` should map to

- `''` (string)
- `0` (number)
- `false` (boolean)
- `[]` (array)
- `{}` (object)

The inputs `[]` and `{}` should be treated as falsy inputs.

A non-empty string should map to

- The decimal representation of a hash conversion, unless the string contains only digits (number)
- `true` (bool)
- An array containing the string (array)
- An object with the default key and the string as the value (object)

where the edge case `'false'` should return `false` when requesting the `.boolean` property. Numbers shall work in an analogous fashion. `0` especially should yield `false`.

Respectively, `true|false` should return `"1"|"0"`, `1|0` and `[true|false]`.

## API

### Constructor: `new TypeInsurance(input, [options])`

A class instance of `TypeInsurnace` holds the properties `.string`, `.number`, `.boolean`, `.array` and `.object`, each in turn holding the accordingly typed values mapped from the input value.

Options get passed in as an object. Available options are:

- `defaultKey` (default: "key") - Specifies the default key for implicitly generated objects from strings and numbers
- `hashObjects` (default: false) - The `.number` prop returns a hash for object inputs
- `stringifyBoolsVerbatim` (default: false) - The `.string` prop returns stringified versions (`"true"|"false"`) for boolean inputs

### Properties

#### .string

Returns a string generated from the input of the constructor.

| Input type | Output |
| :---:      | :--- |
| string     | unchanged `input` |
| number     | Series of stringified digits |
| boolean    | `'true'` / `'false'` |
| array      | Stringified version of the array content |
| object     | Stringified version of the object content |

#### .number

Returns a number generated from the input of the constructor.

| Input type | Output |
| :---:      | :--- |
| string     | Hash converted to decimal |
| number     | unchanged `input` |
| boolean    | `1` / `0` |
| array      | Sum of all elemets |
| object     | Sum of all object values |

#### .boolean

Returns a number generated from the input of the constructor.

| Input type | Output |
| :---:      | :--- |
| string     | `true` if `input` is non-empty |
| number     | `false` if `input === 0` |
| boolean    | unchanged `input` |
| array      | `false` if `input === []` |
| object     | `false` if `input === {}` |

#### .array

Returns an array generated from the input of the constructor.

| Input type | Output |
| :---:      | :--- |
| string     | Array containing `input` |
| number     | *see above line* |
| boolean    | *see above line* |
| array      | unchanged `input` |
| object     | `Object.values(input)` |

#### .object

Returns an array generated from the input of the constructor.

| Input type | Output |
| :---:      | :--- |
| string     | Object containing the key value pair *[defaultKey]=`input`* |
| number     | *see above line* |
| boolean    | *see above line* |
| array      | `{...input}` |
| object     | unchanged `input` |

## Keywords

- data
- interface
- type
- types
- convert
- safety

## Dependencies

- [hash-sum](https://www.npmjs.com/package/hash-sum)
- [has-own-prop](https://www.npmjs.com/package/has-own-prop)
- [lodash](https://www.npmjs.com/package/lodash)

## Related

- [typeablejs](https://github.com/xpepermint/typeablejs) - A library for checking and casting types.
- [@sindresorhus/is](https://www.npmjs.com/package/@sindresorhus/is) - Type check values

## Maintainer

- [Ruben Giannotti](http://rubengiannotti.com) - ruben.giannotti@gmx.net - github.com/giannotr

[npm-badge]: https://img.shields.io/npm/v/type-insurance.svg
[npm-url]: https://www.npmjs.com/package/type-insurance
[build-badge]: https://travis-ci.org/giannotr/type-insurance.svg?branch=master
[build-url]: https://travis-ci.org/giannotr/type-insurance
[coverage-badge]: https://coveralls.io/repos/github/giannotr/type-insurance/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/giannotr/type-insurance?branch=master
[vulnerabilities-badge]: https://snyk.io/test/github/giannotr/type-insurance/badge.svg?targetFile=package.json
[vulnerabilities-url]: https://snyk.io/test/github/giannotr/type-insurance?targetFile=package.json
[dependencies-badge]: https://david-dm.org/giannotr/type-insurance.svg
[dependencies-url]: https://david-dm.org/giannotr/type-insurance
[size-badge]: https://badgen.net/packagephobia/publish/type-insurance
[size-url]: https://packagephobia.now.sh/result?p=type-insurance
[types-badge]: https://badgen.net/npm/types/type-insurance
[types-url]: https://github.com/giannotr/type-insurance/tree/master/src
[unicorn-badge]: https://img.shields.io/badge/unicorn-approved-ff69b4.svg
[unicorn-url]: https://www.youtube.com/watch?v=9auOCbH5Ns4
[xo-badge]: https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[xo-url]: https://github.com/xojs/xo
[license-badge]: https://img.shields.io/github/license/giannotr/type-insurance.svg
[license-url]: https://github.com/giannotr/type-insurance/blob/master/LICENSE
