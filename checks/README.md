# Frame portable checks

`frame-check` is a small, read-only Node.js CLI for the narrowly documented machine-checkable subset of Frame's implementation rules. It scans only explicit JavaScript, JSX, TypeScript, and TSX files. It does not install Frame, expand globs, inspect Git history, edit source, access a network, read credentials, upload data, or certify a design.

## Requirements and install

- Node.js 20 or newer.
- npm with lockfile support.
- No Git repository, Frame package, account, secret, or network access at scan time.

Install the exact parser dependency from this directory's integrity lock:

```sh
npm ci --ignore-scripts --prefix /path/to/frame-design-system/checks
```

The runtime dependency is `@babel/parser` 7.29.3. Its resolved transitive packages (`@babel/types`, `@babel/helper-string-parser`, and `@babel/helper-validator-identifier`) are pinned by `package-lock.json`; all declare the MIT license. The checker itself is covered by Frame's MIT license. npm needs registry access only during installation unless its cache already contains the locked packages. The checker performs no network operation.

## Run

Run from the root that contains every input file:

```sh
cd /path/to/your-project
node /path/to/frame-design-system/checks/frame-check.mjs -- src/App.tsx "src/path with spaces/Button.jsx"
node /path/to/frame-design-system/checks/frame-check.mjs --format json -- src/App.tsx
```

Invocation is exactly:

```text
node frame-check.mjs [--format text|json] -- <explicit files...>
```

The `--` separator and at least one file are required. The checker accepts argv file paths, not glob patterns; a shell may expand a glob before invocation. Inputs must remain inside the current invocation root. Supported extensions are `.js`, `.jsx`, `.ts`, and `.tsx`. The parser accepts current decorators (including placement before or after `export` and decorator auto-accessors) and falls back to Babel's legacy decorator grammar for common legacy forms such as parameter decorators.

Directories, unsupported types, nonexistent or unreadable files, duplicate canonical paths, a symlink or path outside the invocation root, parser failure, a missing dependency, an unsupported runtime, invalid options, and zero files are operational errors. They never report a misleading clean result.

## Results

- Exit `0`: the supported subset completed with no finding. This is not certification.
- Exit `1`: one or more supported error or advisory findings.
- Exit `2`: the scan could not establish its input, runtime, dependency, or parser prerequisites.

Text and JSON findings are sorted by normalized path, one-based line and column, rule ID, and diagnostic ID. Locations refer to the original source text even when a static literal contains JavaScript escapes, line continuations, template escapes, or JSX entities before the finding. Each finding contains bounded evidence, a message, remediation, and its declared coverage boundary. The checker never prints a full source file.

`frame-check-coverage.json` is the versioned coverage contract. V1 implements AST-backed partial-error diagnostics for FRAME-01 through FRAME-03 and one narrow FRAME-06 advisory for emoji in a literal `aria-label` or literal text directly inside an intrinsic `<button>`. FRAME-04, FRAME-05, and FRAME-07 through FRAME-11 are human-only. All 13 Frame principles remain human-reviewed guidance.

For `className`, the checker follows direct static strings and the value-producing branches of conditional and logical expressions. It deliberately does not treat strings used only by comparisons, property access, or arbitrary helper-call arguments as class values. Dynamic classes, helper return values, computed CSS, token existence, themes, rendered contrast, component reuse, surface hierarchy, other icon libraries, inline SVG, touch size, focus behavior, accessible behavior, visual quality, and generated-message semantics remain outside automated coverage. Review those against the [AI implementation guide](../guides/ai-implementation-guide.md), [11 rules](../rules/frame-rules.json), and [design principles](https://system.beibeidesign.com/#principles).

## Security and versioning

The CLI imports only read-side filesystem/path APIs plus the locked parser. It has no autofix option, write path, child-process execution, network module, telemetry, environment/credential read, or upload path. Release verification runs it in a fresh consumer with write/network/process guards and checks that candidate bytes remain unchanged.

Checker `1.0.0` uses coverage profile `frame-check-1`. Future rule coverage or token-family changes require a new documented coverage version; absence of a finding never expands the declared boundary.
