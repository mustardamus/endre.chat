import db from "$lib/db";
import { json, error } from "@sveltejs/kit";
import suite from "$lib/validations/message.js";
import { bus } from "$lib/bus";
import { createSSE } from "$lib/sse.js";
import { transform } from "$lib/openai.js";
import { checkRatelimit, hashIpAddress } from "$lib/helpers.js";
import { DEV_MODE } from "$env/static/private";

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
  const body = await request.json();
  let validationResult = suite(body);

  if (!validationResult.isValid()) {
    throw error(400, "Validation failed");
  }

  const room = await db.room.findUnique({
    where: { id: body.roomId },
    include: { users: true, filter: true, messages: true },
  });

  if (!room) {
    throw error(404, "Room not found");
  }

  const ipHash = hashIpAddress(getClientAddress());

  if (await checkRatelimit(ipHash, 60, 300)) {
    return json({ error: "Ratelimit reached!" }, { status: 429 });
  }

  let history = room.messages.map((x) => x.contentFiltered);

  const {
    message: contentFiltered,
    usage,
    model,
  } = await transform(room.filter, body.message, history, DEV_MODE === true);

  const message = await db.message.create({
    data: {
      uuid: body.uuid,
      contentOriginal: body.message,
      contentFiltered,
      user: { connect: { id: locals.currentUser.id } },
      room: { connect: { id: room.id } },
      tokensUsed: usage.total_tokens,
      modelUsed: model,
      ipHash,
    },
    include: {
      user: true,
    },
  });

  delete message.user.token;

  bus.emit(`chat-${room.id}`, message);

  return json(message);
}
