import 'test-helper';
import globalIdentifierToImport from 'global-identifier-to-import';

describe('globalIdentifierToImport', () => {
  it('transforms basic setup variables', () => {
    expect(globalIdentifierToImport).to.transform('global-identifier-to-import/basic', {
      globalIdentifiers: {
        _: 'lodash',
        moment: 'moment',
        jstz: 'jstimezone/jstz',
      },
    });
  });
});
