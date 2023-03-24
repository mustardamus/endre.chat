import db from "$lib/db.js";

export default async function (locals) {
  const { token } = locals.session.data;

  if (!token) {
    return null;
  }

  const user = await db.user.findUnique({ where: { token } });

  return user;
}
