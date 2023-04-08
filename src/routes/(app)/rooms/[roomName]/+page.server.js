import { error } from "@sveltejs/kit";
import db from "$lib/db.js";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals, fetch }) {
  const room = await db.room.findUnique({
    where: { name: params.roomName },
    include: {
      filter: true,
      admin: true,
      messages: { include: { user: true } },
      users: true,
    },
  });

  if (!room) {
    throw error("room not found");
  }

  let currentUser = locals.currentUser;

  if (!currentUser) {
    const response = await fetch("/api/users", { method: "POST" });
    const { id } = await response.json();
    currentUser = await db.user.findUnique({ where: { id } });
  }

  const currentUserInRoom = room.users.filter((user) => {
    return user.token === currentUser.token;
  });

  const isCurrentUserInRoom = currentUserInRoom.length === 1;

  delete room.admin.token;

  room.messages = room.messages.map((message) => {
    delete message.user.token;
    return message;
  });

  room.users = room.users.map((user) => {
    delete user.token;
    return user;
  });

  return { room, currentUser, isCurrentUserInRoom };
}
