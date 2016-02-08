import sinon from 'sinon';
import chai, {expect} from 'chai';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

global.sinon = sinon;
global.expect = expect;
