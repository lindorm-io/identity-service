import Joi from "joi";
import { JOI_IDENTITY_ADDRESS } from "../constant";

export const identityUpdateSchema = Joi.object({
  address: JOI_IDENTITY_ADDRESS,
  birthDate: Joi.string().allow(null),
  displayName: Joi.string().allow(null),
  familyName: Joi.string().allow(null),
  gender: Joi.string().allow(null),
  givenName: Joi.string().allow(null),
  gravatar: Joi.string().allow(null),
  locale: Joi.string().allow(null),
  middleName: Joi.string().allow(null),
  nickname: Joi.string().allow(null),
  phoneNumber: Joi.string().allow(null),
  picture: Joi.string().allow(null),
  preferredUsername: Joi.string().allow(null),
  profile: Joi.string().allow(null),
  website: Joi.string().allow(null),
  zoneInfo: Joi.string().allow(null),
});
