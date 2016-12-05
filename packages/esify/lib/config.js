var path = require('path');

module.exports = function loadConfig() {
  try {
    return require(path.join(process.cwd(), 'esify.config'));
  } catch (error) {
    return {
      appGlobalIdentifiers: ['Shopify', 'Sello'],
      javascriptSourceLocation: path.join(process.cwd(), 'app/assets/javascripts'),
      printOptions: {
        arrowParensAlways: true,
        quote: 'single',
        trailingComma: true,
        tabWidth: 2,
        wrapColumn: 1000,
      },
      testContextToGlobals: {
        testClock: {
          properties: ['clock'],
          replace: true,
        },
        sandbox: {
          properties: ['spy', 'stub', 'mock', 'server', 'requests'],
        },
      },
      globalIdentifiers: {
        _: 'lodash',
        $: 'jquery',
        moment: 'moment',
        jstz: 'jstimezonedetect',
        mousetrap: 'mousetrap',
        URI: 'urijs',
        URITemplate: 'urijs/src/URITemplate',
        ReconnectingWebSocket: 'shopify-reconnecting-websocket',
        d3: 'd3',
        NProgress: 'NProgress',
        FastClick: 'shopify-fastclick',
        Clipboard: 'clipboard',
        Twine: 'twine',
        Bindings: 'twine',
      },
      renameIdentifiers: {
        jQuery: '$',
        Bindings: 'Twine',
      },
      renameProperties: {
        _: {
          first: 'head',
          each: 'forEach',
          eachRight: 'forEachRight',
          entries: 'toPairs',
          entriesIn: 'toPairsIn',
          extend: 'assignIn',
          extendWith: 'assignInWith',
        },
      },
      methodsThatIgnoreReturnValues: [
        {
          object: '_',
          methods: ['each'],
        },
        {
          object: /.*/,
          methods: ['forEach'],
        },
      ],
      methodsReturningVoid: [
        {
          object: 'console',
          methods: ['log', 'warn'],
        },
        {
          object: /^(e|evt|event)$/,
          methods: ['preventDefault'],
        },
        {
          object: /.*/,
          methods: ['forEach'],
        },
        {
          object: '_',
          methods: ['each'],
        },
      ],
    };
  }
};
