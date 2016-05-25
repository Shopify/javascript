import 'test-helper';
import removeUselessReturnFromTest from 'remove-useless-return-from-test';

describe('removeUselessReturnFromTest', () => {
  it('transforms basic setup variables', () => {
    expect(removeUselessReturnFromTest).to.transform('remove-useless-return-from-test/basic');
  });

  it('transforms empty returned IIFEs', () => {
    expect(removeUselessReturnFromTest).to.transform('remove-useless-return-from-test/iife');
  });
});
