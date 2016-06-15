import 'test-helper';
import simplifyCondAssignIfElseStatement from 'simplify-?=-if-else-statement';

describe('simplifyCondAssignIfElseStatement', () => {
  it('only simplifies if-else statements that have their test, consequent, and alternate all match the coffeescript ?= decaf output', () => {
    expect(simplifyCondAssignIfElseStatement).to.transform('simplify-?=-if-else-statement/basic');
  });
});
