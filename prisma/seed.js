import { PrismaClient } from "@prisma/client";
import filters from "./seeds/filters.js";

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < filters.length; i++) {
    await prisma.filter.upsert({
      where: { name: filters[i].name },
      create: filters[i],
      update: {},
    });
  }
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
