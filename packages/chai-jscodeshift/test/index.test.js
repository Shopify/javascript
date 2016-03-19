import 'test-helper';

import path from 'path';
import chai from 'chai';
import proxyquire from 'proxyquire';

const fs = {stub: true};
const jscodeshift = {stub: true};
const chaiJSCodeShift = proxyquire('..', {fs, jscodeshift});
const subject = chaiJSCodeShift();
chai.use(subject);

describe('chaiJSCodeShift', () => {
  const content = 'foo';
  const fixture = 'my-fixture';
  let transform;

  beforeEach(() => {
    transform = sinon.stub().returns(content);
    fs.readFileSync = sinon.stub().returns(content);
  });

  afterEach(() => {
    subject.resetConfig();
  });

  describe('bdd syntax', () => {
    it('succeeds when the transformer returns the same string as the ouput file', () => {
      expect(() => expect(transform).to.transform(fixture)).not.to.throw(Error);
    });

    it('succeeds when the transformer returns the same string with different trailing whitespace', () => {
      transform.returns(`${content}\n\n\n\n\n`);
      expect(() => expect(transform).to.transform(fixture)).not.to.throw(Error);
    });

    it('fails when the transformer returns something else', () => {
      transform.returns('bar');
      expect(() => expect(transform).to.transform(fixture)).to.throw(Error);
    });
  });

  describe('tdd syntax', () => {
    it('succeeds when the transformer returns the same string as the ouput file', () => {
      expect(() => assert.transforms(transform, fixture)).not.to.throw(Error);
    });

    it('succeeds when the transformer returns the same string with different trailing whitespace', () => {
      transform.returns(`${content}\n\n\n\n\n`);
      expect(() => assert.transforms(transform, fixture)).not.to.throw(Error);
    });

    it('fails when the transformer returns something else', () => {
      transform.returns('bar');
      expect(() => assert.transforms(transform, fixture)).to.throw(Error);
    });
  });

  describe('transform arguments', () => {
    it('passes the input file details', () => {
      const dummyPath = 'foo/bar/baz.qux';
      subject.updateConfig({inputFixturePath: sinon.stub().returns(dummyPath)});
      runDummyAssertion();

      expect(transform)
        .to.have.deep.property('firstCall.args[0]')
        .that.deep.equals({source: content, path: dummyPath});
    });

    it('passes the jscodeshift API', () => {
      runDummyAssertion();

      expect(transform)
        .to.have.deep.property('firstCall.args[1]')
        .that.equals({jscodeshift});
    });

    it('passes the transform options', () => {
      const extraOptions = {myDummyOption: true};
      runDummyAssertion(extraOptions);

      expect(transform)
        .to.have.deep.property('firstCall.args[2]')
        .that.deep.equals(extraOptions);
    });
  });

  describe('options', () => {
    it('uses sensible default fixture files', () => {
      runDummyAssertion();

      const cwd = process.cwd();
      expect(fs.readFileSync).to.have.been.calledWith(path.join(cwd, `${fixture}.input.js`));
      expect(fs.readFileSync).to.have.been.calledWith(path.join(cwd, `${fixture}.output.js`));
    });

    it('uses the provided fixtureDirectory as the base for fixture files', () => {
      const fixtureDirectory = path.join(process.cwd(), 'foo/bar/baz');
      subject.updateConfig({fixtureDirectory});

      runDummyAssertion();

      expect(fs.readFileSync).to.have.been.calledWith(path.join(fixtureDirectory, `${fixture}.input.js`));
      expect(fs.readFileSync).to.have.been.calledWith(path.join(fixtureDirectory, `${fixture}.output.js`));
    });

    describe('inputFixturePath', () => {
      const inputPath = 'foo/bar/baz.js';
      let inputFixturePath;

      beforeEach(() => {
        inputFixturePath = sinon.stub().returns(inputPath);
        subject.updateConfig({inputFixturePath});
      });

      it('receives the fixture name and fixtureDirectory', () => {
        runDummyAssertion();
        expect(inputFixturePath).to.have.been.calledWith(fixture, process.cwd());
      });

      it('reads the returned file', () => {
        runDummyAssertion();
        expect(fs.readFileSync).to.have.been.calledWith(inputPath);
      });
    });

    describe('outputFixturePath', () => {
      const outputPath = 'foo/bar/baz.js';
      let outputFixturePath;

      beforeEach(() => {
        outputFixturePath = sinon.stub().returns(outputPath);
        subject.updateConfig({outputFixturePath});
      });

      it('receives the fixture name and fixtureDirectory', () => {
        runDummyAssertion();
        expect(outputFixturePath).to.have.been.calledWith(fixture, process.cwd());
      });

      it('reads the returned file', () => {
        runDummyAssertion();
        expect(fs.readFileSync).to.have.been.calledWith(outputPath);
      });
    });

    it('passes transformOptions to the transform calls', () => {
      const extraOptions = {myDummyOption: true};
      subject.updateConfig({transformOptions: extraOptions});
      runDummyAssertion();

      expect(transform)
        .to.have.deep.property('firstCall.args[2]')
        .that.deep.equals(extraOptions);
    });
  });

  function runDummyAssertion(...args) {
    try {
      expect(transform).to.transform(fixture, ...args);
    } catch (error) {} // eslint-disable-line no-empty
  }
});
