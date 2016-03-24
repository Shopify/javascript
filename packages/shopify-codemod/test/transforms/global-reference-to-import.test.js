import 'test-helper';
import globalReferenceToImport from 'global-reference-to-import';

describe('globalReferenceToImport', () => {
  it('transforms global references to imports', () => {
    expect(globalReferenceToImport).to.transform('global-reference-to-import/basic');
  });

  it('transforms assignments of global references to imports', () => {
    expect(globalReferenceToImport).to.transform('global-reference-to-import/assignment');
  });

  it('preserves directives', () => {
    expect(globalReferenceToImport).to.transform('global-reference-to-import/directive');
  });
});
