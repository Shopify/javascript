import chai, {expect, assert} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

global.expect = expect;
global.assert = assert;
global.sinon = sinon.sandbox.create();

// eslint-ignore-next-line mocha/no-top-level-hooks
afterEach(() => {
  sinon.restore();
});
