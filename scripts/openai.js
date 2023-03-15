
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
async function main() {

const input = process.argv[2]

const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
        {"role": "system", "content": "You are a translator that translates the incoming user messages to pirate speak"},
        {"role": "user", "content": input},
    ]
})

console.log(completion.data.choices[0].message.content);
}

main()