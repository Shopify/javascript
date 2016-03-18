import 'test-helper';
import ternaryStatementToIfStatement from 'ternary-statement-to-if-statement';

describe('ternaryStatementToIfStatement', () => {
  it('transforms the simple case', () => {
    expect(ternaryStatementToIfStatement).to.transform('ternary-statement-to-if-statement/simple');
  });
});
