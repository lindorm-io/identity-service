import Joi from "@hapi/joi";
import { IKoaIdentityContext, IOpenIdClaim } from "../../typing";
import { InvalidScopeError } from "../../error";
import { getOpenIdClaims } from "../../support";
import { getUnixTime } from "date-fns";
import { isScope, Scope } from "@lindorm-io/jwt";

export interface IGetIdentityOpenIdOptions {
  identityId: string;
  scope: string;
}

export interface IGetIdentityOpenIdData extends IOpenIdClaim {
  updatedAt: number;
}

const schema = Joi.object({
  identityId: Joi.string().guid().required(),
  scope: Joi.string().required(),
});

export const getIdentityOpenId = (ctx: IKoaIdentityContext) => async (
  options: IGetIdentityOpenIdOptions,
): Promise<IGetIdentityOpenIdData> => {
  await schema.validateAsync(options);

  const { logger, repository } = ctx;
  const { identityId, scope } = options;

  if (!isScope(scope, Scope.DEFAULT)) {
    throw new InvalidScopeError(scope, Scope.DEFAULT);
  }
  if (!isScope(scope, Scope.OPENID)) {
    throw new InvalidScopeError(scope, Scope.OPENID);
  }

  const identity = await repository.identity.find({ id: identityId });

  logger.debug("resolving open id claims", {
    identityId,
    scope,
  });

  return {
    ...(getOpenIdClaims(identity, scope) || {}),
    updatedAt: getUnixTime(identity.updated),
  };
};
