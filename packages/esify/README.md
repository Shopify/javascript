# esify

`esify` is a combination of various tools with the purpose of automatically translating Shopify’s CoffeeScript to ESNext. Unless you work at Shopify, you probably don’t need this.

## Installation

```sh
npm install -g esify
```

## Usage

From the root of the Shopify directory, run this script with a single, relative CoffeeScript file, or a glob pattern. Wait for it to finish, and marvel at the clean ESNext code that is spit out beside the original file! Note this script does not delete the original CoffeeScript file — you should review the output before pushing any changes.

```sh
esify app/assets/javascripts/admin/lib/*.coffee
```
