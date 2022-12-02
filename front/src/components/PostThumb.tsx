import { A } from '@solidjs/router';

interface PostThumbProps {
  title: string;
  lang: string;
  slug: string;
}
export default function PostThumb(props: PostThumbProps) {
  return (
    <div class='bg-neutral rounded-md p-4'>
      <A href={`/bin/${props.slug}`} class='text-lg underline decoration-secondary'>
        {props.title}
      </A>
      <p>Language: {props.lang}</p>
    </div>
  );
}
