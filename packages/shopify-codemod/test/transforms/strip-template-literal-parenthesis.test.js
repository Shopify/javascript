import 'test-helper';
import stripTemplateLiteralParenthesis from 'strip-template-literal-parenthesis';

describe('stripTemplateLiteralParenthesis', () => {
  it('removes unnecessary parenthesis from template literals', () => {
    expect(stripTemplateLiteralParenthesis).to.transform('strip-template-literal-parenthesis/basic');
  });
});
