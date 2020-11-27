import Joi from "@hapi/joi";
import { IKoaIdentityContext } from "../../typing";
import { assertAccountPermission } from "../../support";
import { isScope, Scope } from "@lindorm-io/jwt";
import { InvalidScopeError } from "../../error";

export interface IChangeAddressOptions {
  identityId: string;
  country: string;
  locality: string;
  postalCode: string;
  region: string;
  streetAddress: string;
}

const schema = Joi.object({
  identityId: Joi.string().guid().required(),
  country: Joi.string().required(),
  locality: Joi.string().required(),
  postalCode: Joi.string().required(),
  region: Joi.string().required(),
  streetAddress: Joi.string().required(),
});

export const changeAddress = (ctx: IKoaIdentityContext) => async (options: IChangeAddressOptions): Promise<void> => {
  await schema.validateAsync(options);

  const { logger, repository, token } = ctx;
  const {
    bearer: { scope },
  } = token;
  const { identityId, country, locality, postalCode, region, streetAddress } = options;

  await assertAccountPermission(ctx)(identityId);

  if (!isScope(scope, Scope.EDIT)) {
    throw new InvalidScopeError(scope, Scope.EDIT);
  }

  const identity = await repository.identity.find({ id: identityId });

  identity.address = {
    country,
    locality,
    postalCode,
    region,
    streetAddress,
  };

  await repository.identity.update(identity);

  logger.debug("identity address updated", {
    identityId,
    address: identity.address,
  });
};
