import { RouteDataFuncArgs } from '@solidjs/router';
import { createResource } from 'solid-js';

const fetchContent = async (slug: string) => {
  const res = await fetch(`/api/post?slug=${slug}`);
  const { content } = await res.json();
  return content as string;
};

export default function ViewData({ params }: RouteDataFuncArgs) {
  const [content] = createResource(params.slug, fetchContent);
  return content;
}
