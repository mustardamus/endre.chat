import db from "$lib/db.js";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, fetch }) {
  let user = locals.currentUser;

  if (!user) {
    const response = await fetch("/api/users", { method: "POST" });
    user = await response.json();
  }

  const filters = await db.filter.findMany();

  return { user, filters };
}
