import fs from 'fs';
import {spawnSync} from 'child_process';
import {extname, dirname, resolve, relative, join, basename} from 'path';
import {findFirstMember, findLastMember, insertAfterDirectives} from './utils';

function determineFileSearcher() {
  if (spawnSync('which', ['ag']).status === 0) {
    return ['ag', ['--vimgrep']];
  } else if (spawnSync('which', ['ack']).status === 0) {
    return ['ack', ['--column', '--no-color', '--no-group', '--with-filename']];
  } else if (spawnSync('which', ['ack-grep']).status === 0) {
    return ['ack-grep', ['--column', '--no-color', '--no-group', '--with-filename']];
  } else {
    throw new Error('global-reference-to-import: Unable to find ack or the_silver_searcher binary. Please run `brew install ag`');
  }
}

const fileForIdentifier = {};

export default function globalReferenceToImport(
  {source},
  {jscodeshift: j},
  {
    printOptions = {},
    javascriptSourceLocation,
    appGlobalIdentifiers,
  }) {
  const [binary, args] = determineFileSearcher();

  const sourceLocation = resolve(javascriptSourceLocation);
  function relativePath(file) {
    return relative(sourceLocation, file).replace(/(\.[a-z]+)+$/, '');
  }

  /*
  * findDeclaringFile uses ack or the_silver_searcher to find the file in which something is declared.
  * It can use either, because ack is ubiquitous, while the_silver_searcher is much faster (like, 10x easily).
  */
  function findDeclaringFile(identifier) {
    const absolutePath = resolve(javascriptSourceLocation);
    const escapedIdentifier = identifier.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = `^(class ${escapedIdentifier}(\\s+|^)|${escapedIdentifier}\\s*=|["']expose ${escapedIdentifier}["'])`;
    const result = spawnSync(binary, [...args, regex, absolutePath]);

    if (result.error != null) {
      throw result.error;
    } else if (result.status === 1) {
      return null;
    } else if (result.status !== 0) {
      throw new Error(`Unknown error while resolving identifier:\n${result.stderr}`);
    }

    const stdout = result.stdout.toString();
    const files = filterEquivalentFiles(stdout.trim().split('\n').map(getFileName));
    if (files.length === 0) {
      return null;
    } else if (files.length !== 1) {
      throw new Error(`Found multiple definitions for ${identifier}`);
    }

    return files[0];
  }

  function getDeclaringFile(identifier) {
    if (!fileForIdentifier.hasOwnProperty(identifier)) {
      fileForIdentifier[identifier] = findDeclaringFile(identifier);
    }

    return fileForIdentifier[identifier];
  }

  function findNamedExports(filename) {
    let namedExports = [];
    if (extname(filename) === '.js') {
      // eslint-disable-next-line no-sync
      namedExports = j(fs.readFileSync(filename).toString())
        .find(j.ExportNamedDeclaration)
        .paths();
    } else if (extname(filename) === '.coffee') {
      return namedExports;
    } else {
      const absolutePath = resolve(filename);
      const regex = '^export\\s+\\S+';
      const result = spawnSync(binary, [...args, regex, absolutePath]);

      if (result.error != null) {
        throw result.error;
      } else if (result.status === 1) {
        return namedExports;
      }

      const stdout = result.stdout.toString();
      const exportLines = stdout.trim().split('\n').map(getExportLine);
      namedExports = filterDefaultExports(exportLines);
    }
    return namedExports;
  }

  function isGlobalReference(object) {
    return appGlobalIdentifiers.indexOf(findFirstMember(object).name) >= 0;
  }

  return j(source)
    .find(j.Program)
    .forEach((path) => {
      const exposeDirective = path.get('body').filter(({node}) => j.match(node, {
        expression: {
          type: j.Literal.name,
          value: (value) => typeof value === 'string' && value.startsWith('expose'),
        },
      }))[0];

      const exposed = exposeDirective && exposeDirective.get('expression').node.value.replace(/^expose\s+/, '');
      const exposedLocalName = exposed && findLastMember(j(exposed).paths()[0].get('program', 'body', 0, 'expression').node).name;

      const imports = new Map();

      function registerMember(node) {
        const member = j(node).toSource();

        if (member === exposed) {
          return exposedLocalName;
        }

        if (imports.has(member)) {
          return imports.get(member).name;
        } else {
          const file = getDeclaringFile(member);
          if (file === null) { return null; }
          const name = findLastMember(node).name;
          const hasNamedExports = (findNamedExports(file).length > 0);

          imports.set(member, {file, name, hasNamedExports});
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
          const declaration = declarationPath.get('declarations', 0);
          const name = registerMember(declaration.node.init);
          if (name == null) {
            return;
          }
          j(declaration).renameTo(name);
          declarationPath.prune();
        });

      // Last rename any remaining global references
      j(path)
        .find(j.MemberExpression, {
          object: isGlobalReference,
        })
        .replaceWith(({node}) => {
          const name = registerMember(node);
          if (name == null) {
            return node;
          } else {
            return j.identifier(name);
          }
        });

      for (const anImport of imports.values()) {
        const {file, name, hasNamedExports} = anImport;
        const {node: {body}} = path;
        const identifier = j.identifier(name);
        insertAfterDirectives(
          body,
          j.importDeclaration([
            hasNamedExports ? j.importNamespaceSpecifier(identifier) : j.importDefaultSpecifier(identifier),
          ], j.literal(relativePath(file))),
        );
      }
    })
    .toSource(printOptions);
}

function filterEquivalentFiles(files) {
  return files.filter(
    (file) => extname(file) === '.js' || files.indexOf(equivalentJavaScriptFile(file)) < 0,
  );
}

function equivalentJavaScriptFile(file) {
  if (file.match(/\.js$/)) {
    return file;
  }

  return join(
    dirname(file),
    `${basename(file, '.coffee')}.js`,
  );
}

function getFileName(grepResult) {
  return grepResult.split(':', 4)[0];
}

function filterDefaultExports(exportLines) {
  return exportLines.filter(
    (exportLine) => !exportLine.includes(' default '),
  );
}

function getExportLine(grepResult) {
  return grepResult.split(':', 4)[3];
}
