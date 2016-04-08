import 'test-helper';
import mochaContextToGlobalReferences from 'mocha-context-to-global-references';

describe('mochaContextToGlobalReferences', () => {
  it('renames the member expression to use a test global', () => {
    expect(mochaContextToGlobalReferences).to.transform('mocha-context-to-global-references/rename', {
      testContextToGlobals: {
        sinon: {properties: ['spy', 'stub', 'server']},
      },
    });
  });

  it('replaces a contextual reference to a global reference', () => {
    expect(mochaContextToGlobalReferences).to.transform('mocha-context-to-global-references/replace', {
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
