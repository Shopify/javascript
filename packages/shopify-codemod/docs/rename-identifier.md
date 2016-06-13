### `rename-identifier`

Renames a user-defined list of identifiers. Use the `renameIdentifiers` option to specify the old name/ new name pairs.

```sh
jscodeshift -t shopify-codemods/transforms/rename-identifier <file>
```

#### Example

```js
// with {renameIdentifiers: {jQuery: '$'}}
jQuery('.foo').find('.bar');
jQuery.ajax();
foo.jQuery('.bar');

// BECOMES:

$('.foo').find('.bar');
$.ajax();
foo.jQuery('.bar');
```
