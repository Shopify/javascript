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

  it('throws an error when multiple exports match', () => {
    expect(globalReferenceToImport).to.throwWhileTransforming(
      'global-reference-to-import/multiple-matches/basic-invalid',
      /Found multiple definitions for App\.Components\.InvalidMultipleMatch/
    );
  });

  it('throws an error when multiple exports match and the files are not in the same location', () => {
    expect(globalReferenceToImport).to.throwWhileTransforming(
      'global-reference-to-import/multiple-matches/nested-invalid',
      /Found multiple definitions for App\.Components\.InvalidMultipleMatchThree/
    );
  });

  it('imports from a JavaScript file when there are multiple matches with comparable paths', () => {
    expect(globalReferenceToImport).to.transform('global-reference-to-import/multiple-matches/basic-valid');
  });

  it('only renames globals that are present in the same file', () => {
    expect(globalReferenceToImport).to.transform('global-reference-to-import/self-referencing');
  });
});
