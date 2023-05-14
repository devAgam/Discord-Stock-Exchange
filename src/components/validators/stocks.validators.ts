import joi from "joi";

export const newStockValidator = joi.object({
  // name can only be letters and spaces
  name: joi
    .string()
    .regex(/^[a-zA-Z ]+$/)
    .required(),
  // ticker can only be letters without spaces
  ticker: joi
    .string()
    .regex(/^[a-zA-Z]+$/)
    .required(),
});
