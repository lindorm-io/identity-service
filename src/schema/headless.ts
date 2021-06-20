import Joi from "joi";
import { JOI_GUID } from "../constant";

export const headlessCreateIdentitySchema = Joi.object({
  identityId: JOI_GUID.required(),
});

export const headlessGetIdentitySchema = Joi.object({
  id: JOI_GUID.required(),
});

export const headlessRemoveIdentitySchema = Joi.object({
  id: JOI_GUID.required(),
});
