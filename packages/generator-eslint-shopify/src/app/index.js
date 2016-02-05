import {Base as BaseGenerator} from 'yeoman-generator';
import chalk from 'chalk';
import yosay from 'yosay';

module.exports = class ESLintShopifyGenerator extends BaseGenerator {
  constructor(...args) {
    super(...args);

    this.option('react', {
      type: Boolean,
      required: false,
      desc: 'Installs the React plugin and rule set.',
    });

    this.option('es5', {
      type: Boolean,
      required: false,
      desc: 'Installs the ES5 rules only.',
    });
  }

  initializing() {
    let {options} = this;

    this.props = {
      react: options.react,
      es5: options.es5,
    };
  }

  prompting() {
    let {props, options} = this;
    let done = this.async();

    if (!options.skipWelcomeMessage) {
      this.log(yosay(`Welcome to the ${chalk.red('eslint-shopify')} generator!`));
    }

    let prompts = [
      {
        type: 'confirm',
        name: 'react',
        message: 'Will this project use React?',
        default: false,
        when: props.react == null,
      },

      {
        type: 'confirm',
        name: 'es5',
        message: 'Will this project use only ES5?',
        default: false,
        when({react}) { return props.es5 == null && !react; },
      },
    ];

    this.prompt(prompts, (newProps) => {
      this.props = {...props, ...newProps};
      done();
    });
  }

  defaults() {
    let {props, options} = this;

    let plugins = ['shopify'];
    if (props.react) { plugins.push('react'); }

    let extendsConfig = 'shopify';
    if (props.react) { extendsConfig = 'shopify/react'; }
    if (props.es5) { extendsConfig = 'shopify/es5'; }

    let eslintOptions = {
      extends: extendsConfig,
      plugins,
      skipInstall: options.skipInstall,
      skipWelcomeMessage: true,
      babel: true,
    };

    this.composeWith(
      'eslint-config:app',
      {options: eslintOptions},
      {local: require.resolve('generator-eslint-config/generators/app')}
    );
  }
};
