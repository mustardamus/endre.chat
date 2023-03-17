import { json, error } from "@sveltejs/kit";
import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY } from "$env/static/private";

const configuration = new Configuration({ apiKey: OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  const response = await openai.createImage({
    prompt:
      "a smiling alien gray face, realistic, with forest in the background",
    n: 1,
    size: "256x256",
    response_format: "b64_json",
  });

  return json(response.data.data[0]);
}
