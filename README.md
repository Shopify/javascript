# `import JavaScript from 'Shopify'`

This repository contains everything you should need for writing JavaScript at Shopify. In it you’ll find such things as our linting configs, custom linting rules, and project generators. Below, you’ll find the most important thing: a living styleguide documenting how and why we write JavaScript the way we do.

> Why? All code in any code-base should look like a single person typed it, no matter how many people contributed. If we all follow along with the rules detailed below, we can focus our efforts on more meaningful problems.

Many of these rules are enforced by our [shared ESLint config](packages/eslint-config-shopify), which you can use in most editors and CI environments. We strongly encourage its use, and provide a [Yeoman generator](packages/generator-eslint-shopify) for quickly setting it up in your project.



## Table of contents

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
