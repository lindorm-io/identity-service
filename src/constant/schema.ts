import Joi from "@hapi/joi";

export const JOI_EVENTS = Joi.array()
  .items(
    Joi.object({
      date: Joi.date().required(),
      name: Joi.string().required(),
      payload: Joi.object().required(),
    }),
  )
  .required();

export const JOI_ADDRESS = Joi.object({
  country: Joi.string().allow(null).required(),
  locality: Joi.string().allow(null).required(),
  postalCode: Joi.string().allow(null).required(),
  region: Joi.string().allow(null).required(),
  streetAddress: Joi.string().allow(null).required(),
});

export const JOI_DISPLAY_NAME_OBJECT = Joi.object({
  name: Joi.string().required(),
  number: Joi.number().required(),
});

export const JOI_DISPLAY_NAME_STRING = Joi.string().regex(/^\w+#[0-9]{4}$/);

export const JOI_DATE = Joi.string().regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/);

export const JOI_LOCALE = Joi.string().regex(/^[a-z]{2}-[A-Z]{2}$/);

export const JOI_PHONE = Joi.string().regex(/^\+?[1-9]\d{1,14}$/);

export const JOI_ZONE_INFO = Joi.string().regex(/^([A-Z][a-z]+)\/([A-Z][a-z]+)(_[A-Z][a-z]+)*$/);
