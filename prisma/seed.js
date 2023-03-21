import { PrismaClient } from "@prisma/client";
import rooms from "./seeds/rooms.js";

const prisma = new PrismaClient();

async function main() {
  // for (let i = 0; i < rooms.length; i++) {
  //   const room = rooms[i];
  //   await prisma.room.upsert({
  //     where: { name: room.name },
  //     update: {},
  //     create: {
  //       ...room,
  //     },
  //   });
  //   console.log("Inserted room", room.name);
  // }
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
