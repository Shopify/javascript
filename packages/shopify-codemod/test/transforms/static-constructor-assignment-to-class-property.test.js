import 'test-helper';
import staticConstructorAssignmentToClassProperty from 'static-constructor-assignment-to-class-property';

describe.only('staticConstructorAssignmentToClassProperty', () => {
  it('transforms literal assignments', () => {
    expect(staticConstructorAssignmentToClassProperty).to.transform('static-constructor-assignment-to-class-property/literals');
  });

  it('transforms identifiers in different scopes', () => {
    expect(staticConstructorAssignmentToClassProperty).to.transform('static-constructor-assignment-to-class-property/identifiers');
  });

  it('transforms complex literal assignments', () => {
    expect(staticConstructorAssignmentToClassProperty).to.transform('static-constructor-assignment-to-class-property/complex-literals');
  });

  it('transforms class expressions', () => {
    expect(staticConstructorAssignmentToClassProperty).to.transform('static-constructor-assignment-to-class-property/expression');
  });

  it('transforms static class literal assignments', () => {
    expect(staticConstructorAssignmentToClassProperty).to.transform('static-constructor-assignment-to-class-property/static');
  });

  it('avoids transforming similar cases', () => {
    expect(staticConstructorAssignmentToClassProperty).to.transform('static-constructor-assignment-to-class-property/avoid');
  });
});
