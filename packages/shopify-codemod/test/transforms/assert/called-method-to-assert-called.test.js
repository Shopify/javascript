import 'test-helper';
import calledMethodToAssertCalled from 'assert/called-method-to-assert-called';

describe('assert/calledMethodToAssertCalled', () => {
  it('transforms called method calls to assertions with better error reporting', () => {
    expect(calledMethodToAssertCalled).to.transform('assert/called-method-to-assert-called/basic');
  });
});
