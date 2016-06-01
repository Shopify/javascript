import 'test-helper';
import convertDefaultExportObjectsToNamedExports from 'convert-default-export-objects-to-named-exports';

describe('convertDefaultExportObjectsToNamedExports', () => {
  it('converts export object literals', () => {
    expect(convertDefaultExportObjectsToNamedExports).to.transform('convert-default-export-objects-to-named-exports/literals');
  });

  it('converts export object variables', () => {
    expect(convertDefaultExportObjectsToNamedExports).to.transform('convert-default-export-objects-to-named-exports/variables');
  });

  it('transforms methods into function declarations', () => {
    expect(convertDefaultExportObjectsToNamedExports).to.transform('convert-default-export-objects-to-named-exports/method');
  });

  it('ignores empty default export objects', () => {
    expect(convertDefaultExportObjectsToNamedExports).to.transform('convert-default-export-objects-to-named-exports/empty');
  });

  it('ignores non-object and non-default exports', () => {
    expect(convertDefaultExportObjectsToNamedExports).to.transform('convert-default-export-objects-to-named-exports/non-object');
  });

  it('ignores objects with computed keys', () => {
    expect(convertDefaultExportObjectsToNamedExports).to.transform('convert-default-export-objects-to-named-exports/computed-keys');
  });

  it('ignores objects with methods that use `this`', () => {
    expect(convertDefaultExportObjectsToNamedExports).to.transform('convert-default-export-objects-to-named-exports/this');
  });

  it('ignores objects where any key is an invalid identifier', () => {
    expect(convertDefaultExportObjectsToNamedExports).to.transform('convert-default-export-objects-to-named-exports/invalid-identifier');
  });
});
