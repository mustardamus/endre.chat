import { json } from "@sveltejs/kit";
import Server from "$lib/server.js";
import { createSSE } from "$lib/sse.js";

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
  const room = Server.getRoom(params.room);

  const { readable, subscribe } = createSSE();

  console.log(subscribe);

  subscribe(room.subject);

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, params }) {
  const { message } = await request.json();
  Server.sendMessage(params.room, message);

  return json(message);
}
