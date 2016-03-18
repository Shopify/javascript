import 'test-helper';
import constantFunctionToExpression from 'constant-function-expression-to-statement';

describe('constantFunctionToExpression', () => {
  it('transforms the simple case', () => {
    expect(constantFunctionToExpression).to.transform('constant-function-expression-to-statement/simple');
  });

  it('transforms nested', () => {
    expect(constantFunctionToExpression).to.transform('constant-function-expression-to-statement/nested');
  });

  it("doesn't transform arrow functions that refer to `this`", () => {
    expect(constantFunctionToExpression).to.transform('constant-function-expression-to-statement/this');
  });
});
