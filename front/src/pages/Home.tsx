import { lazy } from 'solid-js';
import Main from '../layouts/Main';
const EditorWrapper = lazy(() => import('../components/Editor/EditorWrapper'));
export default function Home() {
  return (
    <>
      <Main>
        <main>
          <EditorWrapper />
        </main>
      </Main>
    </>
  );
}
