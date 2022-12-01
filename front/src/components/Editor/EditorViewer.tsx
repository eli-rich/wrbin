import { EditorView } from '@codemirror/view';
import { useRouteData } from '@solidjs/router';
import { gruvboxDark } from 'cm6-theme-gruvbox-dark';
import { basicSetup } from 'codemirror';
import { createEffect, onMount } from 'solid-js';

export default function EditorViewer() {
  let editorParent!: HTMLDivElement;
  let editor: EditorView;
  const content: any = useRouteData();
  createEffect(() => {
    if (content() === undefined) return;
    if (editor) {
      editor.dispatch({
        changes: {
          from: 0,
          to: editor.state.doc.length,
          insert: content(),
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
    editor = new EditorView({
      doc: content(),
      parent: editorParent,
      extensions: [basicSetup, theme, gruvboxDark],
    });
  });

  return (
    <>
      <div ref={editorParent} class='bg-[#282828] h-[66vh] mx-auto w-[80%]' />
    </>
  );
}
