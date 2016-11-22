import chalk from 'chalk';

const NEWLINE_REGEX = /\r\n|[\n\v\f\r\x85\u2028\u2029]/;
const CONTEXT_LINES = 2;

function padLeft(text, length) {
  return (' '.repeat(length) + text).slice(-length);
}

function paintRange(lineNum, startLine, startColumn, endLine, endColumn) {
  let paintStart = Number.MAX_SAFE_INTEGER;
  let paintEnd = Number.MAX_SAFE_INTEGER;

  if (startLine <= lineNum && lineNum <= endLine) {
    if (lineNum === startLine) {
      paintStart = startColumn;
    } else {
      paintStart = 0;
    }
    if (lineNum === endLine) {
      paintEnd = endColumn;
    } else {
      paintEnd = Number.MAX_SAFE_INTEGER;
    }
  }
  return {paintStart, paintEnd};
}

function paintLine(line, from, to, color) {
  return `${line.slice(0, from)}${color(line.slice(from, to))}${line.slice(to)}`;
}

function formatLine(line, lineNum) {
  return `${chalk.gray(padLeft(lineNum + 1, 4))}|${line}\n`;
}

function codeContext(node, source, color) {
  const lines = source.split(NEWLINE_REGEX);
  const {start, end} = node.get('loc').value;

  const startLine = start.line - 1;
  const startColumn = start.column;
  const endLine = end.line - 1;
  const endColumn = end.column;

  const contextStart = Math.max(0, startLine - CONTEXT_LINES);
  const contextEnd = Math.min(lines.length, endLine + CONTEXT_LINES);

  let result = '';
  for (let i = contextStart; i <= contextEnd; i++) {
    const line = lines[i];
    const {paintStart, paintEnd} = paintRange(i, startLine, startColumn, endLine, endColumn);
    result += formatLine(paintLine(line, paintStart, paintEnd, color), i);
  }
  return result;
}

function logMessage(label, message, color, file, node, source) {
  const coloredLabel = color(`[${label}]`);
  const fileTag = file ? ` (${file.replace(/\.coffee$/, '.js')})` : '';
  const context = node && source ? `\n${codeContext(node, source, color)}` : '';
  return `${coloredLabel} ${message}${fileTag}${context}`;
}

export function warn(message, file, node, source) {
  // eslint-disable-next-line no-console
  console.warn(logMessage('warning', message, chalk.yellow, file, node, source));
}
