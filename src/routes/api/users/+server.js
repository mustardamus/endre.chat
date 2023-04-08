import { json, error } from "@sveltejs/kit";
import random from "lodash/random";
import db from "$lib/db";
import suite from "$lib/validations/user.js";

/** @type {import('./$types').RequestHandler} */
export async function PUT({ locals, request }) {
  const body = await request.json();
  const where = { token: locals.currentUser.token };
  let user;

  if (body.updateAvatarSeed) {
    user = await db.user.update({
      where,
      data: {
        avatarSeed: random(100000, 999999),
      },
    });
  } else {
    if (!suite(body).isValid()) {
      throw error(400, "Validation failed");
    }

    user = await db.user.update({
      where,
      data: {
        name: body.userName,
      },
    });
  }

  delete user.token;

  return json(user);
}
