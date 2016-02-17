import {Base as BaseGenerator} from 'yeoman-generator';
import chalk from 'chalk';
import yosay from 'yosay';

module.exports = class ESLintShopifyGenerator extends BaseGenerator {
  constructor(...args) {
    super(...args);

    this.option('react', {
      type: Boolean,
      required: false,
      desc: 'Uses the React configuration.',
    });

    this.option('es5', {
      type: Boolean,
      required: false,
      desc: 'Uses the ES5 configuration.',
    });
  }

  initializing() {
    const {options} = this;

    this.props = {
      react: options.react,
      es5: options.es5,
    };
  }

  prompting() {
    const {props, options} = this;
    const done = this.async();

    if (!options.skipWelcomeMessage) {
      this.log(yosay(`Welcome to the ${chalk.red('eslint-shopify')} generator!`));
    }

    const prompts = [
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
    const {props, options} = this;

    let extendsConfig = 'plugin:shopify/esnext';
    if (props.react) { extendsConfig = 'plugin:shopify/react'; }
    if (props.es5) { extendsConfig = 'plugin:shopify/es5'; }

    const eslintOptions = {
      extends: extendsConfig,
      plugins: [],
      skipInstall: options.skipInstall,
      skipWelcomeMessage: true,
      babel: false, // handled by the plugin
    };

    this.composeWith(
      'eslint-config:app',
      {options: eslintOptions},
      {local: require.resolve('generator-eslint-config/generators/app')}
    );
  }
};
