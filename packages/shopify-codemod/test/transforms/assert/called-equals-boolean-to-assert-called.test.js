import 'test-helper';
import calledEqualsBooleanToAssertCalled from 'assert/called-equals-boolean-to-assert-called';

describe('assert/calledEqualsToAssertCalled', () => {
  it('tranforms called equals boolean to assertions with better error reporting', () => {
    expect(calledEqualsBooleanToAssertCalled).to.transform('assert/called-equals-boolean-to-assert-called/basic');
  });
});
