import 'test-helper';
import avoidReturningUselessExpressions from 'avoid-returning-useless-expressions';

describe('avoidReturningUselessExpressions', () => {
  it('transforms specified properties to never be returned', () => {
    expect(avoidReturningUselessExpressions).to.transform('avoid-returning-useless-expressions/basic', {
      methodsReturningVoid: [
        {
          object: 'console',
          methods: ['log', 'warn'],
        },
        {
          object: /ev(en)?t/,
          methods: ['preventDefault'],
        },
      ],
    });
  });
});
