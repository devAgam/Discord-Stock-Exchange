import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function storeGuild(guild: string) {
  return prisma.guilds.create({
    data: {
      guild: guild,
    },
  });
}

export async function getGuilds() {
  return prisma.guilds.findMany({
    select: {
      guild: true,
    },
  });
}
