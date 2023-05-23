import { PrismaClient } from "@prisma/client";
import { getHistoricalData } from "yahoo-nse-api";

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

export async function bulkCreateStocks(stocks: any[]) {
  return prisma.stock.createMany({
    data: stocks,
  });
}

export async function stockPriceIsInDayRange(
  symbol: string,
  range: string,
  price: number
) {
  const stock = await getStockByTicker(symbol);
  if (!stock) {
    return false;
  }
  const olchv = await getHistoricalData(symbol, "1d", range);
  //   const check if price  is in low and high
  // olchv.chart.result[0].indicators.quote[0].low
  // olchv.chart.result[0].indicators.quote[0].high
  //   low and highs are arrays
  //   check if price is in range of low
  const lows = olchv.chart.result[0].indicators.quote[0].low;
  const highs = olchv.chart.result[0].indicators.quote[0].high;

  //     loop through lows and highs and check if price is in range
  for (let i = 0; i < lows.length; i++) {
    if (price >= lows[i] && price <= highs[i]) {
      return true;
    }
  }
  return false;
}
