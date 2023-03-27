import { json, error } from "@sveltejs/kit";
import { v4 as uuidv4 } from "uuid";
import * as blobs2 from "blobs/v2";
import random from "lodash/random";
import db from "$lib/db";
import suite from "$lib/validations/user.js";

function getRandomColorHex() {
  return "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
}

function getAvatarSvg() {
  return blobs2.svg(
    {
      seed: random(1, 99999),
      extraPoints: random(5, 20),
      randomness: random(1, 100),
      size: 128,
    },
    {
      fill: getRandomColorHex(),
      stroke: "black",
      strokeWidth: 3,
    }
  );
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ locals }) {
  const user = await db.user.create({
    data: {
      token: uuidv4(),
      avatarSvg: getAvatarSvg(),
    },
  });

  if (!user) {
    throw error(500);
  }

  await locals.session.set({ token: user.token });
  delete user.token;
  return json(user);
}

/** @type {import('./$types').RequestHandler} */
export async function PUT({ locals, request }) {
  if (!locals.currentUser) {
    throw error(400);
  }

  const body = await request.json();
  const where = { token: locals.currentUser.token };
  let user;

  if (body.updateAvatarSvg) {
    user = await db.user.update({
      where,
      data: {
        avatarSvg: getAvatarSvg(),
      },
    });
  } else {
    if (!suite(body).isValid()) {
      throw error("Validation failed");
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
