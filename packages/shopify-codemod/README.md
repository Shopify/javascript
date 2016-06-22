# shopify-codemod

This repository contains a collection of Codemods written with [JSCodeshift](https://github.com/facebook/jscodeshift) that will help update our old, crusty JavaScript to nice, clean JavaScript.

## Usage

1. `npm install -g jscodeshift`
2. `git clone https://github.com/shopify/javascript` or [download the zip file](https://github.com/shopify/javascript/archive/master.zip)
3. `npm run setup`
4. `jscodeshift -t <codemod-script> <file>`
5. Use the `-d` option for a dry-run and use `-p` to print the output for comparison.

## Documentation

The documentation for each transform can be found in the [docs folder](docs).

## Contributing

All code is written in ES2015+ in the `transforms/` directory. Make sure to add tests for all new transforms and features. A custom `transforms(fixtureName)` assertion is provided which checks that the passed transformer converts the fixture found at `test/fixtures/{{fixtureName}}.input.js` to the one found at `test/fixtures/{{fixtureName}}.output.js`. You can run `npm test` to run all tests, or `npm run test:watch` to have Mocha watch for changes and re-run the tests.


### Development helpers
`bin/create-transform your-transform-name-here` creates a transform file, a test file, some empty test fixtures, and a doc file.

`bin/rename-transform old-transform-name new-transform-name` renames the transforms file, test file, fixture directory, and doc file.
