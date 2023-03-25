/** @type {import('@sveltejs/kit').LayoutServerLoad} */
export function load({ locals }) {
  const data = {
    session: locals.session.data,
    currentUser: locals.currentUser,
  };

  delete data.currentUser?.token;
  return data;
}
