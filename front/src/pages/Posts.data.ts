import { createResource } from 'solid-js';

const fetchContent = async () => {
  const res = await fetch(`/api/collect`);
  const posts = await res.json();
  const idres = await fetch(`/api/me`);
  const id = await idres.json();
  posts.id = id;
  return posts;
};

export default function PostsData() {
  const [posts] = createResource(fetchContent);
  return posts;
}
