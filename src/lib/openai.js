import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY as apiKey } from "$env/static/private";

const configuration = new Configuration({ apiKey });
const openai = new OpenAIApi(configuration);

const basePromt =
  "You are a text transformer programm. You are only outputting the transformed text. Always try to output the text in the language that was input. ";

const delay = (value, timeout) =>
  new Promise((res) => setTimeout(() => res(value), timeout));

export async function transform(systemPrompt, message, dryRun = false) {
  if (dryRun) {
    return await delay(
      {
        model: "",
        usage: { total_tokens: 0 },
        message: "Hello World!",
      },
      5000
    );
  }

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

  const { model, usage, choices } = result.data;

  return {
    model,
    usage,
    message: choices[0].message.content,
  };
}
