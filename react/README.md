# `import {React} from 'Shopify'`

This guide provides a few guidelines on writing sensible React. Many of these rules are enforced by our [shared ESLint configuration](../packages/eslint-plugin-shopify), which makes use of the excellent [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react) project.



## Table of contents

1. [Naming](#naming)
1. [Whitespace](#whitespace)
1. [Punctuation](#punctuation)
1. [Components](#components)
1. [Props](#props)
1. [Modules](#modules)
1. [Resources](#resources)



## Naming

- [1.1](#1.1) <a name="1.1"></a> Always use a `.js` file extension, even when that file contains JSX.

- [1.2](#1.2) <a name="1.2"></a> React components are always named using PascalCase. Use camelCase for their instances.

  ESLint rule: [`jsx-pascal-case`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md)

  ```js
  // bad
  class financialReport extends Component {}
  let MyReport = <financialReport />;

  // good
  class FinancialReport extends Component {}
  let myReport = <FinancialReport />;
  ```

  - Use camelCase for all props.

  ```js
  // bad
  class BadComponent extends Component {
    static propTypes = {my_prop: PropTypes.bool}
  }

  // good
  class GoodComponent extends Component {
    static propTypes = {myProp: PropTypes.bool}
  }
  ```

[↑ scrollTo('#table-of-contents')](#table-of-contents)



## Whitespace

- [2.1](#2.1) <a name="2.1"></a> When there are no children for a component, use the self-closing tag. When using a self-closing tag for a component written on a single line, leave a single space between the last character and the closing of the tag.

  ESLint rules: [`self-closing-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md), [`jsx-space-before-closing`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-space-before-closing.md)

  ```js
  // bad
  <BadOne></BadOne>
  <BadTwo/>
  <BadThree    />
  <BadFour
    />

  // good
  <Good />
  ```

- [2.2](#2.2) <a name="2.2"></a> When writing a component that has multiple props, put a single prop per line, with two spaces of indentation, and a closing tag on a newline that aligns with the opening tag.

  ESLint rules: [`jsx-closing-bracket-location`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md) and [`jsx-first-prop-new-line`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-first-prop-new-line.md)

  ```js
  // bad
  <BadOne aLongPropName="a little too long"
          anotherLongishPropName />

  <BadTwo
    aLongPropName="a little too long"
    anotherLongishPropName>
      <SubComponent>
  </BadTwo>

  // good
  <GoodOne
    aLongPropName="a little too long"
    anotherLongishPropName
  />

  <GoodTwo
    aLongPropName="a little too long"
    anotherLongishPropName
  >
    <SubComponent>
  </GoodTwo>
  ```

- [2.3](#2.3) <a name="2.3"></a> Never include spaces within the curly braces of JSX properties. Values within JSX properties should adhere to the same rules as if they appeared anywhere else in JavaScript (no interior spaces for object braces or brackets, interior space for function braces).

  ESLint rule: [`jsx-curly-spacing`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md)

  ```js
  // bad
  <BadOne prop={ () => {console.log('callback');} } />
  <BadTwo prop={[ 1, 2, 3 ]} />
  <BadThree prop={{ foo: 'bar' }} />

  // good
  <BadOne prop={() => { console.log('callback'); }} />
  <BadTwo prop={[1, 2, 3]} />
  <BadThree prop={{foo: 'bar'}} />
  ```

- [2.4](#2.4) <a name="2.4"></a> Do not place a space on either side of the `=` in prop declarations.

  ESLint rule: [`jsx-equals-spacing`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-equals-spacing.md)

  ```js
  // bad
  <Bad status = "is not very good" />

  // good
  <Good status="is great!" />
  ```

- [2.5](#2.5) <a name="2.5"></a> When props span over multiple lines, list one prop per line (with no props on the same line as the opening tag).

  ESLint rule: [`jsx-first-prop-new-line`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-first-prop-new-line.md)

  ```js
  // bad
  <Bad status="is not very good"
    redeemable={false}
  />

  <Bad
    status="is not very good" redeemable={false}
  />

  // good
  <Good status="is great!" needsWork={false} />

  <Good
    status="is great!"
    needsWork={false}
  />
  ```

[↑ scrollTo('#table-of-contents')](#table-of-contents)



## Punctuation

- [3.1](#3.1) <a name="3.1"></a> Use double quotes for JSX attributes.

  > Why? Regular HTML attributes (and, in general, XML) typically use double quotes, so JSX attribute names follow this convention.

  ESLint rule: [`jsx-quotes`](http://eslint.org/docs/rules/jsx-quotes)

  ```js
  // bad
  <Bad prop='please, no!' />
  <Bad propWithJS={{left: "20px"}} />

  // good
  <Good prop="please, no!" />
  <Good propWithJS={{left: '20px'}} />
  ```

- [3.2](#3.2) <a name="3.2"></a> When JSX spans multiple lines, wrap them in parentheses. When on a single line, do not wrap in parentheses.

  ESLint rule: [`wrap-multilines`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/wrap-multilines.md)

  ```js
  // bad
  render() {
    return <BadOne hasLongProp="sure does">
             <SomeChildComponent />
           </BadOne>
  }

  render() {
    let {children} = this.props;
    return (<BadTwo>{children}</BadTwo>);
  }

  // good
  render() {
    return (
      <GoodOne hasLongProp="sure does">
        <SomeChildComponent />
      </GoodOne>
    );
  }

  render() {
    let {children} = this.props;
    return <GoodTwo>{children}</GoodTwo>;
  }
  ```

[↑ scrollTo('#table-of-contents')](#table-of-contents)



## Components

- [4.1](#4.1) <a name="4.1"></a> Always extend React’s `Component` class rather than using `React.createClass`.

  > Why? The `class` syntax is the method React is pushing going forward, and it’s how most tutorials are written.

  ESLint rule: [`prefer-es6-class`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md)

  ```js
  // bad
  let BadComponent = React.createClass({
    render() {
      return <div />;
    },
  });

  // good
  // (you can also just extend `Component` if you explicitly imported it)
  class GoodComponent extends Component {
    render() {
      return <div />;
    }
  }
  ```

- [4.2](#4.2) <a name="4.2"></a> Always use JSX syntax and avoid `React.createElement`.

  ```js
  // bad
  class BadComponent extends Component {
    render() {
      return React.createElement('div', {foo: 'bar'});
    }
  }

  // good
  class GoodComponent extends Component {
    render() {
      return <div foo="bar" />;
    }
  }
  ```

- [4.3](#4.3) <a name="4.3"></a> Prefer React’s stateless components for components that do not have any state or lifecycle hooks.

  > **Note:** as of this writing, stateless components do not play nicely with React’s testing utilities. Until this is resolved, continue to extend `Component` for new components.

  > Why? Such components are very easy to represent as pure functions, and doing so encourages more stateless components, which decreases application complexity.

  ESLint rule: [`prefer-stateless-function`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md)

  ```js
  // bad
  export default class BadComponent extends Component {
    render() {
      let {children, hidden} = this.props;
      return <div style={{opacity: hidden ? 0 : 1}}>{children}</div>;
    }
  }

  // good
  export default function GoodComponent({children, hidden}) {
    return <div style={{opacity: hidden ? 0 : 1}}>{children}</div>;
  }
  ```

- [4.4](#4.4) <a name="4.4"></a> Do not use underscore-prefixed methods in React components.

  > Why? Most methods should either be lifecycle hooks, or callbacks, which are by definition not private since they are called by other components.

  ```js
  // bad
  class BadComponent extends Component {
    _handleButtonClick() {}
  }

  // good
  class GoodComponent extends Component {
    handleButtonClick() {}
  }
  ```

- [4.5](#4.5) <a name="4.5"></a> When overriding the constructor of `Component`, make sure to call `super` with all arguments passed to the constructor. It is easiest to do this using the rest/ spread operator (`...`).

  ```js
  // bad
  class BadComponent extends Component {
    constructor() {
      super();
      this.doSomething();
    }
  }

  // good
  class GoodComponent extends Component {
    constructor(...args) {
      super(...args);
      this.doSomething();
    }
  }
  ```

- [4.6](#4.6) <a name="4.6"></a> Prefer the `handle` prefix for callbacks passed to contained components.

  > Why? The `handle` prefix clearly indicates its purpose, and differentiates it from `on`-prefixed properties which *accept* callbacks.

  ```js
  // bad
  class BadComponent extends Component {
    onClickButton() {}

    render() {
      return <button onClick={this.onClickButton}>Button</button>;
    }
  }

  // good
  class GoodComponent extends Component {
    handleButtonClick() {}

    render() {
      return <button onClick={this.handleButtonClick}>Button</button>;
    }
  }
  ```

- [4.7](#4.7) <a name="4.7"></a> Maintain a sensible ordering of methods in your component. At a high level, order the component as follows: statics and instance class properties, constructor, lifecycle methods, other methods (like handlers and helpers), and, finally, render (and any methods you have broken render up into).

  > Why? A consistent ordering between components helps other developers find what they are looking for more quickly.

  ESLint rule: [`sort-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-comp.md)

- [4.8](#4.8) <a name="4.8"></a> Avoid violating the principles of React by doing things like directly setting state (use `setState`), setting state during the wrong lifecycle hooks (`componentDidMount` and `componentDidUpdate`), and checking whether your component is mounted.

  > Why? These make your component harder to understand, and these features are either not supported or likely to be removed from future versions of React.

  ESLint rules: [`no-deprecated`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-deprecated.md), [`no-did-mount-set-state`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-mount-set-state.md), [`no-did-update-set-state`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-update-set-state.md), [`no-direct-mutation-state`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-direct-mutation-state.md), [`no-is-mounted`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-is-mounted.md)

[↑ scrollTo('#table-of-contents')](#table-of-contents)



## Props

- [5.1](#5.1) <a name="5.1"></a> Always include Flow types to annotate props. `propTypes` are also acceptable for projects not using Flow, particularly when they are also needed for `contextTypes`.

  > Why? Flow types/ `propTypes` for `props` provide a great way to enforce the type requirements of your component's API, and serve as documentation of what the component can do.

  ESLint rule: [`prop-types`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md)

  ```js
  // bad
  class BadComponent extends Component {
    render() {
      // what are these props?
      let {propOne, propTwo} = this.props;
    }
  }

  // good
  class GoodComponent extends Component {
    static propTypes = {
      propOne: PropTypes.bool,
      propTwo: PropTypes.string,
    }

    render() {
      let {propOne, propTwo} = this.props;
    }
  }

  // even better
  type Props = {
    propOne?: boolean,
    propTwo?: string,
  };

  class GoodComponent extends Component {
    props: Props;

    render() {
      let {propOne, propTwo} = this.props;
    }
  }
  ```

- [5.2](#5.2) <a name="5.2"></a> Avoid generic `propTypes` that do not enforce type requirements, like `array` and `any` (or their Flow equivalents). Prefer more specific constraints, like `arrayOf`.

  ESLint rule: [`forbid-prop-types`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-prop-types.md)

  ```js
  // bad
  class BadComponent extends Component {
    static propTypes = {choices: PropTypes.array};
  }

  // good
  class BadComponent extends Component {
    static propTypes = {
      choices: PropTypes.arrayOf(PropTypes.string),
    };
  }
  ```

- [5.3](#5.3) <a name="5.3"></a> Where it makes sense, default boolean props to being false.

  > Why? Opt-in APIs are typically easier to understand and test. It also allows you to make better use of the simpler boolean attributes detailed below.

  ```js
  // bad
  class BadComponent extends Component {
    props: {visible: boolean};
    static defaultProps = {visible: true};
  }

  let shouldBeHidden = <BadComponent visible={false} />

  // good
  class GoodComponent extends Component {
    props: {visible: boolean};

    // Or just omit because an unset value is falsey
    static defaultProps = {hidden: false};
  }

  let shouldBeHidden = <GoodComponent hidden />
  ```

- [5.4](#5.4) <a name="5.4"></a> For functional React components, use default values in the function’s parameters rather than setting `defaultProps`.

```js
// bad
function BadComponent({disabled}) {
  return <button disabled={disabled}>Button</button>;
}

BadComponent.defaultProps = {disabled: false};

// good
function GoodComponent({disabled = false}) {
  return <button disabled={disabled}>Button</button>;
}
```

- [5.5](#5.5) <a name="5.5"></a> Omit the value of a prop when it is explicitly true.

  > Why? It reduces visual noise and matches how we would write similar attributes in HTML.

  ESLint rule: [`jsx-boolean-value`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md)

  ```js
  // bad
  <Bad hidden={true} />

  // good
  <Good hidden />
  <Good hidden={false} />
  ```

- [5.6](#5.6) <a name="5.6"></a> Omit curly braces when the prop is a string.

  > Why? It is cleaner and matches how most attributes are defined in HTML.

  ```js
  // bad
  <Bad status={"unnecessary braces"} />

  // good
  <Good status="nice and clean" />
  ```

- [5.7](#5.7) <a name="5.7"></a> Name props that act as event listeners `on<EventName>`, and methods that are called in response to events `handle<EventName>`.

  ```js
  // bad
  class BadComponent extends Component {
    static propTypes = {click: PropTypes.func}
  }

  class BadComponentUser extends Component {
    _onClick() {
      console.log('clicked');
    }

    render() {
      return <BadComponent click={this._onClick} />
    }
  }

  // good
  class GoodComponent extends Component {
    static propTypes = {onClick: PropTypes.func}
  }

  class GoodComponentUser extends Component {
    handleClick() {
      console.log('clicked');
    }

    render() {
      return <GoodComponent onClick={this.handleClick} />
    }
  }
  ```

- [5.8](#5.8) <a name="5.8"></a> Avoid passing bound methods or arrow functions in the props of rendered components. Bind these in the constructor or use class properties instead.

  > Why? Passing a bound function or using an arrow function creates a new function for each render, which increases memory usage and prevents using shallow rendering on subcomponents.

  ESLint rule: [`jsx-no-bind`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)

  ```js
  // bad
  class BadComponent extends Component {
    render() {
      return <button onClick={this.handleClick.bind(this)} onMouseEnter={() => this.handleMouseEnter()} />;
    }
  }

  // good
  class GoodComponent extends Component {
    constructor(...args) {
      super(...args);
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
      console.log('clicked');
    }

    render() {
      return <button onClick={this.handleClick} />;
    }
  }

  // also good
  class GoodComponent extends Component {
    handleClick = this.handleClick.bind(this);

    handleClick() {
      console.log('clicked');
    }

    render() {
      return <button onClick={this.handleClick} />;
    }
  }

  // also good
  class GoodComponent extends Component {
    handleClick = () => { console.log('clicked'); };

    render() {
      return <button onClick={this.handleClick} />;
    }
  }
  ```
  
- [5.9](#5.9) <a name="5.9"></a> Components should not accept `style` or `className` as props. Prefer props that signal a particular variation on the component over allowing arbitrary customization.

  > Why? Allowing custom styles or class names vastly increases the surface area of your component’s API. This makes the component harder to maintain since you must account for every set of class names, style objects, and their interplay with your component’s base styles. Meaningful variations are better suited to maintaining a design system, and make it simpler for consumers to use your component. [This article](https://medium.com/brigade-engineering/don-t-pass-css-classes-between-components-e9f7ab192785#.67kv95pms) provides additional details on why accepting classes or styles is a bad idea.
  
  ESLint rule: [`forbid-component-props`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-component-props.md)
  
  ```js
  // bad
  function BadComponent({className}) {
    return <div className={['my-component', className].filter(Boolean).join(' ')} />;
  }
  
  <BadComponent className="my-special-potentially-conflicting-classname" />
  
  // good
  function GoodComponent({special}) {
    return <div className={['my-component', special && 'my-component--special'].filter(Boolean).join(' ')} />;
  }
  
  <GoodComponent special />
  ```

[↑ scrollTo('#table-of-contents')](#table-of-contents)



## Modules

- [6.1](#6.1) <a name="6.1"></a> When importing from React, explicitly import the exact features you need (in addition to React, which will be a signal to the compiler to compile JSX).

  > Why? Named imports explicitly indicate what you will be using at the top of the file, and reduce the duplication of accessing properties on `React`.

  ```js
  // bad
  import React from 'react';

  class MyComponent extends React.Component {
    static contextTypes = {object: React.PropTypes.object};
  }

  // good
  import React, {Component, PropTypes} from 'react';

  class MyComponent extends Component {
    static contextTypes = {object: PropTypes.object};
  }
  ```

- [6.2](#6.2) <a name="6.2"></a> Try to define only one React component per file. Name that file the same as the component it exports. The "main" component should be the default export from an `index.js` file in that directory, and any subcomponents can be exported as named exports from that same file.

  ```js
  // in Card/Section.js
  export default class Section extends Component {}

  // in Card/Card.js
  export default class Card extends Component {}

  // in Card/index.js
  import Card from './Card';
  import Section from './Section';

  export default Card;
  export {Section as CardSection};
  ```

[↑ scrollTo('#table-of-contents')](#table-of-contents)



## Resources

- Explanation of the difference between [React Components, Elements, and instances](https://facebook.github.io/react/blog/2015/12/18/react-components-elements-and-instances.html).

[↑ scrollTo('#table-of-contents')](#table-of-contents)
