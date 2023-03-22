import { PrismaClient } from "@prisma/client";
import filters from "./seeds/filters.js";
import users from "./seeds/users.js";
import rooms from "./seeds/rooms.js";
import messages from "./seeds/messages.js";

const prisma = new PrismaClient();

async function main() {
  const filter1 = await prisma.filter.upsert({
    where: { name: filters[0].name },
    create: filters[0],
    update: {},
  });
  const filter2 = await prisma.filter.upsert({
    where: { name: filters[1].name },
    create: filters[1],
    update: {},
  });
  const user1 = await prisma.user.upsert({
    where: { token: users[0].token },
    update: {},
    create: users[0],
  });
  const user2 = await prisma.user.upsert({
    where: { token: users[1].token },
    update: {},
    create: users[1],
  });
  const room1 = await prisma.room.upsert({
    where: { name: rooms[0].name },
    create: {
      ...rooms[0],
      filter: { connect: { id: filter1.id } },
      admin: { connect: { id: user1.id } },
      users: { connect: [{ id: user1.id }, { id: user2.id }] },
    },
    update: {},
  });
  const room2 = await prisma.room.upsert({
    where: { name: rooms[1].name },
    create: {
      ...rooms[1],
      filter: { connect: { id: filter2.id } },
      admin: { connect: { id: user2.id } },
      users: { connect: [{ id: user1.id }, { id: user2.id }] },
    },
    update: {},
  });

  await prisma.message.create({
    data: {
      ...messages[0],
      user: { connect: { id: user1.id } },
      room: { connect: { id: room1.id } },
    },
  });

  await prisma.message.create({
    data: {
      ...messages[1],
      user: { connect: { id: user2.id } },
      room: { connect: { id: room2.id } },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
