import { EditorView } from '@codemirror/view';
import { useParams } from '@solidjs/router';
import { gruvboxDark } from 'cm6-theme-gruvbox-dark';
import { basicSetup } from 'codemirror';
import { onMount } from 'solid-js';

export default function EditorViewer() {
  let editorParent!: HTMLDivElement;
  let editor: EditorView;

  const params = useParams();

  onMount(async () => {
    const { slug } = params;
    const response = await fetch(`/api/post?slug=${slug}`);
    const { content } = await response.json();
    const theme = EditorView.baseTheme({
      '&': {
        width: '100%',
        margin: '2rem auto 0 auto',
      },
    });
    editor = new EditorView({
      doc: content,
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
