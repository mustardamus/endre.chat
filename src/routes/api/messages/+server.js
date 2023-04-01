import db from "$lib/db";
import { json, error } from "@sveltejs/kit";
import suite from "$lib/validations/message.js";

/** @type {import('./$types').RequestHandler} */
export async function POST({ locals, request }) {
  if (!locals.currentUser) {
    throw error("User missing");
  }

  const body = await request.json();

  if (!suite(body).isValid()) {
    throw error("Validation failed");
  }

  const room = await db.room.findUnique({
    where: { id: body.roomId },
    include: { users: true },
  });

  if (!room) {
    throw error("Room not found");
  }

  const checkUser = room.users.filter((user) => {
    return user.token === locals.currentUser.token;
  });

  if (checkUser.length === 0) {
    throw error("Not allowed to post in room, no member");
  }

  const message = await db.message.create({
    data: {
      contentOriginal: body.message,
      contentFiltered: `TODO filter ${body.message}`,
      user: { connect: { id: locals.currentUser.id } },
      room: { connect: { id: room.id } },
    },
  });

  return json(message);
}
