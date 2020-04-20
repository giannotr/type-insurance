# Changelog

## Unreleased changes

### Fixed

- Shortened internal method `_isHex`
- Improved the performance of `convertHex`
- Added tests for `_isHex` and `_hexMap`

## Released changes

### 1.1.2 - 2020-04-20

#### Fixed

- Critical bug: a string containing only digits should map to the number coercion instead to a hash
- Increased test coverage
