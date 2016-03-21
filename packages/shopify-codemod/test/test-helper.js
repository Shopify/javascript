import path from 'path';
import chai, {expect} from 'chai';
import chaiJSCodeShift from 'chai-jscodeshift';

chai.use(chaiJSCodeShift({
  fixtureDirectory: path.join(__dirname, 'fixtures'),
  transformOptions: {
    printOptions: {quote: 'single'},
  },
}));

global.expect = expect;
