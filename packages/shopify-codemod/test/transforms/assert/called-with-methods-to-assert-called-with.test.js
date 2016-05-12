import 'test-helper';
import transform from 'assert/called-with-methods-to-assert-called-with';

describe('assert/calledWithMethodsToAssertCalledWith', () => {
  it('transforms calledWidth method calls to assertions with better error reporting', () => {
    expect(transform).to.transform('assert/called-with-methods-to-assert-called-with/basic');
  });
});
