# Changelog

## Released changes

### 1.2.8 - 2022-11-13

- Fixed dependencies badge.

### 1.2.7 - 2022-11-13

- Updated snyk.

### 1.2.6 - 2022-11-13

- Removed clutter.

### 1.2.5 - 2022-11-13

- For string inputs the `.array` prop now returns an array containg the string itself on the first index and its single letters on the consecutive indices.

### 1.2.4 - 2020-05-03

#### Added

- `.snyk` config with a lodash vulnerability fix.

### 1.2.3 - 2020-04-26

#### Fixed

- The `.array` prop returns the correct type.

### 1.2.1 - 2020-04-26

#### Fixed

- `options` are actually optional now.

### 1.2.0 - 2020-04-25

#### Added

- Option for verbatim stringification of boolean types.
- Option for returning hash values of object types.

### 1.1.3 - 2020-04-24

#### Fixed

- Shortened internal method `_isHex`.
- Improved the performance of `convertHex`.
- Added tests for `_isHex` and `_hexMap`.

### 1.1.2 - 2020-04-20

#### Fixed

- Critical bug: a string containing only digits should map to the number coercion instead to a hash.
- Increased test coverage.
