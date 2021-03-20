import Joi from "@hapi/joi";
import { IKoaIdentityContext } from "../../../typing";
import { InvalidScopeError } from "../../../error";
import { assertAccountPermission } from "../../../support";
import { isScope, Scope } from "@lindorm-io/jwt";

export interface IRemoveIdentityOptions {
  identityId: string;
}

const schema = Joi.object({
  identityId: Joi.string().guid().required(),
});

export const removeIdentity = (ctx: IKoaIdentityContext) => async (options: IRemoveIdentityOptions): Promise<void> => {
  await schema.validateAsync(options);

  const { logger, repository, token } = ctx;
  const {
    bearer: { scope },
  } = token;
  const { identityId } = options;

  await assertAccountPermission(ctx)(identityId);

  if (!isScope(scope, Scope.EDIT)) {
    throw new InvalidScopeError(scope, Scope.EDIT);
  }

  const identity = await repository.identity.find({ id: identityId });

  await repository.identity.remove(identity);

  logger.debug("identity removed", {
    identityId: identity.id,
  });
};
