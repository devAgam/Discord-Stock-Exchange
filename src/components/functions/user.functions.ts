// DISCORD USER FUNCTIONS

import { PrismaClient } from "@prisma/client";
import { createPortfolio } from "./portfolio.functions";

const prisma = new PrismaClient();

export async function createUser(discordId: string) {
  // check if user exists
  const userExists = await prisma.user.findUnique({
    where: {
      discordId: discordId,
    },
  });
  if (userExists) {
    const portfolio = await prisma.portfolio.findFirst({
      where: {
        userId: userExists.id,
      },
    });

    return {
      user: userExists,
      portfolio: portfolio,
      httpStatus: 201,
    };
  }

  const user = await prisma.user.create({
    data: {
      discordId: discordId,
    },
  });

  const portfolio = await createPortfolio("Default", user.id);

  return {
    user,
    portfolio,
    httpStatus: 200,
  };
}

export async function getUser(discordId: string) {
  const user = await prisma.user.findUnique({
    where: {
      discordId: discordId,
    },
  });
  return user;
}

export async function getIdByDiscordId(discordId: string) {
  const user = await prisma.user.findUnique({
    where: {
      discordId: discordId,
    },
  });
  return user?.id;
}
