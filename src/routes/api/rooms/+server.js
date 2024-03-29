import { json, error } from "@sveltejs/kit";
import db from "$lib/db";
import { bus } from "$lib/bus";
import { createRoom, joinRoom } from "$lib/validations/room.js";

async function ensureUserName(fetch, locals, userName) {
  if (locals.currentUser.name === null && userName) {
    await fetch("/api/users", {
      method: "PUT",
      body: JSON.stringify({ userName }),
    });
  }
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ locals, request, fetch }) {
  const body = await request.json();

  await ensureUserName(fetch, locals, body?.userName);
  delete body.userName;

  if (!createRoom(body).isValid()) {
    throw error(400, "Validation failed");
  }

  const filter = await db.filter.findFirst({
    where: { id: body.filterId },
  });

  if (!filter) {
    throw error(400, "Filter not found");
  }

  const room = await db.room.create({
    data: {
      name: body.roomName,
      admin: { connect: { id: locals.currentUser.id } },
      filter: { connect: { id: filter.id } },
      users: { connect: { id: locals.currentUser.id } },
    },
  });

  return json(room);
}

/** @type {import('./$types').RequestHandler} */
export async function PUT({ locals, request, fetch }) {
  const body = await request.json();
  const userName = body?.userName || locals.currentUser.name;

  await ensureUserName(fetch, locals, userName);

  if (!joinRoom(body).isValid()) {
    throw error(400, "Validation failed");
  }

  const room = await db.room.update({
    where: { id: body.roomId },
    data: {
      users: { connect: { id: locals.currentUser.id } },
    },
  });

  if (!room) {
    throw error(404, "Room not found");
  }

  bus.emit(`chat-${room.id}`, { type: "joined", userName });

  return json({ success: true });
}
