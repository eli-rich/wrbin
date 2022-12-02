import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { useRouteData } from '@solidjs/router';
import { gruvboxDark } from 'cm6-theme-gruvbox-dark';
import { basicSetup } from 'codemirror';
import { createEffect, createMemo, onMount } from 'solid-js';

export default function EditorViewer() {
  let editorParent!: HTMLDivElement;
  let editor: EditorView;
  const post: any = useRouteData();
  const title = createMemo(() => (post() ? post().title : 'Loading...'));
  // const [lang, setLang] = createSignal<string>('Text');
  createEffect(() => {
    if (post() === undefined) return;
    if (editor) {
      editor.dispatch({
        changes: {
          from: 0,
          to: editor.state.doc.length,
          insert: post().content,
        },
      });
    }
  });
  onMount(() => {
    const theme = EditorView.baseTheme({
      '&': {
        width: '100%',
        margin: '2rem auto 0 auto',
      },
    });

    // create a readonly editor
    editor = new EditorView({
      doc: post() ? post().content : 'Loading...',
      parent: editorParent,
      extensions: [basicSetup, theme, gruvboxDark, EditorState.readOnly.of(true)],
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
