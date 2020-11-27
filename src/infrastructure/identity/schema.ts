import Joi from "@hapi/joi";
import {
  JOI_ADDRESS,
  JOI_DATE,
  JOI_DISPLAY_NAME_OBJECT,
  JOI_EVENTS,
  JOI_LOCALE,
  JOI_PHONE,
  JOI_ZONE_INFO,
} from "../../constant";

export const schema = Joi.object({
  id: Joi.string().guid().required(),
  version: Joi.number().required(),
  created: Joi.date().required(),
  updated: Joi.date().required(),
  events: JOI_EVENTS,

  address: JOI_ADDRESS.allow(null).required(),
  birthDate: JOI_DATE.allow(null).required(),
  displayName: JOI_DISPLAY_NAME_OBJECT.allow(null).required(),
  familyName: Joi.string().allow(null).required(),
  gender: Joi.string().allow(null).required(),
  givenName: Joi.string().allow(null).required(),
  gravatar: Joi.string().uri().allow(null).required(),
  locale: JOI_LOCALE.allow(null).required(),
  middleName: Joi.string().allow(null).required(),
  nickname: Joi.string().allow(null).required(),
  phoneNumber: JOI_PHONE.allow(null).required(),
  phoneNumberVerified: Joi.boolean().required(),
  picture: Joi.string().uri().allow(null).required(),
  preferredUsername: Joi.string().allow(null).required(),
  profile: Joi.string().uri().allow(null).required(),
  username: Joi.string().allow(null).required(),
  website: Joi.string().uri().allow(null).required(),
  zoneInfo: JOI_ZONE_INFO.allow(null).required(),
});
