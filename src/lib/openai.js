import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY as apiKey } from "$env/static/private";

const configuration = new Configuration({ apiKey });
const openai = new OpenAIApi(configuration);

const systemPromptTemplate = (transformerPromt) =>
  `
You are a text transformer programm that transforms text using transformer promts. 
Never output anything else than the transformed text. If you can't transform the text, output the text that was input.
Try to output the text in the language that was input if it makes sense.

Transformer: ${transformerPromt}
`.trim();
const delay = (value, timeout) =>
  new Promise((res) => setTimeout(() => res(value), timeout));

export async function transform(
  transformer,
  message,
  history = [],
  dryRun = false
) {
  if (dryRun) {
    return await delay(
      {
        model: "",
        usage: { total_tokens: 20 },
        message: "Hello World!",
      },
      5000
    );
  }

  let historyUserMessages = [];

  if (transformer.needsHistory)
    historyUserMessages = history.map((content) => ({ role: "user", content }));

  let messages = [
    {
      role: "system",
      content: systemPromptTemplate(transformer.prompt),
    },
    ...historyUserMessages,
    { role: "user", content: message },
  ];

  console.log("createChatCompletion", transformer, messages);
  const result = await openai.createChatCompletion({
    model: "gpt-4",
    messages,
  });

  const { model, usage, choices } = result.data;

  return {
    model,
    usage,
    message: choices[0].message.content,
  };
}
