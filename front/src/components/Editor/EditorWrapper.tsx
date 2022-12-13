import { createEffect, createSignal } from 'solid-js';
import EditorOptions from './EditorOptions';
import Modal from '../Modal';
import { A } from '@solidjs/router';

import { basicSetup } from 'codemirror';
import { EditorView } from '@codemirror/view';
import { dracula } from 'thememirror';
import getLanguageFromOption from './language';

export default function EditorWrapper() {
  let editorParent!: HTMLDivElement;
  let editor: EditorView;

  const [showLink, setShowLink] = createSignal<boolean>(false);
  const [link, setLink] = createSignal<string>('');
  const [showErrModal, setShowErrModal] = createSignal<boolean>(false);
  const [err, setErr] = createSignal<string>('');

  const [lang, setLang] = createSignal<string>('Text');

  let title!: HTMLInputElement;
  const handleUpload = async () => {
    let result: Response;
    let data: any;
    try {
      result = await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: editor.state.doc.toJSON().join('\n').trim(),
          title: title.value,
          lang: lang(),
        }),
      });
      data = await result.json();
    } catch (e: any) {
      setShowErrModal(true);
      setErr(e.message ?? 'Error.');
      return console.error(e);
    }
    if (data.error) {
      setShowErrModal(true);
      setErr(data.error);
      return console.error(data.error);
    }
    setLink(`/${data.message}`);
    setShowLink(true);
  };

  const theme = EditorView.baseTheme({
    '&': {
      width: '100%',
      margin: '2rem auto 0 auto',
    },
  });

  const updateLang = (e: Event) => {
    setLang((e.target as HTMLSelectElement).value);
  };
  createEffect(() => {
    if (!editor) {
      editor = new EditorView({
        doc: '',
        parent: editorParent,
        extensions: [basicSetup, theme, dracula],
      });
    }
    const content = editor.state.doc.toJSON().join('\n');
    const language = getLanguageFromOption(lang());
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
              placeholder='My Bin'
              class='input input-bordered input-primary'
              ref={title}
            />
          </label>
        </div>
        <EditorOptions handleUpload={handleUpload} updateLang={updateLang} />
      </div>

      <div
        ref={editorParent}
        class='bg-[#272935] min-h-[66vh] h-fit mx-auto w-[80%] drop-shadow-2xl'
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
          <A href={`/bin${link()}`} class='text-accent underline decoration-secondary'>
            here
          </A>
        </p>
      </Modal>
      <Modal
        htmlName='error-modal'
        show={showErrModal}
        showHandler={setShowErrModal}
        title='Error!'
        centered={false}
      >
        <p class='text-xl'>{err()}</p>
      </Modal>
    </>
  );
}
