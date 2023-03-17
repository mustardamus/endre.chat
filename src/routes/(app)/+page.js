/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
  const res = await fetch(`/api/avatar`);
  const avatar = await res.json();

  return { avatar };
}
