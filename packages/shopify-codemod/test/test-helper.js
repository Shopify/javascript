import path from 'path';
import chai, {expect} from 'chai';
import chaiJSCodeShift from 'chai-jscodeshift';

chai.use(chaiJSCodeShift({
  fixtureDirectory: path.join(__dirname, 'fixtures'),
  transformOptions: {
    printOptions: {
      arrowParensAlways: true,
      quote: 'single',
    },
    javascriptSourceLocation: path.join(__dirname, 'fixtures', 'javascripts'),
    appGlobalIdentifiers: ['App'],
  },
}));

global.expect = expect;
