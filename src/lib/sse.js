export function createSSE(last_id = 0, retry = 0) {
  let id = last_id;
  const { readable, writable } = new TransformStream({
    start(controller) {
      controller.enqueue(": hello\n\n");

      if (retry > 0) controller.enqueue(`retry: ${retry}\n\n`);
    },
    transform({ event, data }, controller) {
      let msg = `id: ${++id}\n`;
      if (event) msg += `event: ${event}\n`;
      if (typeof data === "string") {
        msg += "data: " + data.trim().replace(/\n+/gm, "\ndata: ") + "\n";
      } else {
        msg += `data: ${JSON.stringify(data)}\n`;
      }
      controller.enqueue(msg + "\n");
    },
  });

  const writer = writable.getWriter();

  return {
    readable,
    /**
     * @param {import('node:events').EventEmitter} eventEmitter
     * @param {string} event
     */
    async subscribe(observer) {
      let intervalId = setInterval(() => writer.write({ event: "ping" }), 5000);
      let subscription = observer.subscribe((msg) => {
        console.log(msg);
        writer.write({ event: "message", data: msg });
      });
      await writer.closed.catch(() => {});
      subscription.unsubscribe();
    },
  };
}
