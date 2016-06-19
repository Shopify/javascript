import 'test-helper';
import existentialAssignmentToIfStatement from 'existential-assignment-to-if-statement';

describe('existentialAssignmentToIfStatement', () => {
  it('only simplifies if-else statements that match the coffeescript ?= decaf output', () => {
    expect(existentialAssignmentToIfStatement).to.transform('existential-assignment-to-if-statement/basic');
  });
  it('does not simplify when there are mismatched leftvalues in the test, consequent, and alternate', () => {
    expect(existentialAssignmentToIfStatement).to.transform('existential-assignment-to-if-statement/mismatched-leftvalues');
  });
});
