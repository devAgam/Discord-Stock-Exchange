import joi from "joi";

export const addStockToPortfolioValidator = joi.object({
  // discordId can only be string without spaces with special characters ,
  discordId: joi.string().pattern(new RegExp("^[a-zA-Z0-9_]+$")).required(),
  // symbol can only be letters without spaces
  symbol: joi.string().pattern(new RegExp("^[a-zA-Z]+$")).required(),
  // quantity can only be numbers with a positive value and no decimals
  quantity: joi.number().positive().integer().required(),
});

export const getPortfolioValidator = joi.object({
  // discordId can only be string without spaces with special characters ,
  discordId: joi.string().pattern(new RegExp("^[a-zA-Z0-9_]+$")).required(),
});
