import { dev } from "$app/environment";
import { handleSession } from "svelte-kit-cookie-session";
import { SESSION_SECRET as secret } from "$env/static/private";
import { v4 as uuidv4 } from "uuid";
import random from "lodash/random";
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
    } else {
      const token = uuidv4();
      event.locals.currentUser = await db.user.create({
        data: {
          token,
          avatarSeed: random(100000, 999999),
        },
      });

      await event.locals.session.set({ token });
    }

    return resolve(event);
  }
);
