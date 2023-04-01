import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY as apiKey } from "$env/static/private";

const configuration = new Configuration({ apiKey });
const openai = new OpenAIApi(configuration);

const basePromt =
  "You are a text transformer programm. You are only outputting the transformed text. Always try to output the text in the language that was input. ";

export async function transform(systemPrompt, message) {
  const result = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: basePromt + systemPrompt,
      },
      { role: "user", content: message },
    ],
  });

  return result.data.choices[0].message.content;
}
