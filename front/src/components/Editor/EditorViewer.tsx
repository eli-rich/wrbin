const { javascriptLanguage, typescriptLanguage, jsxLanguage, tsxLanguage } = await import(
  '@codemirror/lang-javascript'
);

const { htmlLanguage } = await import('@codemirror/lang-html');
const { cppLanguage } = await import('@codemirror/lang-cpp');
const { cssLanguage } = await import('@codemirror/lang-css');
const { rustLanguage } = await import('@codemirror/lang-rust');
const { jsonLanguage } = await import('@codemirror/lang-json');
const { markdownLanguage } = await import('@codemirror/lang-markdown');
const { javaLanguage } = await import('@codemirror/lang-java');
const { phpLanguage } = await import('@codemirror/lang-php');

const { pythonLanguage } = await import('@codemirror/lang-python');
import { LRLanguage } from '@codemirror/language';
import { EditorView } from '@codemirror/view';
import { useRouteData } from '@solidjs/router';
import { gruvboxDark } from 'cm6-theme-gruvbox-dark';
import { basicSetup } from 'codemirror';
import { createEffect, createMemo } from 'solid-js';

export default function EditorViewer() {
  let editorParent!: HTMLDivElement;
  let editor: EditorView;
  const post: any = useRouteData();
  const title = createMemo(() => (post() ? post().title : 'Loading...'));
  const theme = EditorView.baseTheme({
    '&': {
      width: '100%',
      margin: '2rem auto 0 auto',
    },
  });
  createEffect(() => {
    if (post() === undefined) return;
    if (!editor) {
      editor = new EditorView({
        doc: post().content,
        parent: editorParent,
        extensions: [basicSetup, theme, gruvboxDark],
      });
    }
    const content = editor.state.doc.toJSON().join('\n');
    let language: LRLanguage | undefined;
    switch (post().lang) {
      case 'Markdown':
        language = markdownLanguage as LRLanguage;
        break;
      case 'JavaScript':
        language = javascriptLanguage;
        break;
      case 'Python':
        language = pythonLanguage;
        break;
      case 'TypeScript':
        language = typescriptLanguage;
        break;
      case 'JSX':
        language = jsxLanguage;
        break;
      case 'TSX':
        language = tsxLanguage;
        break;
      case 'HTML':
        language = htmlLanguage;
        break;
      case 'CSS':
        language = cssLanguage;
        break;
      case 'JSON':
        language = jsonLanguage;
        break;
      case 'C++':
        language = cppLanguage;
        break;
      case 'Rust':
        language = rustLanguage;
        break;
      case 'Java':
        language = javaLanguage;
        break;
      case 'PHP':
        language = phpLanguage;
        break;
      default:
        language = undefined;
        break;
    }
    if (editor) editor.destroy();
    if (language === undefined) {
      editor = new EditorView({
        parent: editorParent,
        doc: content,
        extensions: [basicSetup, theme, gruvboxDark],
      });
      return;
    }
    editor = new EditorView({
      parent: editorParent,
      doc: content,
      extensions: [basicSetup, theme, gruvboxDark, language],
    });
  });

  return (
    <>
      <div class='flex mt-4 -mb-4 w-[80%] mx-auto justify-between'>
        <div class='form-control'>
          <label class='input-group'>
            <span>Title</span>
            <input
              type='text'
              class='input input-bordered input-primary'
              value={title()}
              readOnly={true}
            />
          </label>
        </div>
        <button
          class='btn btn-primary'
          onClick={() => (window.location.href = window.location.href.replace('/bin', '/raw'))}
        >
          Raw
        </button>
      </div>
      <div ref={editorParent} class='bg-[#282828] h-[66vh] mx-auto w-[80%]' />
    </>
  );
}
