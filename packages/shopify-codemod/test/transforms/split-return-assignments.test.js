import 'test-helper';
import splitReturnAssignments from 'split-return-assignments';

describe('splitReturnAssignments', () => {
  it('splits up variable return assignments', () => {
    expect(splitReturnAssignments).to.transform('split-return-assignments/basic');
  });

  it('splits up array element re-assignments', () => {
    expect(splitReturnAssignments).to.transform('split-return-assignments/array');
  });

  it('splits up multiple assignments', () => {
    expect(splitReturnAssignments).to.transform('split-return-assignments/multi');
  });

  it('splits up assignments in inline arrow functions', () => {
    expect(splitReturnAssignments).to.transform('split-return-assignments/inline');
  });

  it('splits up single lined arrow functions', () => {
    expect(splitReturnAssignments).to.transform('split-return-assignments/single');
  });

  it('splits up non "=" operators', () => {
    expect(splitReturnAssignments).to.transform('split-return-assignments/operators');
  });
});
