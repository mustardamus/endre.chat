import db from "$lib/db.js";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
  const currentUser = locals.currentUser;
  const filters = await db.filter.findMany();

  delete currentUser.token;

  return { filters, currentUser };
}
