/** @type {import('@sveltejs/kit').LayoutServerLoad} */

export function load({ locals }) {
  const retObj = {
    session: locals.session.data,
    currentUser: locals.currentUser,
  };

  delete retObj.currentUser.token;

  return retObj;
}
