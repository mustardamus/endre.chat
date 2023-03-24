import { error, fail, redirect } from "@sveltejs/kit";
import db from "$lib/db.js";
import getCurrentUser from "$lib/helpers/getCurrentUser.js";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const rooms = await db.room.findMany();

  return { rooms };
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request, locals }) => {
    const data = await request.formData();
    const name = data.get("name");
    let errors = {};

    if (name?.length < 5) {
      errors = {
        ...errors,
        name: { value: name, message: "Must be at least 5 characters" },
      };
    }

    if (!name || name?.length === 0) {
      errors = {
        ...errors,
        name: { value: name, message: "Is required" },
      };
    }

    if (Object.keys(errors).length) {
      return fail(400, { errors });
    }

    const user = await getCurrentUser(locals);

    if (!user) {
      return fail(400, "Missing user");
    }

    const filter = await db.filter.findFirst(); // TODO make dynamic

    if (!filter) {
      return fail(400, "Missing filter");
    }

    const room = await db.room.create({
      data: {
        name,
        admin: { connect: { id: user.id } },
        filter: { connect: { id: filter.id } },
      },
    });

    throw redirect(303, `/rooms/${room.name}`);
    return {}; // is needed to work, otherwise throws 405
  },
};
