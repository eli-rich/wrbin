interface EditorOptionsProps {
  updateLang: (e: Event) => void;
}
export default function EditorOptions(props: EditorOptionsProps) {
  return (
    <>
      <div class='flex gap-4'>
        <select class='select select-secondary w-[10rem]' onInput={props.updateLang}>
          <option selected>Text</option>
          <option>JavaScript</option>
          <option>TypeScript</option>
          <option>CoffeeScript</option>
          <option>Python</option>
          <option>Ruby</option>
          <option>HTML</option>
          <option>CSS</option>
          <option>SASS</option>
          <option>JSX</option>
          <option>TSX</option>
          <option>PHP</option>
          <option>C</option>
          <option>C++</option>
          <option>Go</option>
          <option>Rust</option>
          <option>C#</option>
          <option>Java</option>
          <option>Kotlin</option>
          <option>Swift</option>
          <option>Dart</option>
          <option>Shell</option>
          <option>Powershell</option>
          <option>Markdown</option>
          <option>JSON</option>
          <option>Brainfuck</option>
        </select>
      </div>
    </>
  );
}
