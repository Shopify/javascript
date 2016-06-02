import 'test-helper';
import calledWithMethodsToAssertCalledWith from 'assert/called-with-methods-to-assert-called-with';

describe('assert/calledWithMethodsToAssertCalledWith', () => {
  it('transforms calledWidth method calls to assertions with better error reporting', () => {
    expect(calledWithMethodsToAssertCalledWith).to.transform('assert/called-with-methods-to-assert-called-with/basic');
  });
});
