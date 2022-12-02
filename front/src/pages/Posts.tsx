import { useRouteData } from '@solidjs/router';
import { createEffect, createSignal, For } from 'solid-js';
import PostThumb from '../components/PostThumb';
import Main from '../layouts/Main';

interface Post {
  AuthorID: string;
  Title: string;
  Lang: string;
  Slug: string;
}

export default function Posts() {
  const posts: any = useRouteData();
  const [postArr, setPostArr] = createSignal<Post[]>();
  createEffect(() => {
    if (posts() === undefined) return;
    setPostArr(posts());
  });
  return (
    <>
      <Main>
        <main class='w-60 mt-4 mx-auto'>
          <div class='flex flex-col gap-2'>
            <For each={postArr()}>
              {(post: Post) => <PostThumb title={post.Title} lang={post.Lang} slug={post.Slug} />}
            </For>
          </div>
        </main>
      </Main>
    </>
  );
}
