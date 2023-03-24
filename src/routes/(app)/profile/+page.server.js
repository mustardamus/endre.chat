import { error, fail } from "@sveltejs/kit";
import { v4 as uuidv4 } from "uuid";
import db from "$lib/db.js";
import getAvatarSvg from "$lib/helpers/getAvatarSvg";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
  let { token } = locals.session.data;

  if (!token) {
    token = uuidv4();
    locals.session.set({ token });
  }

  let user = await db.user.findUnique({ where: { token } });
  let avatarSvg = user?.avatarSvg;

  if (!user) {
    user = await db.user.create({
      data: { token, avatarSvg: getAvatarSvg() },
    });
  }

  if (!token || !user) {
    throw error(500);
  }

  return {
    user: {
      name: user.name,
      avatarSvg: user.avatarSvg,
    },
  };
}
