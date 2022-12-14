import { EditorView } from '@codemirror/view';
import { useRouteData } from '@solidjs/router';
import { dracula } from 'thememirror';
import { basicSetup } from 'codemirror';
import { createEffect, createMemo } from 'solid-js';
import getLanguageFromOption from './language';

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
  createEffect(async () => {
    if (post() === undefined) return;
    if (!editor) {
      editor = new EditorView({
        doc: post().content,
        parent: editorParent,
        extensions: [basicSetup, theme, dracula],
      });
    }
    const content = editor.state.doc.toJSON().join('\n');
    const language = await getLanguageFromOption(post().lang);
    if (editor) editor.destroy();
    if (language === undefined) {
      editor = new EditorView({
        parent: editorParent,
        doc: content,
        extensions: [basicSetup, theme, dracula],
      });
      return;
    }
    editor = new EditorView({
      parent: editorParent,
      doc: content,
      extensions: [basicSetup, theme, dracula, language],
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
      <div
        ref={editorParent}
        class='bg-[#2d2f3f] min-h-[66vh] h-fit mx-auto w-[80%] drop-shadow-2xl'
        onClick={() => editor.focus()}
      />
    </>
  );
}
