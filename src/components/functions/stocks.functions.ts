import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createStock(name: string, ticker: string) {
  const stock = await prisma.stock.create({
    data: {
      name: name,
      tickerSymbol: ticker,
    },
  });
  return stock;
}

export async function getStockById(id: number) {
  const stock = await prisma.stock.findUnique({
    where: {
      id: id,
    },
  });
  return stock;
}

export async function getStockByTicker(ticker: string) {
  const stock = await prisma.stock.findUnique({
    where: {
      tickerSymbol: ticker,
    },
  });
  return stock;
}
