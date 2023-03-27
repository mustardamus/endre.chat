import db from "$lib/db";
import { json, error } from "@sveltejs/kit";
import suite from "$lib/validations/room.js";

/** @type {import('./$types').RequestHandler} */
export async function POST({ locals, request, fetch }) {
  if (!locals.currentUser) {
    throw error("User missing");
  }

  const body = await request.json();

  // set username when creating a fresh room for the first time
  if (locals.currentUser.name.length === 0 && body.userName?.length !== 0) {
    await fetch("/api/users", {
      method: "PUT",
      body: JSON.stringify({ userName: body.userName }),
    });
  }

  delete body.userName;

  if (!suite(body).isValid()) {
    throw error("Validation failed");
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
