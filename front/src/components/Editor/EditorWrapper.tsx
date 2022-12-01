import { basicSetup } from 'codemirror';
import { EditorView } from '@codemirror/view';
import { gruvboxDark } from 'cm6-theme-gruvbox-dark';
import { createSignal, onMount } from 'solid-js';
import EditorOptions from './EditorOptions';
import Modal from '../Modal';
import { A } from '@solidjs/router';

export default function EditorWrapper() {
  let editorParent!: HTMLDivElement;
  let editor: EditorView;

  const [showLink, setShowLink] = createSignal<boolean>(false);
  const [link, setLink] = createSignal<string>('');
  let title!: HTMLInputElement;
  const handleUpload = async () => {
    const result = await fetch('/api/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: editor.state.doc.toJSON().join('\n'), title: title.value }),
    });
    const data = await result.json();
    setLink(`/${data.message}`);
    setShowLink(true);
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
      <div class='flex mt-4 -mb-4 w-[80%] mx-auto justify-between'>
        <div class='form-control'>
          <label class='input-group'>
            <span>Title</span>
            <input
              type='text'
              placeholder='My Bin'
              class='input input-bordered input-primary'
              ref={title}
            />
          </label>
        </div>
        <EditorOptions handleUpload={handleUpload} />
      </div>

      <div
        ref={editorParent}
        class='bg-[#282828] min-h-[66vh] h-fit mx-auto w-[80%]'
        onClick={() => editor.focus()}
      />
      <Modal
        htmlName='link-modal'
        show={showLink}
        showHandler={setShowLink}
        title='File saved successfully!'
        centered={true}
      >
        <p class='text-xl'>
          View your file:{' '}
          <A href={link()} class='text-accent underline decoration-secondary'>
            here
          </A>
        </p>
      </Modal>
    </>
  );
}
