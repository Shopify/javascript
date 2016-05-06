import 'test-helper';
import constructorLiteralAssignmentToClassProperty from 'constructor-literal-assignment-to-class-property';

describe('constructorLiteralAssignmentToClassProperty', () => {
  it('transforms literal assignments', () => {
    expect(constructorLiteralAssignmentToClassProperty).to.transform('constructor-literal-assignment-to-class-property/literals');
  });

  it('transforms identifiers in different scopes', () => {
    expect(constructorLiteralAssignmentToClassProperty).to.transform('constructor-literal-assignment-to-class-property/identifiers');
  });

  it('transforms complex literal assignments', () => {
    expect(constructorLiteralAssignmentToClassProperty).to.transform('constructor-literal-assignment-to-class-property/complex-literals');
  });

  it('transforms class expressions', () => {
    expect(constructorLiteralAssignmentToClassProperty).to.transform('constructor-literal-assignment-to-class-property/expression');
  });

  it('transforms static class literal assignments', () => {
    expect(constructorLiteralAssignmentToClassProperty).to.transform('constructor-literal-assignment-to-class-property/static');
  });

  it('avoids transforming similar cases', () => {
    expect(constructorLiteralAssignmentToClassProperty).to.transform('constructor-literal-assignment-to-class-property/avoid');
  });
});
