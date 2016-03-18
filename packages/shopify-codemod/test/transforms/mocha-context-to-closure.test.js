import 'test-helper';
import mochaContextToClosure from 'mocha-context-to-closure';

describe('mochaContextToClosure', () => {
  it('transforms basic setup variables', () => {
    expect(mochaContextToClosure).to.transform('mocha-context-to-closure/basic');
  });

  it('transforms the usage of context variables in tests and other hooks', () => {
    expect(mochaContextToClosure).to.transform('mocha-context-to-closure/use-in-test');
  });

  it('does not transform variables of the same name that do not reference the mocha context', () => {
    expect(mochaContextToClosure).to.transform('mocha-context-to-closure/extra-this');
  });

  it('does not clobber variables declared with the same name', () => {
    expect(mochaContextToClosure).to.transform('mocha-context-to-closure/name-clobbering');
  });

  it('handles nested suites', () => {
    expect(mochaContextToClosure).to.transform('mocha-context-to-closure/nested');
  });

  it('handles bdd syntax', () => {
    expect(mochaContextToClosure).to.transform('mocha-context-to-closure/bdd');
  });
});
