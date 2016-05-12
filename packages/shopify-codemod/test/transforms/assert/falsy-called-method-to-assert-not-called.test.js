import 'test-helper';
import transform from 'assert/falsy-called-method-to-assert-not-called';

describe('assert/falsyCalledMethodToAssertNotCalled', () => {
  it('transforms falsy called checks to never called assertions', () => {
    expect(transform).to.transform('assert/falsy-called-method-to-assert-not-called/basic');
  });
});
