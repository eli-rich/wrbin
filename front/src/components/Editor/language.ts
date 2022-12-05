const { javascriptLanguage, typescriptLanguage, jsxLanguage, tsxLanguage } = await import(
  '@codemirror/lang-javascript'
);

import { htmlLanguage } from '@codemirror/lang-html';
import { cppLanguage } from '@codemirror/lang-cpp';
import { cssLanguage } from '@codemirror/lang-css';
import { rustLanguage } from '@codemirror/lang-rust';
import { jsonLanguage } from '@codemirror/lang-json';
import { markdownLanguage } from '@codemirror/lang-markdown';
import { javaLanguage } from '@codemirror/lang-java';
import { phpLanguage } from '@codemirror/lang-php';

import { pythonLanguage } from '@codemirror/lang-python';
import { Language, LRLanguage, StreamLanguage } from '@codemirror/language';

import { go } from '@codemirror/legacy-modes/mode/go';
import { sass } from '@codemirror/legacy-modes/mode/sass';
import { coffeeScript } from '@codemirror/legacy-modes/mode/coffeescript';
import { brainfuck } from '@codemirror/legacy-modes/mode/brainfuck';
import { powerShell } from '@codemirror/legacy-modes/mode/powershell';
import { shell } from '@codemirror/legacy-modes/mode/shell';
import { swift } from '@codemirror/legacy-modes/mode/swift';
import { csharp, dart, kotlin, c } from '@codemirror/legacy-modes/mode/clike';
import { ruby } from '@codemirror/legacy-modes/mode/ruby';

const languages: { [key: string]: LRLanguage | Language | undefined } = {
  Text: undefined,
  JavaScript: javascriptLanguage,
  TypeScript: typescriptLanguage,
  CoffeeScript: StreamLanguage.define(coffeeScript),
  JSX: jsxLanguage,
  TSX: tsxLanguage,
  HTML: htmlLanguage,
  CSS: cssLanguage,
  SASS: StreamLanguage.define(sass),
  'C++': cppLanguage,
  C: StreamLanguage.define(c),
  Go: StreamLanguage.define(go),
  Dart: StreamLanguage.define(dart),
  Kotlin: StreamLanguage.define(kotlin),
  Rust: rustLanguage,
  JSON: jsonLanguage,
  Markdown: markdownLanguage,
  Java: javaLanguage,
  'C#': StreamLanguage.define(csharp),
  PHP: phpLanguage,
  Python: pythonLanguage,
  Ruby: StreamLanguage.define(ruby),
  Swift: StreamLanguage.define(swift),
  Shell: StreamLanguage.define(shell),
  Powershell: StreamLanguage.define(powerShell),
  Brainfuck: StreamLanguage.define(brainfuck),
};

export default function getLanguageFromOption(option: string) {
  const language = languages[option];
  return language;
}
