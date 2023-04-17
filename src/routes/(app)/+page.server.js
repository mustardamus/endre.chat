import db from "$lib/db.js";

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params, locals }) {
  let rooms = [];
  if (locals?.currentUser) {
    rooms = await db.user
      .findUnique({ where: { id: locals.currentUser.id } })
      .rooms();
  }

  return { rooms, currentUser: locals.currentUser };
}
