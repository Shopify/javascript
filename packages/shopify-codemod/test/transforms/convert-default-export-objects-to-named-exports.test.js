import 'test-helper';
import convertDefaultExportObjectsToNamedExports from 'convert-default-export-objects-to-named-exports';

describe('convertDefaultExportObjectsToNamedExports', () => {
  it('converts export object literals', () => {
    expect(convertDefaultExportObjectsToNamedExports).to.transform('convert-default-export-objects-to-named-exports/literals');
  });

  it('converts export object variables', () => {
    expect(convertDefaultExportObjectsToNamedExports).to.transform('convert-default-export-objects-to-named-exports/variables');
  });
});
