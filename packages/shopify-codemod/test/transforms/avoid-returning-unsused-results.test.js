import 'test-helper';
import avoidReturningUnsusedResults from 'avoid-returning-unsused-results';

describe('avoidReturningUnsusedResults', () => {
  it('removes return arguments from specified callbacks', () => {
    expect(avoidReturningUnsusedResults).to.transform('avoid-returning-unsused-results/basic', {
      methodsThatIgnoreReturnValues: [
        {
          object: '_',
          methods: ['each'],
        },
      ],
    });
  });
});
