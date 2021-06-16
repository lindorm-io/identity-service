import Joi from "joi";

export const JOI_IDENTITY_ADDRESS = Joi.object({
  country: Joi.string().allow(null).required(),
  locality: Joi.string().allow(null).required(),
  postalCode: Joi.string().allow(null).required(),
  region: Joi.string().allow(null).required(),
  streetAddress: Joi.string().allow(null).required(),
});

export const JOI_IDENTITY_DISPLAY_NAME = Joi.object({
  name: Joi.string().allow(null).required(),
  number: Joi.number().allow(null).required(),
});

export const JOI_DATE = Joi.string().regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/);

export const JOI_GUID = Joi.string().guid({ version: "uuidv4" });

export const JOI_LOCALE = Joi.string().regex(/^[a-z]{2}-[A-Z]{2}$/);

export const JOI_PHONE = Joi.string().regex(/^\+?[1-9]\d{1,14}$/);

export const JOI_ZONE_INFO = Joi.string().regex(/^([A-Z][a-z]+)\/([A-Z][a-z]+)(_[A-Z][a-z]+)*$/);
