import 'test-helper';
import conditionalAssignToIfStatement from 'conditional-assign-to-if-statement';

describe('conditionalAssignToIfStatement', () => {
  it('transforms identifier assignments', () => {
    expect(conditionalAssignToIfStatement).to.transform('conditional-assign-to-if-statement/assign-to-identifier');
  });

  it('transforms property assignments', () => {
    expect(conditionalAssignToIfStatement).to.transform('conditional-assign-to-if-statement/assign-to-member');
  });

  it('transforms this property assignments', () => {
    expect(conditionalAssignToIfStatement).to.transform('conditional-assign-to-if-statement/assign-to-this');
  });

  it('transforms assignments that return', () => {
    expect(conditionalAssignToIfStatement).to.transform('conditional-assign-to-if-statement/assign-and-return');
  });

  it('transforms assignments that are immediately invoked', () => {
    expect(conditionalAssignToIfStatement).to.transform('conditional-assign-to-if-statement/assign-and-call');
  });

  it('does not transform mismatched assignments', () => {
    expect(conditionalAssignToIfStatement).to.transform('conditional-assign-to-if-statement/assign-to-other-member');
  });

  it('does not transform other logical operator assignments', () => {
    expect(conditionalAssignToIfStatement).to.transform('conditional-assign-to-if-statement/assign-after-and');
  });
});
