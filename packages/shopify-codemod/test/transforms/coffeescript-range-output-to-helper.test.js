import 'test-helper';
import coffeescriptRangeOutputToHelper from 'coffeescript-range-output-to-helper';

describe('coffeescriptRangeOutputToHelper', () => {
  it('transforms inclusive ranges', () => {
    expect(coffeescriptRangeOutputToHelper).to.transform('coffeescript-range-output-to-helper/inclusive');
  });

  it('transforms exclusive ranges', () => {
    expect(coffeescriptRangeOutputToHelper).to.transform('coffeescript-range-output-to-helper/exclusive');
  });

  it('transforms ranges starting with variables', () => {
    expect(coffeescriptRangeOutputToHelper).to.transform('coffeescript-range-output-to-helper/start-variable');
  });

  it('transforms ranges with end variables', () => {
    expect(coffeescriptRangeOutputToHelper).to.transform('coffeescript-range-output-to-helper/end-variable');
  });

  it('transforms ranges with both variables', () => {
    expect(coffeescriptRangeOutputToHelper).to.transform('coffeescript-range-output-to-helper/both-variables');
  });

  it('does not transform non-matching constructs', () => {
    expect(coffeescriptRangeOutputToHelper).to.transform('coffeescript-range-output-to-helper/similar-cases');
  });
});
