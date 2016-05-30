import 'test-helper';
import jQueryDollarSignReferences from 'jquery-dollar-sign-references';

describe('jQueryDollarSignReferences', () => {
  it('adds dollar sign to jQuery element declarations', () => {
    expect(jQueryDollarSignReferences).to.transform('jquery-dollar-sign-references/basic')
  });
});
