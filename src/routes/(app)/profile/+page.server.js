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

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request, locals }) => {
    const { token } = locals.session.data;

    if (!token) {
      return fail(400, { errors: { general: "Missing token" } });
    }

    const data = await request.formData();
    const name = data.get("name");
    let errors = {};

    if (!name || name?.length === 0) {
      errors = {
        ...errors,
        name: { value: name, message: "Is required" },
      };
    }

    if (Object.keys(errors).length) {
      return fail(400, { errors });
    }

    const user = await db.user.update({
      where: { token },
      data: {
        name,
      },
    });

    if (!user) {
      throw error(400, "Missing user");
    }

    return { success: true, name: user.name };
  },
};
