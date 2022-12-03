interface EditorOptionsProps {
  handleUpload: () => Promise<void>;
  updateLang: (e: Event) => void;
}
export default function EditorOptions(props: EditorOptionsProps) {
  return (
    <>
      <div class='flex gap-4'>
        <select class='select select-secondary w-[10rem]' onInput={props.updateLang}>
          <option selected>Text</option>
          <option>Markdown</option>
          <option>JavaScript</option>
          <option>HTML</option>
          <option>CSS</option>
          <option>JSON</option>
          <option>TypeScript</option>
          <option>JSX</option>
          <option>TSX</option>
          <option>Python</option>
          <option>PHP</option>
          <option>Java</option>
          <option>C++</option>
          <option>Rust</option>
        </select>
        <button class='btn btn-secondary btn-outline w-[10rem]' onClick={props.handleUpload}>
          Save
        </button>
      </div>
    </>
  );
}
