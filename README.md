# `import JavaScript from 'Shopify'`

This repository contains everything you should need for writing JavaScript at Shopify. In it you’ll find such things as our linting configs, custom linting rules, and project generators. Below, you’ll find the most important thing: a living styleguide documenting how and why we write JavaScript the way we do.

> Why? All code in any code-base should look like a single person typed it, no matter how many people contributed. If we all follow along with the rules detailed below, we can focus our efforts on more meaningful problems.



## Table of contents

1. [Using this guide](#using-this-guide)
1. [Naming](#naming)
1. [Punctuation](#punctuation)
1. [Whitespace](#whitespace)
1. [References](#references)
1. [Control flow](#control-flow)
1. [Objects](#objects)
1. [Arrays](#arrays)
1. [Strings](#strings)
1. [Functions](#functions)
1. [Types and casting](#types-and-casting)
1. [ES2015 features](#es2015-features)
1. [Resources](#resources)

There are a few additional styleguides for libraries commonly used at Shopify that serve to augment this guide:

- [jQuery styleguide](jquery/)
- [React styleguide](react/)

Have a legacy codebase? Can’t use ES2015? Our [legacy styleguide](legacy/) is available in this repo just for you. We also have a dedicated [CoffeeScript styleguide](https://github.com/Shopify/CoffeeScript-Style-Guide) for projects that are still using CoffeeScript (new projects should use ES2015+, though!).



## Using this guide

Many of the following rules are enforced by our [shared ESLint config](packages/eslint-config-shopify), which you can use in most editors and CI environments. To use it, you will need to have [Node.js and npm installed](https://docs.npmjs.com/getting-started/installing-node). Once these are installed, you have two options for adding ESLint to your project: using our Yeoman generator, or installing everything manually.

### Yeoman Generator

We’ve built a [Yeoman](http://yeoman.io) generator for quickly adding ESLint to your project. First, install Yeoman and the generator globally:

```bash
npm install -g yo generator-eslint-shopify
```

Then, use Yeoman’s `yo` command to run the generator, and follow the generator’s prompts.

```bash
yo eslint-shopify
```

This generator will install all the required dependencies and add a linting script to your project, so that you can now run the following to run ESLint:

```bash
npm run lint
```

### Manually

```bash
npm install eslint eslint-config-shopify eslint-plugin-shopify --save-dev

# also, if using ES2015+:
npm install babel-eslint --save-dev

# finally, if using React:
npm install eslint-plugin-react --save-dev
```

Once these are installed, you will need to add a `.eslintrc` file at the root of your project that specifies that you'd like to extend the Shopify configuration.

```json
{
  "extends": "shopify", // or "shopify/es5" for the ES5 config, "shopify/react" for the React config
  "parser": "babel-eslint", // unless using ES5
  "plugins": [
    "shopify", // add "react" here too if in a React project
  ],
  "env": {} // choose your environments: http://eslint.org/docs/user-guide/configuring.html#specifying-environments
}
```

You can now use ESLint. The easiest way to do this is by adding a linting script to your `package.json`:

```json
{
  "scripts": {
    "lint": "eslint . --max-warnings 0"
  }
}
```

And, finally, run your new script:

```bash
npm run lint
```
