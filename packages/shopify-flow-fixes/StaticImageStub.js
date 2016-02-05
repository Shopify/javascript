/* @flow */

// Image requires (`require('image!foo')`) don't resolve to anything in Flow, so we need
// to provide a stub for them. Additionally, there is a bug where a type description of
// `PropTypes.shape()` does not properly resolve the normal Flow `declare` system.
//
// The solution is to write a module that exports a variable in the shape that
// Image.source expects. Because those requires can appear in any file, the
// module has to be absolutely referenced; the best way to do this is to put it
// in an NPM module such as this one.
//
// React Native solves this in 0.12 by providing this module for us.
// See: https://github.com/facebook/react-native/commit/5b25f208c5ee025c7e727b880db9ad84ff9ea03c

module.exports = {
  __packager_asset: true, // eslint-disable-line camelcase
  isStatic: true,
  path: '/full/path/to/something.png',
  uri: 'icon',
  width: 100,
  height: 100,
  deprecated: true,
};
