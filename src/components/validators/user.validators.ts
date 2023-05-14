import joi from "joi";

export const newUserValidator = joi.object({
  discordId: joi.string().required(),
});
