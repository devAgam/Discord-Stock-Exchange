//  USER PORTFOLIO FUNCTIONS

import { PrismaClient } from "@prisma/client";
import { getStockByTicker, stockPriceIsInDayRange } from "./stocks.functions";
import { getLTP, getMultipleLTPs } from "yahoo-nse-api";

const prisma = new PrismaClient();

export async function createPortfolio(name: string, userId: number) {
  return prisma.portfolio.create({
    data: {
      name: name,
      userId: userId,
    },
  });
}

export async function getPortfolioById(id: number) {
  return prisma.portfolio.findUnique({
    where: {
      id: id,
    },
  });
}

export async function getPortfolioByUserId(userId: number) {
  return prisma.portfolio.findFirst({
    where: {
      userId: userId,
    },
  });
}

export async function getPortfolioByDiscordId(discordId: string) {
  const user = await prisma.user.findUnique({
    where: {
      discordId: discordId,
    },
  });
  let msgStr;
  if (!user) {
    msgStr = "User not registered, use the `/register` command";
    return {
      error: "User does not exist",
      httpStatus: 404,
      message: msgStr,
      success: false,
      data: {
        portfolio: null,
      },
    };
  }
  const rawHoldings = await prisma.portfolio.findFirst({
    where: {
      userId: user?.id,
    },
    include: {
      holdings: {
        include: {
          stock: true,
        },
      },
    },
  });
  let holdings;

  if (rawHoldings?.holdings.length) {
    // get tickers of all stocks in portfolio
    const tickers = rawHoldings.holdings.map(
      (holding) => holding.stock.tickerSymbol
    );
    // get latest prices of all stocks in portfolio
    const ltps = await getMultipleLTPs(tickers);
    // add latest price to each holding where tickerSymbol matches
    holdings = rawHoldings.holdings.map((holding) => {
      const ltp = ltps.quoteResponse.result.find(
        (ltp) =>
          convertYahooSymbolToSymbol(ltp.symbol) === holding.stock.tickerSymbol
      );
      return {
        id: holding.id,
        quantity: holding.quantity,
        stock: {
          id: holding.stock.id,
          name: holding.stock.name,
          tickerSymbol: holding.stock.tickerSymbol,
          latestPrice: ltp?.regularMarketPrice,
        },
        avgPrice: holding.avgPrice,
        currentValue: (
          (ltp?.regularMarketPrice || 0) * holding.quantity
        ).toFixed(2),
        gain: (
          ((ltp?.regularMarketPrice || 0) - holding.avgPrice) *
          holding.quantity
        ).toFixed(2),
        gainPercentage:
          (
            (((ltp?.regularMarketPrice || 0) - holding.avgPrice) /
              holding.avgPrice) *
            100
          ).toFixed(2) + "%",
      };
    });
  }

  return {
    error: "",
    httpStatus: 200,
    message: "Portfolio found",
    success: true,
    data: {
      portfolio: {
        id: rawHoldings?.id,
        name: rawHoldings?.name,
        holdings: holdings,
      },
    },
  };
}

export async function sellStockByDiscordId(
  discordId: string,
  stockSymbol: string,
  stockQuantity: number
) {
  let msgStr;
  const user = await prisma.user.findUnique({
    where: {
      discordId: discordId,
    },
  });
  if (!user) {
    msgStr = "User not registered, use the `/register` command";
    return {
      error: "User does not exist",
      httpStatus: 404,
      message: msgStr,
      success: false,
      data: {
        portfolio: null,
      },
    };
  }
  const stock = await getStockByTicker(stockSymbol);
  if (!stock) {
    msgStr = "Stock does not exist";
    return {
      error: "Stock does not exist",
      httpStatus: 404,
      message: msgStr,
      success: false,
      data: {},
    };
  }

  const portfolio = await prisma.portfolio.findFirst({
    where: {
      userId: user?.id,
    },
    include: {
      holdings: {
        where: {
          stockId: stock.id,
        },
      },
    },
  });

  // if portfolio has the stock as a holding already, update the quantity by overwriting the holding
  if (portfolio?.holdings.length) {
    const holding = portfolio.holdings[0];
    if (holding.quantity < stockQuantity) {
      msgStr = "Insufficient quantity";
      return {
        error: "Insufficient quantity",
        httpStatus: 400,
        message: msgStr,
        success: false,
        data: {},
      };
    }
    const updatedHolding = await prisma.holding.update({
      where: {
        id: holding.id,
      },
      data: {
        quantity: holding.quantity - stockQuantity,
      },
    });
    msgStr = `Sold ${stockQuantity} ${stockSymbol} stocks`;
    if (updatedHolding.quantity === 0) {
      await prisma.holding.delete({
        where: {
          id: holding.id,
        },
      });
    }
    return {
      error: "",
      httpStatus: 200,
      message: msgStr,
      success: true,
      data: {
        holding: updatedHolding,
      },
    };
  } else {
    msgStr = "You don't have this stock in your portfolio";
    return {
      error: "You don't have this stock in your portfolio",
      httpStatus: 400,
      message: msgStr,
      success: false,
      data: {},
    };
  }
}

export async function addStockToPortfolioByDiscordId(
  discordId: string,
  stockSymbol: string,
  stockQuantity: number,
  price: number
) {
  let msgStr;
  const user = await prisma.user.findUnique({
    where: {
      discordId: discordId,
    },
  });
  if (!user) {
    msgStr = "User not registered, use the `/register` command";
    return {
      error: "User does not exist",
      httpStatus: 404,
      message: msgStr,
      success: false,
      data: {},
    };
  }
  const stock = await getStockByTicker(stockSymbol);
  if (!stock) {
    msgStr = "Stock does not exist";
    return {
      error: "Stock does not exist",
      httpStatus: 404,
      message: msgStr,
      success: false,
      data: {},
    };
  }

  const isInRange = await stockPriceIsInDayRange(stockSymbol, "2d", price);

  if (!isInRange) {
    msgStr = "Price is not in 2 day range";
    return {
      error: "Price is not in 2 day range",
      httpStatus: 400,
      message: msgStr,
      success: false,
      data: {},
    };
  }

  const portfolio = await prisma.portfolio.findFirst({
    where: {
      userId: user?.id,
    },
    include: {
      holdings: {
        where: {
          stockId: stock.id,
        },
      },
    },
  });

  const currentPrice = await getLTP(stockSymbol).then((ltp) => {
    return ltp?.regularMarketPrice || 0;
  });

  // if portfolio has the stock as a holding already, update the quantity by updating the holding
  if (portfolio?.holdings.length) {
    const holding = await prisma.holding.update({
      where: {
        id: portfolio.holdings[0].id,
      },
      data: {
        quantity: portfolio.holdings[0].quantity + stockQuantity,
        avgPrice: getAveragePrice(portfolio.holdings[0].avgPrice, currentPrice),
      },
    });
    msgStr = `Updated ${stockSymbol} quantity to ${stockQuantity}`;
    return {
      error: "",
      httpStatus: 200,
      message: msgStr,
      success: true,
      data: {
        holding: holding,
      },
    };
  }

  // if portfolio does not have the stock as a holding, create a new holding
  const holding = await prisma.holding.create({
    data: {
      portfolioId: portfolio?.id,
      stockId: stock.id,
      quantity: stockQuantity,
      avgPrice: currentPrice,
    },
  });
  msgStr = `Added ${stockSymbol} to portfolio`;
  return {
    error: "",
    httpStatus: 200,
    message: msgStr,
    success: true,
    data: {
      holding: holding,
    },
  };
}

export async function resetPortfolioByDiscordId(discordId: string) {
  let msgStr;
  const user = await prisma.user.findUnique({
    where: {
      discordId: discordId,
    },
  });
  if (!user) {
    msgStr = "User not registered, use the `/register` command";
    return {
      error: "User does not exist",
      httpStatus: 404,
      message: msgStr,
      success: false,
      data: {},
    };
  }
  const portfolio = await prisma.portfolio.findFirst({
    where: {
      userId: user?.id,
    },
    include: {
      holdings: true,
    },
  });

  if (!portfolio?.holdings.length) {
    msgStr = "Portfolio is already empty";
    return {
      error: "Portfolio is already empty",
      httpStatus: 400,
      message: msgStr,
      success: false,
      data: {},
    };
  }

  await prisma.holding.deleteMany({
    where: {
      portfolioId: portfolio?.id,
    },
  });
  msgStr = "Portfolio reset";
  return {
    error: "",
    httpStatus: 200,
    message: msgStr,
    success: true,
    data: {},
  };
}

export function getAveragePrice(oldPrice: number, newPrice: number) {
  return (oldPrice + newPrice) / 2;
}

export function convertYahooSymbolToSymbol(yahooSymbol: string) {
  return yahooSymbol.split(".")[0];
}
