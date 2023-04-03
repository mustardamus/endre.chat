import db from "$lib/db";
import { json, error } from "@sveltejs/kit";
import { createRoom, joinRoom } from "$lib/validations/room.js";

async function setUserName(fetch, userName) {
  await fetch("/api/users", {
    method: "PUT",
    body: JSON.stringify({ userName }),
  });
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ locals, request, fetch }) {
  if (!locals.currentUser) {
    throw error("User missing");
  }

  const body = await request.json();

  console.log(locals.currentUser);

  // set username when creating a fresh room for the first time
  if (locals.currentUser.name.length === 0 && body.userName?.length !== 0) {
    await setUserName(fetch, body.userName);
  }

  delete body.userName;

  if (!createRoom(body).isValid()) {
    throw error("Validation failed");
  }

  const filter = await db.filter.findFirst({
    where: { id: body.filterId },
  });

  if (!filter) {
    throw error("Filter not found");
  }

  const room = await db.room.create({
    data: {
      name: body.roomName,
      admin: { connect: { id: locals.currentUser.id } },
      filter: { connect: { id: filter.id } },
    },
  });

  return json(room);
}

/** @type {import('./$types').RequestHandler} */
export async function PUT({ locals, request, fetch }) {
  if (!locals.currentUser) {
    throw error("User missing");
  }

  const body = await request.json();

  if (body.userName && body.userName.length) {
    await setUserName(fetch, body.userName);
  }

  if (!joinRoom(body).isValid()) {
    throw error("Validation failed");
  }

  const room = await db.room.update({
    where: { id: body.roomId },
    data: {
      users: {
        connect: { id: locals.currentUser.id },
      },
    },
  });

  if (!room) {
    throw error("Room not found");
  }

  return json({ success: true });
}
