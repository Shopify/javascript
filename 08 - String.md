## Strings

- [8.1](#8.1) <a name="8.1"></a> Use single quotes for strings. Using double quotes is acceptable only to avoid escaping contained single quotes.

  > Why? We don’t want to argue about this. Like, ever. Please use single quotes!

  ESLint rule: [`quotes`](http://eslint.org/docs/rules/quotes.html)

  ```javascript
  // bad
  const badOne = "Sorry not sorry";
  const badTwo = `No interpolation, no need`;
  const badThree = 'Escaping is \'no good\'';

  // good
  const goodOne = 'Nice and clean';
  const goodTwo = 'No interpolation, no backticks';
  const goodThree = "Double quotes are 'fine' in this case.";
  ```

- [8.2](#8.2) <a name="8.2"></a> Avoid long strings if possible. If you must include a long string, you can include multiline strings in code using backticks (`` ` ``). If the whitespace of multiline strings is unacceptable, you can use multiline string concatenation or an array of reasonable-length strings joined together.

  ```javascript
  // bad
  const badString = 'The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness'

  // fine, if newlines are acceptable
  const fineString = `
    The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men.
    Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness
  `;

  // good
  const goodString = 'The path of the righteous man is beset on all sides ' +
    'by the iniquities of the selfish and the tyranny of evil men. ' +
    'Blessed is he who, in the name of charity and good will, ' +
    'shepherds the weak through the valley of darkness';
  ```

- [8.3](#8.3) <a name="8.3"></a> Use template strings instead of concatenation.

  > Why? The template string syntax is easier to read and consistent with how we build strings programatically in other languages.

  ESLint rule: [`prefer-template`](http://eslint.org/docs/rules/prefer-template.html)

  ```javascript
  const name = 'Chris';

  // bad
  const badOne = 'DO NOT do it this way, ' + name + '!';
  const badTwo = ['And definitely not this way, either, ', name, '!'].join('');

  // good
  const goodOne = `Much better, ${name}!`;
  ```

[↑ scrollTo('#table-of-contents')](#table-of-contents)
