/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ locals }) => {
    locals.session.set({ token: "yo" });
    console.log(locals.session.data);

    return { success: true };
  },
};
