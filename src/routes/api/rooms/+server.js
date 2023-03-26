import db from "$lib/db";
import { json, error } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ locals, request }) {
  if (!locals.currentUser) {
    throw error("User missing");
  }

  const body = await request.json();

  if (body.userName?.length) {
    await db.user.update({
      where: { id: locals.currentUser.id },
      data: { name: body.userName },
    });
  }

  const filter = await db.filter.findFirst();

  const room = await db.room.create({
    data: {
      name: body.roomName,
      admin: { connect: { id: locals.currentUser.id } },
      filter: { connect: { id: filter.id } },
    },
  });

  return json(room);
}
