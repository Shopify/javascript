import 'test-helper';
import splitIfStatementAssignmentParameter from 'split-if-state-ement-assignment-parameter';

describe('splitIfStatementAssignmentParameter', () => {
  it('splits up single-lined assignments in parameters', () => {
    expect(splitIfStatementAssignmentParameter).to.transform('split-if-state-ement-assignment-parameter/single');
  });
  it('splits up multi-lined assignments in parameters', () => {
    expect(splitIfStatementAssignmentParameter).to.transform('split-if-state-ement-assignment-parameter/multi');
  });
});
