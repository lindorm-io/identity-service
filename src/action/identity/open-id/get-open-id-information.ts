import Joi from "@hapi/joi";
import { IKoaIdentityContext, IOpenIdClaim } from "../../../typing";
import { assertAccountPermission, getDisplayNameString, getOpenIdClaims } from "../../../support";

export interface IGetOpenIdInformationOptions {
  identityId: string;
}

export interface IGetOpenIdInformationData extends IOpenIdClaim {
  displayName: string;
  gravatar: string;
}

const schema = Joi.object({
  identityId: Joi.string().guid().required(),
});

export const getOpenIdInformation = (ctx: IKoaIdentityContext) => async (
  options: IGetOpenIdInformationOptions,
): Promise<IGetOpenIdInformationData> => {
  await schema.validateAsync(options);

  const { logger, repository, token } = ctx;
  const { identityId } = options;
  const {
    bearer: { scope },
  } = token;

  logger.debug("requesting open id information", {
    identityId,
  });

  await assertAccountPermission(ctx)(identityId);

  const identity = await repository.identity.find({ id: identityId });

  return {
    displayName: getDisplayNameString(identity.displayName),
    gravatar: identity.gravatar,

    ...(getOpenIdClaims(identity, scope) || {}),
  };
};
