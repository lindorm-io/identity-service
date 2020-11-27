import Joi from "@hapi/joi";
import { IKoaIdentityContext } from "../../typing";
import { assertAccountPermission, getDisplayNameObject, removeDisplayNameNumber } from "../../support";
import { isScope, Scope } from "@lindorm-io/jwt";
import { InvalidScopeError } from "../../error";

export interface IChangeDisplayNameOptions {
  identityId: string;
  displayName: string;
}

const schema = Joi.object({
  identityId: Joi.string().guid().required(),
  displayName: Joi.string().required(),
});

export const changeDisplayName = (ctx: IKoaIdentityContext) => async (
  options: IChangeDisplayNameOptions,
): Promise<void> => {
  await schema.validateAsync(options);

  const { logger, repository, token } = ctx;
  const {
    bearer: { scope },
  } = token;
  const { identityId, displayName } = options;

  await assertAccountPermission(ctx)(identityId);

  if (!isScope(scope, Scope.EDIT)) {
    throw new InvalidScopeError(scope, Scope.EDIT);
  }

  const identity = await repository.identity.find({ id: identityId });
  const displayNameExists = !!identity.displayName;

  identity.displayName = await getDisplayNameObject(ctx)(displayName);

  await repository.identity.update(identity);

  if (displayNameExists) {
    await removeDisplayNameNumber(ctx)(identity.displayName);
  }

  logger.debug("identity display name updated", {
    identityId,
    displayName: identity.displayName,
  });
};
