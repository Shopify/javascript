import 'test-helper';
import coffeescriptSoakToCondition from 'coffeescript-soak-to-condition';

describe('coffeescriptSoakToCondition', () => {
  it('transforms the basic case', () => {
    expect(coffeescriptSoakToCondition).to.transform('coffeescript-soak-to-condition/basic');
  });

  it('transforms soaked function calls', () => {
    expect(coffeescriptSoakToCondition).to.transform('coffeescript-soak-to-condition/function-calls');
  });

  it('transforms assignment expressions', () => {
    expect(coffeescriptSoakToCondition).to.transform('coffeescript-soak-to-condition/assignment');
  });

  it('transforms logical expressions', () => {
    expect(coffeescriptSoakToCondition).to.transform('coffeescript-soak-to-condition/logical-expressions');
  });

  it('handles different parent paths', () => {
    expect(coffeescriptSoakToCondition).to.transform('coffeescript-soak-to-condition/other-parents');
  });
});
