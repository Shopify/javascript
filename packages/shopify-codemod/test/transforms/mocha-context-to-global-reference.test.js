import 'test-helper';
import mochaContextToGlobalReference from 'mocha-context-to-global-reference';

describe('mochaContextToGlobalReference', () => {
  it('renames the member expression to use a test global', () => {
    expect(mochaContextToGlobalReference).to.transform('mocha-context-to-global-reference/rename', {
      testContextToGlobals: {
        sinon: {properties: ['spy', 'stub', 'server']},
      },
    });
  });

  it('replaces a contextual reference to a global reference', () => {
    expect(mochaContextToGlobalReference).to.transform('mocha-context-to-global-reference/replace', {
      testContextToGlobals: {
        testClock: {
          properties: ['clock'],
          replace: true,
        },

        testGlobal: {
          properties: ['shouldBeReplaced', 'mustBeReplaced'],
          replace: true,
        },
      },
    });
  });
});
