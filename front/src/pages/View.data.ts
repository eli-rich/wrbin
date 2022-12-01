import { RouteDataFuncArgs } from '@solidjs/router';
import { createResource } from 'solid-js';

interface PostInfo {
  content: string;
  title: string;
  lang: string;
}

const fetchContent = async (slug: string) => {
  const res = await fetch(`/api/post?slug=${slug}`);
  const post = await res.json();
  return post as PostInfo;
};

export default function ViewData({ params }: RouteDataFuncArgs) {
  const [post] = createResource(params.slug, fetchContent);
  return post;
}
