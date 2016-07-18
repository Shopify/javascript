# `import {jQuery} from 'Shopify'`

This guide provides a few guidelines on writing sensible jQuery.

## Table of contents

1. [Rules](#rules)
1. [Resources](#resources)

## Rules

- When starting a new project, make sure you really need jQuery before including it. DOM APIs have improved significantly, and most jQuery operations have [easy-to-use equivalents](http://youmightnotneedjquery.com) that avoid the need for a large library.

- Prefix all jQuery references with a `$`.

  ESLint rule: [`jquery-dollar-sign-reference`](packages/eslint-plugin-shopify/docs/rules/jquery-dollar-sign-reference.md)

  > Why? This allows another developer to easily identify a jQuery variable (in particular, to differentiate such an object from a vanilla DOM node).

  ```js
  // bad
  let sidebar = $('.sidebar');
  this.node = $(node);

  // good
  let $sidebar = $('.sidebar');
  this.$node = $(node);
  ```

- Cache jQuery lookups whenever you will use more than once. If possible, use jQuery’s excellent support for chaining to avoid having to store any local references.

  ```js
  // bad
  $('.sidebar').attr('aria-hidden', true);
  $('.sidebar').css({opacity: 0});

  // better
  let $sidebar = $('.sidebar');
  $sidebar.attr('aria-hidden', true);
  $sidebar.css({opacity: 0});

  // best
  $('.sidebar')
    .attr('aria-hidden', true)
    .css({opacity: 0});
  ```

- All CSS updates that do not have to be calculated dynamically should be applied by a CSS selector that is toggled by JavaScript (as opposed to manually setting the style in JavaScript).

  > Why? This allows all styling information to live in a single place (CSS), and simplifies testing. It also makes it easier to reverse styles, as you do not need to store the original values and re-apply them.

  ```js
  // bad
  $('.ui-banner').css({color: 'rgba(0, 0, 0, 0.8)', backgroundColor: 'orange'});

  // good
  $('.ui-banner').addClass('ui-banner--warning');
  ```

- Do not treat `$(document).ready()` (or, equivalently, passing a function to `$()`) as a dumping ground for your entire application. The ready block should be used to initialize your application, with all initialization happening in small, testable, dedicated functions.

- Use `on` for binding events rather than using its aliases.

  ```js
  // bad
  $('#BadButton').click(() => {});

  // good
  $('#GoodButton').on('click', () => {});
  ```

- When binding multiple callbacks to a jQuery object, use chaining.

  ```js
  // bad
  let $document = $(document);
  $document.on('ready', () => {});
  $document.on('click', () => {});

  // still bad
  $(document).on({
    ready() {},
    click() {},
  });

  // good
  $(document)
    .on('ready', () => {})
    .on('click', () => {});
  ```

[↑ scrollTo('#table-of-contents')](#table-of-contents)



## Resources

- [How JavaScript event delegation works](https://davidwalsh.name/event-delegate)

[↑ scrollTo('#table-of-contents')](#table-of-contents)
