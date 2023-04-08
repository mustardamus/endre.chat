import db from "$lib/db.js";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
  const user = await db.user.findUnique({
    where: { token: locals.currentUser?.token },
    include: { rooms: true },
  });

  delete user.token;

  return { user };
}
