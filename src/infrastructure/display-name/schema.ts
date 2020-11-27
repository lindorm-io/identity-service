import Joi from "@hapi/joi";
import { JOI_EVENTS } from "../../constant";

export const schema = Joi.object({
  id: Joi.string().guid().required(),
  version: Joi.number().required(),
  created: Joi.date().required(),
  updated: Joi.date().required(),
  events: JOI_EVENTS,

  name: Joi.string().required(),
  numbers: Joi.array().items(Joi.number()).unique().required(),
});
