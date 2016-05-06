export default function constructorLiteralAssignmentToClassProperty({source}, {jscodeshift: j}, {printOptions = {}}) {

  function isRewritableObjectProperty(property, scope) {
    return (!property.computed || isRewritableValue(property.key, scope)) && isRewritableValue(property.value, scope);
  }

  function isRewritableValue(node, scope) {
    return node.type === 'Literal' ||
      (node.type === 'Identifier' && !scope.declares(node.name)) ||
      (node.type === 'MemberExpression' && isRewritableValue(node.object, scope)) ||
      (node.type === 'CallExpression' && isRewritableValue(node.callee, scope)) ||
      (node.type === 'ArrayExpression' && node.elements.every((element) => isRewritableValue(element, scope))) ||
      (node.type === 'ObjectExpression' && node.properties.every((property) => isRewritableObjectProperty(property, scope)));
  }

  function isContextMemberExpression(expression) {
    return expression.type === 'MemberExpression' &&
      (
        (expression.object.type === 'ThisExpression') ||
        (isContextMemberExpression(expression.object) && !expression.object.computed && expression.object.property.name === 'constructor')
      );
  }

  function isRewritableExpression(expression) {
    const node = expression.node.expression;

    return node != null &&
      node.type === 'AssignmentExpression' &&
      node.operator === '=' &&
      isContextMemberExpression(node.left) &&
      isRewritableValue(node.right, expression.scope);
  }

  function getRewritableStatements(constructorPath) {
    return constructorPath.get('value', 'body', 'body').filter(isRewritableExpression);
  }

  function handleClass(path) {
    const body = path.get('body', 'body');
    const constructorPath = body.filter((bodyPath) => bodyPath.get('kind').value === 'constructor')[0];

    if (constructorPath == null) { return; }

    getRewritableStatements(constructorPath)
      .reverse()
      .forEach((statement) => {
        body.unshift(
          j.classProperty(
            statement.get('expression', 'left', 'property').node,
            statement.get('expression', 'right').node,
            null, // type annotation
            statement.get('expression', 'left', 'object', 'type').value !== 'ThisExpression' // static
          )
        );
        statement.replace();
      });

    if (constructorPath.get('value', 'body', 'body').value.length === 0) {
      constructorPath.replace();
    }
  }

  const fileSource = j(source);

  fileSource.find(j.ClassDeclaration).forEach(handleClass);
  fileSource.find(j.ClassExpression).forEach(handleClass);

  return fileSource.toSource(printOptions);
}
