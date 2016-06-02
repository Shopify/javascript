import 'test-helper';
import falsyCalledMethodToAssertNotCalled from 'assert/falsy-called-method-to-assert-not-called';

describe('assert/falsyCalledMethodToAssertNotCalled', () => {
  it('transforms falsy called checks to never called assertions', () => {
    expect(falsyCalledMethodToAssertNotCalled).to.transform('assert/falsy-called-method-to-assert-not-called/basic');
  });
});
