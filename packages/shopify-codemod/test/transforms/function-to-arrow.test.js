import 'test-helper';
import ternaryStatementToIfStatement from 'function-to-arrow';

describe('functionToArrow', () => {
  it('transforms the simple case', () => {
    expect(ternaryStatementToIfStatement).to.transform('function-to-arrow/basic');
  });

  it("doesn't transform function that use `this`", () => {
    expect(ternaryStatementToIfStatement).to.transform('function-to-arrow/this');
  });
});
