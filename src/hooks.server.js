import { dev } from "$app/environment";
import { handleSession } from "svelte-kit-cookie-session";
import { SESSION_SECRET as secret } from "$env/static/private";
import db from "$lib/db.js";

export const handle = handleSession(
  {
    secret,
    secure: !dev, // HTTPS in non production environment
  },
  async ({ event, resolve }) => {
    const { token } = event.locals.session.data;

    if (token) {
      event.locals.currentUser = await db.user.findUnique({ where: { token } });
    }

    return resolve(event);
  }
);
