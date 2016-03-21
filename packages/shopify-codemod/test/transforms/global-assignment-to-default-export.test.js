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
});
