/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, fetch }) {
  let user = locals.currentUser;

  if (!user) {
    const response = await fetch("/api/users", { method: "POST" });
    user = await response.json();
  }

  return { user };
}

/** @type {import('./$types').Actions} */
// export const actions = {
//   default: async ({ request, locals }) => {
//     if (!locals.currentUser) {
//       return fail(400, "Missing user");
//     }

//     const data = await request.formData();
//     const name = data.get("name");
//     let errors = {};

//     if (name?.length < 5) {
//       errors = {
//         ...errors,
//         name: { value: name, message: "Must be at least 5 characters" },
//       };
//     }

//     if (!name || name?.length === 0) {
//       errors = {
//         ...errors,
//         name: { value: name, message: "Is required" },
//       };
//     }

//     if (Object.keys(errors).length) {
//       return fail(400, { errors });
//     }

//     const filter = await db.filter.findFirst(); // TODO make dynamic

//     if (!filter) {
//       return fail(400, "Missing filter");
//     }

//     const room = await db.room.create({
//       data: {
//         name,
//         admin: { connect: { id: locals.currentUser.id } },
//         filter: { connect: { id: filter.id } },
//       },
//     });

//     throw redirect(303, `/rooms/${room.name}`);
//     return {}; // is needed to work, otherwise throws 405
//   },
// };
