import 'test-helper';
import avoidReturningUnusedResults from 'avoid-returning-unused-results';

describe('avoidReturningUnusedResults', () => {
  it('removes return arguments from specified callbacks', () => {
    expect(avoidReturningUnusedResults).to.transform('avoid-returning-unused-results/basic', {
      methodsThatIgnoreReturnValues: [
        {
          object: '_',
          methods: ['each'],
        },
      ],
    });
  });
});
