import { createResource } from 'solid-js';

const fetchContent = async () => {
  const res = await fetch(`/api/me`);
  const { id } = await res.json();
  return { id };
};

export default function HomeData() {
  const [id] = createResource(fetchContent);
  return id;
}
