import 'test-helper';
import callCountEqualsToAssertCalled from 'assert/call-count-equals-to-assert-called';

describe('assert/callCountEqualsToAssertCalled', () => {
  it('tranforms calledWith method calls to assertions with better error reporting', () => {
    expect(callCountEqualsToAssertCalled).to.transform('assert/call-count-equals-to-assert-called/basic');
  });
});
