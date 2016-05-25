import 'test-helper';
import splitReturnAssignments from 'split-return-assignments';

describe('splitReturnAssignments', () => {
  it('splits up variable return assignments', () => {
    expect(splitReturnAssignments).to.transform('split-return-assignments/basic');
  });

  it('splits up array element re-assignments').to.transform('split-return-assignments/array', () => {
    expect(splitReturnAssignments).to.transform('split-return-assignments/array');
  });
});
