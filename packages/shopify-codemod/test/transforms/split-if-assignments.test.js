import 'test-helper';
import transform from 'split-if-assignments';

describe('splitIfAssignments', () => {
  it('splits if-assigments into assignments and ifs', () => {
    expect(transform).to.transform('split-if-assignments/basic');
  });

  it('splits else-assigments into assignments and ifs', () => {
    expect(transform).to.transform('split-if-assignments/if-else-if');
  });
});
