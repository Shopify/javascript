import 'test-helper';
import transform from 'catch-undefined-to-catch-error';

describe('catchUndefinedToCatchError', () => {
  it('converts catch undefined to catch error', () => {
    expect(transform).to.transform('catch-undefined-to-catch-error/basic');
  });

  it('does not convert catch undefined if error is already in scope', () => {
    expect(transform).to.transform('catch-undefined-to-catch-error/error-already-in-scope');
  });
});
