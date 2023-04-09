import db from "$lib/db";
import { json, error } from "@sveltejs/kit";
import suite from "$lib/validations/message.js";
import { bus } from "$lib/bus";
import { createSSE } from "$lib/sse.js";
import { transform } from "$lib/openai.js";
import { checkRatelimit, hashIpAddress } from "$lib/helpers.js";

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  const roomId = url.searchParams.get("roomId");
  const { readable, subscribe } = createSSE();

  subscribe(bus, roomId);

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ locals, request, getClientAddress }) {
  if (!locals.currentUser) {
    throw error("User missing");
  }

  const body = await request.json();

  if (!suite(body).isValid()) {
    throw error("Validation failed");
  }

  const room = await db.room.findUnique({
    where: { id: body.roomId },
    include: { users: true, filter: true },
  });

  console.log(room);

  if (!room) {
    throw error("Room not found");
  }

  // const checkUser = room.users.filter((user) => {
  //   return user.token === locals.currentUser.token;
  // });

  // if (checkUser.length === 0) {
  //   throw error("Not allowed to post in room, no member");
  // }

  const ipHash = hashIpAddress(getClientAddress());

  if (await checkRatelimit(ipHash, 60, 50)) {
    return json({ error: "Ratelimit reached!" }, { status: 429 });
  }

  const {
    message: contentFiltered,
    usage,
    model,
  } = await transform(room.filter.prompt, body.message);

  const message = await db.message.create({
    data: {
      contentOriginal: body.message,
      contentFiltered,
      user: { connect: { id: locals.currentUser.id } },
      room: { connect: { id: room.id } },
      tokensUsed: usage.total_tokens,
      modelUsed: model,
      ipHash,
    },
  });

  bus.emit(
    `chat-${room.id}`,
    Object.assign({ userName: locals.currentUser.name }, message)
  );

  return json(message);
}
