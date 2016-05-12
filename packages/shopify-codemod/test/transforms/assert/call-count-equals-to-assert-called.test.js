import 'test-helper';
import transform from 'assert/call-count-equals-to-assert-called';

describe('assert/callCountEqualsToAssertCalled', () => {
  it('tranforms calledWith method calls to assertions with better error reporting', () => {
    expect(transform).to.transform('assert/call-count-equals-to-assert-called/basic');
  });
});
