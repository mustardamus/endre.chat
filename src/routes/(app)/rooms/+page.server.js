import { error, fail } from "@sveltejs/kit";
import db from "$lib/db.js";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const rooms = await db.room.findMany({
    include: { messages: true },
  });

  return { rooms };
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
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

    return { success: true };
  },
};
