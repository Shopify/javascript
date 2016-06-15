import 'test-helper';
import existentialAssignmentToIfStatement from 'existential-assignment-to-if-statement';

describe('existentialAssignmentToIfStatement', () => {
  it('only simplifies if-else statements that have their test, consequent, and alternate all match the coffeescript ?= decaf output', () => {
    expect(existentialAssignmentToIfStatement).to.transform('existential-assignment-to-if-statement/basic');
  });
});
