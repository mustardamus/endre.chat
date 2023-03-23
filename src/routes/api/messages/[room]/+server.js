import { json } from "@sveltejs/kit";
import Server from "$lib/server.js";

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
  const room = Server.getRoom(params.room);
  const subscription = null;
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(`event: ping\n`);
      room.subject.subscribe((msg) =>
        controller.enqueue(`event: message\ndata:${msg}\n\n`)
      );
      setInterval(() => controller.enqueue(`event: ping\n`), 5000);
    },
    cancel() {
      if (subscription) subscription.unsubscribe();
    },
  });

  return new Response(stream, {
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
