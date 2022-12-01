interface EditorOptionsProps {
  handleUpload: () => Promise<void>;
}
export default function EditorOptions(props: EditorOptionsProps) {
  return (
    <>
      <div class='flex gap-4'>
        <select class='select select-secondary w-[10rem]'>
          <option selected>Text</option>
          <option disabled>Java</option>
          <option disabled>Go</option>
          <option disabled>C</option>
          <option disabled>C#</option>
          <option disabled>C++</option>
          <option disabled>Rust</option>
          <option disabled>JavaScript</option>
          <option disabled>Python</option>
        </select>
        <button class='btn btn-secondary btn-outline w-[10rem]' onClick={props.handleUpload}>
          Save
        </button>
      </div>
    </>
  );
}
