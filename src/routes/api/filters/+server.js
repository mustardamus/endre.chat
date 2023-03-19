import { json, error } from "@sveltejs/kit";

// TODO: we need to get them from the db
const promts = {
  pirate: {
    name: "Pirate",
    description: "Arr! You are a pirate!",
    promt:
      "You are a translator that translates the incoming user messages to pirate speak",
  },

  medival: {
    name: "Medival Person",
    description: "TODO",
    promt:
      "You are a translator that translates the incoming user messages to polite medival english",
  },
};

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
  const out = Object.entries(promts).map(([slug, { name, description }]) => ({
    slug,
    name,
    description,
  }));

  return json(out);
}
