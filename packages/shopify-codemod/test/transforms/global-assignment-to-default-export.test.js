import 'test-helper';
import globalAssignmentToDefaultExport from 'global-assignment-to-default-export';

describe('globalAssignmentToDefaultExport', () => {
  it('transforms global assignments to default exports', () => {
    expect(globalAssignmentToDefaultExport).to.transform('global-assignment-to-default-export/basic');
  });

  it('transforms global function assignments to default exports', () => {
    expect(globalAssignmentToDefaultExport).to.transform('global-assignment-to-default-export/function');
  });

  it('transforms global value assignments to default exports', () => {
    expect(globalAssignmentToDefaultExport).to.transform('global-assignment-to-default-export/value');
  });

  it('preserves directives', () => {
    expect(globalAssignmentToDefaultExport).to.transform('global-assignment-to-default-export/directive');
  });

  it('allows local prototype assignments', () => {
    expect(globalAssignmentToDefaultExport).to.transform('global-assignment-to-default-export/local-prototype-assignment');
  });

  it('prevents local non-prototype assignments', () => {
    expect(globalAssignmentToDefaultExport).to.throwWhileTransforming(
      'global-assignment-to-default-export/local-non-prototype-assignment',
      /Found multiple exports in a single file/
    );
  });
});
