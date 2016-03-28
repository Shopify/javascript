import 'test-helper';
import conditionalAssignToIfStatement from 'conditional-assign-to-if-statement';

describe('conditionalAssignToIfStatement', () => {
  it('transforms or assignments', () => {
    expect(conditionalAssignToIfStatement).to.transform('conditional-assign-to-if-statement/conditional-or-assignments');
  });

  it('transforms and assignments', () => {
    expect(conditionalAssignToIfStatement).to.transform('conditional-assign-to-if-statement/conditional-and-assignments');
  });

  it('updates assignment target when condition variable differs', () => {
    expect(conditionalAssignToIfStatement).to.transform('conditional-assign-to-if-statement/assign-to-other-identifier');
  });
});
