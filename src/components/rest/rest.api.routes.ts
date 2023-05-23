import express, { NextFunction, Request, Response } from "express";
import { createUser } from "../functions/user.functions";
import { getHistoricalData, getMultipleLTPs } from "yahoo-nse-api";
import { newUserValidator } from "../validators/user.validators";
import {
  addStockToPortfolioByDiscordId,
  getPortfolioByDiscordId,
} from "../functions/portfolio.functions";
import {
  addStockToPortfolioValidator,
  getPortfolioValidator,
} from "../validators/portfolio.validators";
import { newStockValidator } from "../validators/stocks.validators";
import { bulkCreateStocks, createStock } from "../functions/stocks.functions";

const router = express.Router();

router.post(
  "/register-user",
  async (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = newUserValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const { discordId } = value;

    const newUserNonce = await createUser(discordId);
    return res.status(newUserNonce.httpStatus).json({ ...newUserNonce });
  }
);

router.post(
  "/create-stock",
  async (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = newStockValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const nonce = await createStock(value.name, value.ticker);
    return res.status(200).json({ ...nonce });
  }
);
router.post(
  "/add-stock",
  async (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = addStockToPortfolioValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const nonce = await addStockToPortfolioByDiscordId(
      value.discordId,
      value.symbol,
      value.quantity,
      value.price
    );
    return res.status(200).json({ ...nonce });
  }
);

router.get("/get-portfolio", async (req: Request, res: Response) => {
  const { value, error } = getPortfolioValidator.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  const nonce = await getPortfolioByDiscordId(value.discordId);
  return res.status(200).json(nonce);
});

// router.post("/load-scrips", async (req: Request, res: Response) => {
//   const nonce = await bulkCreateStocks(scrips);
//   return res.status(200).json({ message: "done" });
// });

router.post("/test-routes", async (req: Request, res: Response) => {
  const data = await getHistoricalData("AWL", "1d", "2d");
  console.log(data);
  return res.status(200).json(data);
});

export default router;
