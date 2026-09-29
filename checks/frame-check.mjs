#!/usr/bin/env node

import { lstatSync, readFileSync, realpathSync, statSync } from 'node:fs';
import { extname, isAbsolute, relative, resolve, sep } from 'node:path';

const CHECKER_VERSION = '1.0.0';
const COVERAGE_VERSION = 'frame-check-1';
const SUPPORTED_EXTENSIONS = new Set(['.js', '.jsx', '.ts', '.tsx']);
const PALETTES = '(?:red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)';
const COLOR_CLASS = new RegExp(`^(?:[a-z0-9-]+:)*!?(?:bg|text|border|ring|from|to|via|fill|stroke)-${PALETTES}-[0-9]{2,3}(?:/[0-9]{1,3})?$`, 'i');
const HEX_CLASS = /\[#[0-9a-f]{3,8}\]/i;
const RAW_TYPE_CLASS = /^(?:[a-z0-9-]+:)*!?(?:(?:text|leading)-\[[0-9.]+px\]|text-(?:xs|sm|base|lg|xl|2xl|[3-9]xl)|font-(?:bold|semibold|medium|light))$/i;
const TOKEN_ALPHA = /^(?:[a-z0-9-]+:)*!?(?:bg|text|border|ring|fill|stroke)-(?:text|bg|card|input|selected|stroke|focus|warning|error|accent|tooltip|overlay|progress|scrim|dataviz)[a-z0-9-]*\/[0-9]{1,3}$/i;
const STYLE_COLOR = /^\s*(?:#[0-9a-f]{3,8}|rgba?\()/i;
const ALLOWED_SYMBOLS = new Set([0x2318, 0x2713, 0x2715, 0x2717]);
const JSX_ENTITY_NAMES = new Set(`quot amp apos lt gt nbsp iexcl cent pound curren yen brvbar sect uml copy ordf laquo not shy reg macr deg plusmn sup2 sup3 acute micro para middot cedil sup1 ordm raquo frac14 frac12 frac34 iquest Agrave Aacute Acirc Atilde Auml Aring AElig Ccedil Egrave Eacute Ecirc Euml Igrave Iacute Icirc Iuml ETH Ntilde Ograve Oacute Ocirc Otilde Ouml times Oslash Ugrave Uacute Ucirc Uuml Yacute THORN szlig agrave aacute acirc atilde auml aring aelig ccedil egrave eacute ecirc euml igrave iacute icirc iuml eth ntilde ograve oacute ocirc otilde ouml divide oslash ugrave uacute ucirc uuml yacute thorn yuml OElig oelig Scaron scaron Yuml fnof circ tilde Alpha Beta Gamma Delta Epsilon Zeta Eta Theta Iota Kappa Lambda Mu Nu Xi Omicron Pi Rho Sigma Tau Upsilon Phi Chi Psi Omega alpha beta gamma delta epsilon zeta eta theta iota kappa lambda mu nu xi omicron pi rho sigmaf sigma tau upsilon phi chi psi omega thetasym upsih piv ensp emsp thinsp zwnj zwj lrm rlm ndash mdash lsquo rsquo sbquo ldquo rdquo bdquo dagger Dagger bull hellip permil prime Prime lsaquo rsaquo oline frasl euro image weierp real trade alefsym larr uarr rarr darr harr crarr lArr uArr rArr dArr hArr forall part exist empty nabla isin notin ni prod sum minus lowast radic prop infin ang and or cap cup int there4 sim cong asymp ne equiv le ge sub sup nsub sube supe oplus otimes perp sdot lceil rceil lfloor rfloor lang rang loz spades clubs hearts diams`.split(' '));

const diagnosticDefinitions = {
  'FRAME-01-COLOR-CLASS': {
    ruleId: 'FRAME-01',
    severity: 'error',
    message: 'Use a Frame semantic color token class instead of a literal or Tailwind palette color.',
    remediation: 'Replace this class with the semantic Frame token that matches the intended role.',
    coverage: 'Static className values and value-producing conditional/logical branches only; comparisons, helper calls, dynamic classes, token existence, computed CSS, and rendered contrast remain human review.',
  },
  'FRAME-01-INLINE-STYLE': {
    ruleId: 'FRAME-01',
    severity: 'error',
    message: 'Use a Frame semantic color token class instead of a literal JSX style color or background.',
    remediation: 'Move the color role to a semantic Frame token class.',
    coverage: 'Direct JSX style object properties with static hex/rgb/rgba values only; computed styles and rendered contrast remain human review.',
  },
  'FRAME-02-RAW-TYPE-CLASS': {
    ruleId: 'FRAME-02',
    severity: 'error',
    message: 'Use an available Frame type-* class instead of a raw or native Tailwind typography class.',
    remediation: 'Choose the Frame type-* tier that matches the intended hierarchy.',
    coverage: 'Static className values and value-producing conditional/logical branches using the documented px/native class subset only; comparisons, helper calls, dynamic classes, CSS overrides, and installed style availability remain human review.',
  },
  'FRAME-03-TOKEN-ALPHA': {
    ruleId: 'FRAME-03',
    severity: 'error',
    message: 'Numeric slash alpha is unsupported on this Frame token family.',
    remediation: 'Choose an explicit semantic Frame token for the intended opacity and contrast.',
    coverage: 'Static className values and value-producing conditional/logical branches on the frame-check-1 token-family list only; comparisons, helper calls, generated CSS, and new token families remain human review.',
  },
  'FRAME-06-UI-EMOJI': {
    ruleId: 'FRAME-06',
    severity: 'advisory',
    message: 'Use a lucide-react icon instead of emoji UI chrome.',
    remediation: 'Replace the emoji with a named lucide-react icon and preserve an accessible control name.',
    coverage: 'Literal aria-label values and literal text directly inside intrinsic button elements only; content, generated messages, other icon libraries, letter substitutes, and inline SVG remain human review.',
  },
};

function parseArguments(argv) {
  let format = 'text';
  let separator = -1;
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === '--') {
      separator = index;
      break;
    }
    if (value === '--format' && (argv[index + 1] === 'text' || argv[index + 1] === 'json')) {
      format = argv[index + 1];
      index += 1;
      continue;
    }
    throw operational('FRAME-CHECK-INVALID-OPTIONS', 'Usage: node frame-check.mjs [--format text|json] -- <explicit files...>', format);
  }
  if (separator === -1) throw operational('FRAME-CHECK-INVALID-OPTIONS', 'The explicit -- separator is required before file paths.', format);
  const files = argv.slice(separator + 1);
  if (files.length === 0) throw operational('FRAME-CHECK-NO-INPUTS', 'At least one explicit .js, .jsx, .ts, or .tsx file is required.', format);
  return { format, files };
}

function operational(id, message, format = 'text', path) {
  return { frameOperational: true, id, message, format, path };
}

function insideRoot(root, candidate) {
  const path = relative(root, candidate);
  return path !== '' && path !== '..' && !path.startsWith(`..${sep}`) && !isAbsolute(path);
}

function normalizePath(path) {
  return path.split(sep).join('/');
}

function compareText(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}

function validateInputs(inputs) {
  const invocationRoot = realpathSync(process.cwd());
  const canonical = new Set();
  const files = [];
  for (const input of inputs) {
    const lexical = resolve(invocationRoot, input);
    const displayPath = insideRoot(invocationRoot, lexical) ? normalizePath(relative(invocationRoot, lexical)) : '<outside-invocation-root>';
    if (!insideRoot(invocationRoot, lexical)) {
      throw operational('FRAME-CHECK-OUTSIDE-ROOT', 'Every input must resolve inside the invocation root.', 'text', displayPath);
    }
    if (!SUPPORTED_EXTENSIONS.has(extname(lexical))) {
      throw operational('FRAME-CHECK-UNSUPPORTED-TYPE', 'Every input must use a supported .js, .jsx, .ts, or .tsx extension.', 'text', displayPath);
    }
    let metadata;
    let canonicalPath;
    try {
      metadata = lstatSync(lexical);
      canonicalPath = realpathSync(lexical);
    } catch {
      throw operational('FRAME-CHECK-MISSING-INPUT', 'An explicit input does not exist or cannot be resolved.', 'text', displayPath);
    }
    if (!insideRoot(invocationRoot, canonicalPath)) {
      throw operational('FRAME-CHECK-SYMLINK-ESCAPE', 'An input symlink resolves outside the invocation root.', 'text', displayPath);
    }
    let target;
    try {
      target = metadata.isSymbolicLink() ? statSync(canonicalPath) : metadata;
    } catch {
      throw operational('FRAME-CHECK-UNREADABLE-INPUT', 'An explicit input cannot be inspected.', 'text', displayPath);
    }
    if (!target.isFile()) throw operational('FRAME-CHECK-NOT-A-FILE', 'Directories and non-file inputs are not supported.', 'text', displayPath);
    if (canonical.has(canonicalPath)) throw operational('FRAME-CHECK-DUPLICATE-INPUT', 'Duplicate canonical input paths are not allowed.', 'text', displayPath);
    canonical.add(canonicalPath);
    let source;
    try {
      source = readFileSync(canonicalPath, 'utf8');
    } catch {
      throw operational('FRAME-CHECK-UNREADABLE-INPUT', 'An explicit input cannot be read as UTF-8 text.', 'text', displayPath);
    }
    files.push({ canonicalPath, path: normalizePath(relative(invocationRoot, lexical)), source });
  }
  return files.sort((a, b) => compareText(a.path, b.path));
}

function lineStarts(source) {
  const starts = [0];
  for (let index = 0; index < source.length; index += 1) {
    if (source[index] === '\r') {
      if (source[index + 1] === '\n') index += 1;
      starts.push(index + 1);
    } else if (source[index] === '\n') starts.push(index + 1);
  }
  return starts;
}

function locationAt(starts, offset) {
  let low = 0;
  let high = starts.length;
  while (low + 1 < high) {
    const middle = Math.floor((low + high) / 2);
    if (starts[middle] <= offset) low = middle;
    else high = middle;
  }
  return { line: low + 1, column: Math.max(0, offset - starts[low]) + 1 };
}

function boundedEvidence(value) {
  const normalized = String(value).replace(/[\u0000-\u001f\u007f]+/g, ' ').trim();
  return normalized.length <= 80 ? normalized : `${normalized.slice(0, 79)}…`;
}

function nodeChildren(node) {
  const children = [];
  for (const [key, value] of Object.entries(node)) {
    if (['loc', 'extra', 'leadingComments', 'innerComments', 'trailingComments', 'tokens', 'comments', 'errors'].includes(key)) continue;
    if (Array.isArray(value)) {
      for (const item of value) if (item && typeof item.type === 'string') children.push(item);
    } else if (value && typeof value.type === 'string') children.push(value);
  }
  return children;
}

function walk(node, visit) {
  visit(node);
  for (const child of nodeChildren(node)) walk(child, visit);
}

function attributeName(attribute) {
  return attribute?.type === 'JSXAttribute' && attribute.name?.type === 'JSXIdentifier' ? attribute.name.name : undefined;
}

function unwrapExpression(node) {
  let current = node;
  while (current && ['JSXExpressionContainer', 'TSAsExpression', 'TSSatisfiesExpression', 'TSTypeAssertion', 'TSNonNullExpression', 'ParenthesizedExpression'].includes(current.type)) {
    current = current.expression;
  }
  return current;
}

function appendOffsets(offsets, sourceOffset, length) {
  for (let index = 0; index < length; index += 1) offsets.push(sourceOffset);
}

function jsLiteralOffsets(raw, rawStart, template) {
  const offsets = [];
  for (let index = 0; index < raw.length;) {
    const sourceOffset = rawStart + index;
    const codePoint = raw.codePointAt(index);
    const width = codePoint > 0xffff ? 2 : 1;
    if (template && codePoint === 0x0d) {
      appendOffsets(offsets, sourceOffset, 1);
      index += raw.codePointAt(index + 1) === 0x0a ? 2 : 1;
      continue;
    }
    if (codePoint !== 0x5c) {
      appendOffsets(offsets, sourceOffset, width);
      index += width;
      continue;
    }

    index += 1;
    const escape = raw.codePointAt(index);
    if (escape === 0x0a || escape === 0x2028 || escape === 0x2029) {
      index += 1;
      continue;
    }
    if (escape === 0x0d) {
      index += raw.codePointAt(index + 1) === 0x0a ? 2 : 1;
      continue;
    }
    if (escape === 0x78) {
      appendOffsets(offsets, sourceOffset, 1);
      index += 3;
      continue;
    }
    if (escape === 0x75) {
      if (raw[index + 1] === '{') {
        const close = raw.indexOf('}', index + 2);
        const escapedCodePoint = Number.parseInt(raw.slice(index + 2, close), 16);
        appendOffsets(offsets, sourceOffset, escapedCodePoint > 0xffff ? 2 : 1);
        index = close + 1;
      } else {
        appendOffsets(offsets, sourceOffset, 1);
        index += 5;
      }
      continue;
    }
    if (escape >= 0x30 && escape <= 0x37) {
      let digits = 1;
      while (digits < 3 && /[0-7]/.test(raw[index + digits] ?? '')) digits += 1;
      appendOffsets(offsets, sourceOffset, 1);
      index += digits;
      continue;
    }
    const escapeWidth = escape > 0xffff ? 2 : 1;
    appendOffsets(offsets, sourceOffset, escapeWidth);
    index += escapeWidth;
  }
  return offsets;
}

function jsxLiteralOffsets(raw, rawStart) {
  const offsets = [];
  for (let index = 0; index < raw.length;) {
    const sourceOffset = rawStart + index;
    if (raw[index] === '\r') {
      appendOffsets(offsets, sourceOffset, 1);
      index += raw[index + 1] === '\n' ? 2 : 1;
      continue;
    }
    if (raw[index] === '&') {
      const entity = raw.slice(index).match(/^&(#(?:[xX][0-9a-fA-F]+|[0-9]+)|[A-Za-z0-9]+);/);
      if (entity) {
        const description = entity[1];
        let decodedLength;
        if (description.startsWith('#')) {
          const hex = description[1]?.toLowerCase() === 'x';
          const codePoint = Number.parseInt(description.slice(hex ? 2 : 1), hex ? 16 : 10);
          if (Number.isInteger(codePoint) && codePoint <= 0x10ffff) decodedLength = codePoint > 0xffff ? 2 : 1;
        } else if (JSX_ENTITY_NAMES.has(description)) {
          decodedLength = 1;
        }
        if (decodedLength) {
          appendOffsets(offsets, sourceOffset, decodedLength);
          index += entity[0].length;
          continue;
        }
      }
    }
    const codePoint = raw.codePointAt(index);
    const width = codePoint > 0xffff ? 2 : 1;
    appendOffsets(offsets, sourceOffset, width);
    index += width;
  }
  return offsets;
}

function mappedLiteral(text, raw, rawStart, syntax) {
  const offsets = syntax === 'jsx' ? jsxLiteralOffsets(raw, rawStart) : jsLiteralOffsets(raw, rawStart, syntax === 'template');
  if (offsets.length !== text.length) throw Error('Static literal source mapping failed');
  return { text, start: rawStart, offsetAt: index => offsets[index] ?? rawStart + raw.length };
}

function staticLiteral(node, source, syntax = 'js') {
  const current = unwrapExpression(node);
  if (!current) return undefined;
  if (current.type === 'StringLiteral') {
    const rawStart = (current.start ?? 0) + 1;
    const rawEnd = Math.max(rawStart, (current.end ?? rawStart) - 1);
    return mappedLiteral(current.value, source.slice(rawStart, rawEnd), rawStart, syntax);
  }
  if (current.type === 'TemplateLiteral' && current.expressions.length === 0) {
    const quasi = current.quasis[0];
    const text = quasi?.value.cooked ?? quasi?.value.raw ?? '';
    const rawStart = quasi?.start ?? current.start ?? 0;
    const rawEnd = quasi?.end ?? rawStart;
    return mappedLiteral(text, source.slice(rawStart, rawEnd), rawStart, 'template');
  }
  return undefined;
}

function collectClassLiterals(attribute, source) {
  const literals = [];
  const collect = (node, syntax = 'js') => {
    const expression = unwrapExpression(node);
    if (!expression) return;
    const literal = staticLiteral(expression, source, syntax);
    if (literal) {
      if (!literals.some(item => item.start === literal.start && item.text === literal.text)) literals.push(literal);
      return;
    }
    if (expression.type === 'ConditionalExpression') {
      collect(expression.consequent);
      collect(expression.alternate);
      return;
    }
    if (expression.type === 'LogicalExpression') {
      collect(expression.left);
      collect(expression.right);
      return;
    }
    if (expression.type === 'SequenceExpression') collect(expression.expressions.at(-1));
    if (expression.type === 'AssignmentExpression') collect(expression.right);
    if (expression.type === 'AwaitExpression' || expression.type === 'YieldExpression') collect(expression.argument);
  };
  collect(attribute.value, attribute.value?.type === 'StringLiteral' ? 'jsx' : 'js');
  return literals;
}

function parserPluginVariants(extension) {
  const language = extension === '.ts' || extension === '.tsx' ? ['typescript'] : [];
  const jsx = extension === '.ts' ? [] : ['jsx'];
  const base = [...language, ...jsx];
  return [
    ['decorators', 'decoratorAutoAccessors', ...base],
    ['decorators-legacy', 'decoratorAutoAccessors', ...base],
  ];
}

function parseSource(parser, file) {
  let failure;
  for (const plugins of parserPluginVariants(extname(file.path))) {
    try {
      return parser.parse(file.source, {
        sourceType: 'unambiguous',
        sourceFilename: file.path,
        errorRecovery: false,
        plugins,
      });
    } catch (error) {
      failure ??= error;
    }
  }
  throw failure;
}

function propertyName(property) {
  if (property.computed) return undefined;
  if (property.key?.type === 'Identifier' || property.key?.type === 'StringLiteral') return property.key.name ?? property.key.value;
  return undefined;
}

function intrinsicElementName(element) {
  return element.openingElement?.name?.type === 'JSXIdentifier' && /^[a-z]/.test(element.openingElement.name.name)
    ? element.openingElement.name.name
    : undefined;
}

function isEmojiCodePoint(codePoint) {
  if (ALLOWED_SYMBOLS.has(codePoint)) return false;
  return (codePoint >= 0x1f1e6 && codePoint <= 0x1f1ff)
    || (codePoint >= 0x1f300 && codePoint <= 0x1faff)
    || (codePoint >= 0x2600 && codePoint <= 0x27bf)
    || (codePoint >= 0x2300 && codePoint <= 0x23ff)
    || (codePoint >= 0x2b00 && codePoint <= 0x2bff);
}

function emojiOccurrences(text) {
  const occurrences = [];
  let offset = 0;
  for (const character of text) {
    const codePoint = character.codePointAt(0);
    if (isEmojiCodePoint(codePoint)) occurrences.push({ character, offset });
    offset += character.length;
  }
  return occurrences;
}

function makeFinding(file, starts, diagnosticId, offset, evidence) {
  const definition = diagnosticDefinitions[diagnosticId];
  const location = locationAt(starts, Math.max(0, offset));
  return {
    path: file.path,
    line: location.line,
    column: location.column,
    ruleId: definition.ruleId,
    diagnosticId,
    severity: definition.severity,
    evidence: boundedEvidence(evidence),
    message: definition.message,
    remediation: definition.remediation,
    coverage: definition.coverage,
  };
}

function scanAst(file, ast) {
  const starts = lineStarts(file.source);
  const findings = [];
  const seen = new Set();
  const add = (diagnosticId, offset, evidence) => {
    const finding = makeFinding(file, starts, diagnosticId, offset, evidence);
    const key = `${finding.path}:${finding.line}:${finding.column}:${finding.ruleId}:${finding.diagnosticId}:${finding.evidence}`;
    if (!seen.has(key)) {
      seen.add(key);
      findings.push(finding);
    }
  };

  walk(ast.program, node => {
    if (node.type === 'JSXAttribute' && attributeName(node) === 'className') {
      for (const literal of collectClassLiterals(node, file.source)) {
        for (const match of literal.text.matchAll(/\S+/g)) {
          const token = match[0];
          const offset = literal.offsetAt(match.index ?? 0);
          if (HEX_CLASS.test(token) || COLOR_CLASS.test(token)) add('FRAME-01-COLOR-CLASS', offset, token);
          if (RAW_TYPE_CLASS.test(token)) add('FRAME-02-RAW-TYPE-CLASS', offset, token);
          if (TOKEN_ALPHA.test(token)) add('FRAME-03-TOKEN-ALPHA', offset, token);
        }
      }
    }

    if (node.type === 'JSXAttribute' && attributeName(node) === 'style') {
      const object = unwrapExpression(node.value);
      if (object?.type === 'ObjectExpression') {
        for (const property of object.properties) {
          if (property.type !== 'ObjectProperty') continue;
          const key = propertyName(property);
          if (!key || !/^(?:color|background[a-z]*)$/i.test(key)) continue;
          const literal = staticLiteral(property.value, file.source);
          if (literal && STYLE_COLOR.test(literal.text)) add('FRAME-01-INLINE-STYLE', literal.offsetAt(0), `${key}: ${literal.text}`);
        }
      }
    }

    if (node.type === 'JSXAttribute' && attributeName(node) === 'aria-label') {
      const literal = staticLiteral(node.value, file.source, node.value?.type === 'StringLiteral' ? 'jsx' : 'js');
      if (literal) for (const emoji of emojiOccurrences(literal.text)) add('FRAME-06-UI-EMOJI', literal.offsetAt(emoji.offset), emoji.character);
    }

    if (node.type === 'JSXElement' && intrinsicElementName(node) === 'button') {
      for (const child of node.children) {
        let literal;
        if (child.type === 'JSXText') {
          const start = child.start ?? 0;
          literal = mappedLiteral(child.value, file.source.slice(start, child.end ?? start), start, 'jsx');
        }
        if (child.type === 'JSXExpressionContainer') literal = staticLiteral(child.expression, file.source);
        if (literal) for (const emoji of emojiOccurrences(literal.text)) add('FRAME-06-UI-EMOJI', literal.offsetAt(emoji.offset), emoji.character);
      }
    }
  });
  return findings;
}

function compareFindings(a, b) {
  return compareText(a.path, b.path)
    || a.line - b.line
    || a.column - b.column
    || compareText(a.ruleId, b.ruleId)
    || compareText(a.diagnosticId, b.diagnosticId)
    || compareText(a.evidence, b.evidence);
}

function resultDocument(files, findings) {
  return {
    schemaVersion: 1,
    checker: 'frame-check',
    checkerVersion: CHECKER_VERSION,
    coverageVersion: COVERAGE_VERSION,
    status: findings.length ? 'findings' : 'clean-supported-subset',
    scannedFiles: files.map(file => file.path),
    findings,
    summary: {
      files: files.length,
      findings: findings.length,
      errors: findings.filter(finding => finding.severity === 'error').length,
      advisories: findings.filter(finding => finding.severity === 'advisory').length,
      certification: false,
    },
  };
}

function renderText(result) {
  const lines = result.findings.map(finding => `${finding.path}:${finding.line}:${finding.column} ${finding.severity.toUpperCase()} ${finding.ruleId}/${finding.diagnosticId} ${finding.message} Evidence: ${finding.evidence}`);
  lines.push(`frame-check: ${result.summary.files} file(s), ${result.summary.errors} error(s), ${result.summary.advisories} advisory finding(s); supported subset only, not certification.`);
  return `${lines.join('\n')}\n`;
}

function renderOperational(error, format) {
  if (format === 'json') {
    return `${JSON.stringify({
      schemaVersion: 1,
      checker: 'frame-check',
      checkerVersion: CHECKER_VERSION,
      status: 'operational-error',
      exitCode: 2,
      diagnostic: {
        id: error.id,
        ...(error.path ? { path: error.path } : {}),
        message: error.message,
      },
    }, null, 2)}\n`;
  }
  return `frame-check: operational error ${error.id}${error.path ? ` (${error.path})` : ''}: ${error.message}\n`;
}

async function main() {
  let format = 'text';
  try {
    const major = Number.parseInt(process.versions.node.split('.')[0], 10);
    if (!Number.isInteger(major) || major < 20) throw operational('FRAME-CHECK-UNSUPPORTED-RUNTIME', 'Node.js 20 or newer is required.', format);
    const parsed = parseArguments(process.argv.slice(2));
    format = parsed.format;
    const files = validateInputs(parsed.files);
    let parser;
    try {
      parser = await import('@babel/parser');
    } catch {
      throw operational('FRAME-CHECK-MISSING-DEPENDENCY', 'Install the exact dependencies from checks/package-lock.json with npm ci before scanning.', format);
    }
    const findings = [];
    for (const file of files) {
      let ast;
      try {
        ast = parseSource(parser, file);
      } catch (error) {
        const line = Number.isInteger(error?.loc?.line) ? error.loc.line : undefined;
        const column = Number.isInteger(error?.loc?.column) ? error.loc.column + 1 : undefined;
        const location = line && column ? ` at ${line}:${column}` : '';
        throw operational('FRAME-CHECK-PARSE-FAILURE', `Parser could not establish a valid AST${location}.`, format, file.path);
      }
      findings.push(...scanAst(file, ast));
    }
    findings.sort(compareFindings);
    const result = resultDocument(files, findings);
    process.stdout.write(format === 'json' ? `${JSON.stringify(result, null, 2)}\n` : renderText(result));
    process.exitCode = findings.length ? 1 : 0;
  } catch (error) {
    const safe = error?.frameOperational ? error : operational('FRAME-CHECK-INTERNAL-FAILURE', 'The supported scan could not complete.', format);
    process.stderr.write(renderOperational(safe, safe.format === 'json' || format === 'json' ? 'json' : 'text'));
    process.exitCode = 2;
  }
}

await main();
