import 'test-helper';
import functionToArrow from 'function-to-arrow';

describe('functionToArrow', () => {
  it('transforms the simple case', () => {
    expect(functionToArrow).to.transform('function-to-arrow/basic');
  });

  it("doesn't transform function that use `this`", () => {
    expect(functionToArrow).to.transform('function-to-arrow/this');
  });

  it("doesn't break on property method shorthand", () => {
    expect(functionToArrow).to.transform('function-to-arrow/property');
  });

  it("doesn't transform methods", () => {
    expect(functionToArrow).to.transform('function-to-arrow/method');
  });
});
