import 'test-helper';
import removeAddEventListenerReturns from 'remove-addeventlistener-returns';

describe('removeAddEventListenerReturns', () => {
  it('removes redundant returns with arguments from addEventListener', () => {
    expect(removeAddEventListenerReturns).to.transform('remove-addeventlistener-returns/basic');
  });
  it('removes redundant returns with no arguments', () => {
    expect(removeAddEventListenerReturns).to.transform('remove-addeventlistener-returns/no-arguments');
  });
  it('doesn\'t remove nested returns', () => {
    expect(removeAddEventListenerReturns).to.transform('remove-addeventlistener-returns/nested');
  });
});
