import db from "$lib/db.js";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const room = await db.room.findUnique({
    where: { name: params.roomName },
    include: {
      filter: true,
      admin: true,
      messages: { include: { user: true } },
      users: true,
    },
  });

  delete room?.admin.token;

  room.messages = room?.messages.map((message) => {
    delete message.user.token;
    return message;
  });

  return { room };
}
