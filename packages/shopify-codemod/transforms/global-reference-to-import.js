import {spawnSync} from 'child_process';
import {resolve} from 'path';

export default function globalReferenceToImport(
  {source},
  {jscodeshift: j},
  {
    printOptions = {},
    javascriptSourceLocation,
    appGlobalIdentifiers,
  }) {
  const useSilverSearcher = (spawnSync('which', ['ag']).status === 0);

  /*
  * findDeclaringFile uses ack or the_silver_searcher to find the file in which something is declared.
  * It can use either, because ack is ubiquitous, while the_silver_searcher is much faster (like, 10x easily).
  */
  function findDeclaringFile(identifier) {
    const absolutePath = resolve(javascriptSourceLocation);
    const escapedIdentifier = identifier.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = `^(class ${escapedIdentifier}(\\s+|^)|${escapedIdentifier}\\s*=|["']expose ${escapedIdentifier}["'])`;
    const result = useSilverSearcher
    ? spawnSync('ag', [
      '--vimgrep',
      regex,
      absolutePath,
    ])
    : spawnSync('ack', [
      '--column',
      '--no-color',
      '--no-group',
      '--with-filename',
      regex,
      absolutePath,
    ]);

    if (result.status !== 0) {
      return null;
    }
    const stdout = result.stdout.toString();
    const parts = stdout.trim().split('\n');
    if (parts.length === 0) {
      return null;
    } else if (parts.length !== 1) {
      throw new Error(`Found multiple definitions for ${identifier}`);
    }

    const [filename] = parts[0].split(':', 4);
    return filename.replace(new RegExp(`^${absolutePath}/`), '').replace(/\.[a-z]+$/, '');
  }

  function findFirstMember(memberExpression) {
    if (j.MemberExpression.check(memberExpression)) {
      return findFirstMember(memberExpression.object);
    }
    return memberExpression;
  }

  function findLastMember(memberExpression) {
    if (j.MemberExpression.check(memberExpression)) {
      return findLastMember(memberExpression.property);
    }
    return memberExpression;
  }

  function isGlobalReference(object) {
    return appGlobalIdentifiers.indexOf(findFirstMember(object).name) >= 0;
  }

  return j(source)
  .find(j.Program)
  .forEach((path) => {
    const imports = new Map();

    function registerMember(node) {
      const member = j(node).toSource();
      if (imports.has(member)) {
        return imports.get(member).name;
      } else {
        const file = findDeclaringFile(member);
        if (file === null) {
          return null;
        }
        const name = findLastMember(node).name;
        imports.set(member, {file, name});
        return name;
      }
    }

    // First rename anything like `const UIList = App.Components.UIList;`
    j(path)
    .find(j.VariableDeclaration, {
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
        },
        init: {
          type: 'MemberExpression',
          object: isGlobalReference,
        },
      }],
      kind: 'const',
    })
    .forEach((declarationPath) => {
      const {node: {declarations: [declaration]}} = declarationPath;
      const name = registerMember(declaration.init);
      if (name == null) {
        return;
      }
      j(declarationPath.get('declarations').get(0)).renameTo(name);
      declarationPath.prune();
    });

    // Last rename any remaining global references
    j(path)
    .find(j.MemberExpression, {
      object: isGlobalReference,
    })
    .replaceWith((memberPath) => {
      const name = registerMember(memberPath.node);
      if (name == null) {
        return memberPath.node;
      } else {
        return j.identifier(name);
      }
    });

    for (const {file, name} of imports.values()) {
      const {node: {body}} = path;
      body.unshift(
        j.importDeclaration([
          j.importDefaultSpecifier(j.identifier(name)),
        ], j.literal(file))
      );
    }
  })
  .toSource(printOptions);
}
