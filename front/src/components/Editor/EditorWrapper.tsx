import { basicSetup } from 'codemirror';
import { EditorView } from '@codemirror/view';
import { gruvboxDark } from 'cm6-theme-gruvbox-dark';
import { onMount } from 'solid-js';
import EditorOptions from './EditorOptions';

export default function EditorWrapper() {
  let editorParent!: HTMLDivElement;
  let editor: EditorView;

  const handleUpload = async () => {
    const result = await fetch('http://localhost:3000/api/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: editor.state.doc.toJSON().join('\n') }),
    });
  };
  onMount(() => {
    const theme = EditorView.baseTheme({
      '&': {
        width: '100%',
        margin: '2rem auto 0 auto',
      },
    });
    editor = new EditorView({
      doc: '',
      parent: editorParent,
      extensions: [basicSetup, theme, gruvboxDark],
    });
  });

  return (
    <>
      <div ref={editorParent} class='bg-[#282828] min-h-[66vh] h-fit mx-auto w-[80%]' />
      <EditorOptions handleUpload={handleUpload} />
    </>
  );
}
