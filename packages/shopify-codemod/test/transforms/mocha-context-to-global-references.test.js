import 'test-helper';
import mochaContextToGlobalReferences from 'mocha-context-to-global-references';

describe('mochaContextToGlobalReferences', () => {
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
        }
      }
    });

    expect(mochaContextToGlobalReferences).to.transform('mocha-context-to-global-references/rename', {
      testContextToGlobals: {
        sinon: {properties: ['spy', 'stub', 'server']},
      }
    });
  });
});
