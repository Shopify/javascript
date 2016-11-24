import 'test-helper';
import splitAssignmentSequences from 'split-assignment-sequences';

describe('splitAssignmentSequences', () => {
  it('transforms assignment sequences', () => {
    expect(splitAssignmentSequences).to.transform('split-assignment-sequences/basic');
  });

  it('ignores return assignment sequences', () => {
    expect(splitAssignmentSequences).to.transform('split-assignment-sequences/ignore-return-sequence-assignments');
  });

  it('ignores sequences that reference other assignment sources', () => {
    expect(splitAssignmentSequences).to.transform('split-assignment-sequences/ignore-mismatched-assignment-sources');
  });

  it('ignores sequences without a contining body', () => {
    expect(splitAssignmentSequences).to.transform('split-assignment-sequences/ignore-bodyless-sequences');
  });
});
