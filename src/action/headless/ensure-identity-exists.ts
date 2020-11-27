import Joi from "@hapi/joi";
import { IKoaIdentityContext } from "../../typing";

export interface IGetIdentityOptions {
  identityId: string;
}

export interface IGetIdentityData {
  created: Date;
  updated: Date;
}

const schema = Joi.object({
  identityId: Joi.string().guid().required(),
});

export const ensureIdentityExists = (ctx: IKoaIdentityContext) => async (
  options: IGetIdentityOptions,
): Promise<IGetIdentityData> => {
  await schema.validateAsync(options);

  const { logger, repository } = ctx;
  const { identityId } = options;

  logger.debug("ensuring identity exists", {
    identityId,
  });

  const identity = await repository.identity.findOrCreate({ id: identityId });

  return {
    created: identity.created,
    updated: identity.updated,
  };
};
