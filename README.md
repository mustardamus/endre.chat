# endre.chat

Welcome to endre.chat! Our submission for the SvelteHack hackathon is a fun and engaging chat web application with a twist. Instead of sending plain, boring messages, endre.chat transforms the messages into something more exciting before they are sent. Get ready to experience a whole new level of chatting with your friends and colleagues!

![demo](./demo.gif)

## [Demo](https://endre.chat/)

---

## Developing

### Configuration

Configuration needs to be passed in via environment variables.
You can use the provided [.env-example](./.env-example) file as a starting point.

| Environment Variable | Description               |
| -------------------- | ------------------------- |
| SESSION_SECRET       | Key for cookie encryption |
| DATABASE_URL         | Prisma database URL       |
| OPENAI_API_KEY       | OpenAI API Key            |

To start the development server, run:

```bash
npm run dev
```

## Building

To create a production build of your app, run:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Database Setup

To migrate the database schema and seed the database from `prisma/seed.js`, run:

```
npm run db:migrate
```

Run the above command whenever you add a new model schema to `prisma/schema.prisma`.

## NixOS shenanigans

- Use minimal shell.nix
- Use specific Prisma version https://github.com/prisma/prisma/issues/17070#issuecomment-1468642092
