import Joi from "@hapi/joi";
import { IKoaIdentityContext, IOpenIdClaim } from "../../typing";
import { getDisplayNameString, getOpenIdClaims as _getOpenIdClaims } from "../../support";

export interface IGetOpenIdInformationOptions {
  identityId: string;
  scope: string;
}

export interface IGetOpenIdInformationData extends IOpenIdClaim {
  displayName: string;
  gravatar: string;
}

const schema = Joi.object({
  identityId: Joi.string().guid().required(),
  scope: Joi.string().required(),
});

export const getOpenIdClaims = (ctx: IKoaIdentityContext) => async (
  options: IGetOpenIdInformationOptions,
): Promise<IGetOpenIdInformationData> => {
  await schema.validateAsync(options);

  const { logger, repository } = ctx;
  const { identityId, scope } = options;

  logger.debug("requesting open id claims", {
    identityId,
    scope,
  });

  const identity = await repository.identity.find({ id: identityId });

  return {
    displayName: getDisplayNameString(identity.displayName),
    gravatar: identity.gravatar,

    ...(_getOpenIdClaims(identity, scope) || {}),
  };
};
