# chai-jscodeshift

**chai-jscodeshift** provides a custom assertion for [jscodeshift](https://github.com/facebook/jscodeshift) to check whether a given input fixture matches an output fixture after being transformed by the transformer under test.

## Setup

```js
import chai from 'chai';
import chaiJSCodeShift from 'chai-jscodeshift';
chai.use(chaiJSCodeShift());
```

## Usage

```js
import myTransform from '../src/my-transform';

describe('myTransform', () => {
  it('transforms properly', () => {
    expect(myTransform).to.transform('my-fixture');

    // or

    assert.transforms(myTransform, 'my-fixture');
  });
});
```

## Customization

By default, this plugin will look for fixtures in the fixtures in the working directory. You will probably want to customize this by setting the directory in which your fixtures appear:

```js
import path from 'path';

chai.use(chaiJSCodeShift({
  fixtureDirectory: path.join(__dirname, 'fixtures')
}));
```

When you declare that you want a transformer to transform a particular fixture, this plugin will look for a file named `<fixtureName>.input.js`, relative to the `fixtureDirectory` declared above. It will read this file, transform the contents using your transformer, and compare it against a file named `<fixtureName>.output.js` relative to the fixture directory. You can customize either of these paths by passing a custom `inputFixturePath` or `outputFixturePath` in your options (both of which take two arguments, the fixture name and the root of the fixture directory):

```js
chai.use(chaiJSCodeShift({
  fixtureDirectory: path.join(__dirname, 'fixtures'),
  inputFixturePath(fixtureName, fixtureDirectory) {
    return path.join(fixtureDirectory, 'input', `${fixtureName}.js`);
  },
  inputFixturePath(fixtureName, fixtureDirectory) {
    return path.join(fixtureDirectory, 'output', `${fixtureName}.js`);
  },
}));
```

You can also set custom options that will be passed as the third argument to your transformer on every call using the `transformOptions` configuration option:

```js
chai.use(chaiJSCodeShift({
  transformOptions: {
    printOptions: {space: 'single'},
  },
}));
```
