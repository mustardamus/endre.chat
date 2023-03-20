import { error } from "@sveltejs/kit";
import db from "$lib/db.js";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const rooms = await db.room.findMany();

  return { rooms };
}
