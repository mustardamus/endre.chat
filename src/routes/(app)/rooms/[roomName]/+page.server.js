import { error } from "@sveltejs/kit";
import db from "$lib/db.js";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals }) {
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
    throw error(404, "room not found");
  }

  const currentUser = locals.currentUser;
  const currentUserInRoom = room.users.filter((user) => {
    console.log(user.token, currentUser.token);
    return user.token === currentUser.token;
  });
  const isCurrentUserInRoom = currentUserInRoom.length === 1;

  delete currentUser.token;
  delete room.admin.token;

  room.messages = room.messages
    .map((message) => {
      delete message.user.token;
      return message;
    })
    .reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});

  room.users = room.users.map((user) => {
    delete user.token;
    return user;
  });

  return { room, currentUser, isCurrentUserInRoom };
}
