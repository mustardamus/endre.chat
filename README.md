# endre.chat

![demo](./demo.gif)

## [Demo](https://endre.chat/)

---

## Developing

```bash
npm run dev
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Database setup

Migrate db schema and seed database from `prisma/seed.js`

```
npm run db:migrate
```

Run the above command as well, when adding a new model schema to `prisma/schema.prisma`.

## NixOS shenanigans

- Use minimal shell.nix
- Use specific Prisma version https://github.com/prisma/prisma/issues/17070#issuecomment-1468642092
