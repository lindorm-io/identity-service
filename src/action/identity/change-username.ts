import Joi from "@hapi/joi";
import { IKoaIdentityContext } from "../../typing";
import { RepositoryEntityNotFoundError } from "@lindorm-io/mongo";
import { InvalidScopeError, UsernameConflictError } from "../../error";
import { assertAccountPermission } from "../../support";
import { isScope, Scope } from "@lindorm-io/jwt";

export interface IChangeUsernameOptions {
  identityId: string;
  username: string;
}

const schema = Joi.object({
  identityId: Joi.string().guid().required(),
  username: Joi.string().required(),
});

export const changeUsername = (ctx: IKoaIdentityContext) => async (options: IChangeUsernameOptions): Promise<void> => {
  await schema.validateAsync(options);

  const { logger, repository, token } = ctx;
  const {
    bearer: { scope },
  } = token;
  const { identityId, username } = options;

  await assertAccountPermission(ctx)(identityId);

  if (!isScope(scope, Scope.EDIT)) {
    throw new InvalidScopeError(scope, Scope.EDIT);
  }

  const identity = await repository.identity.find({ id: identityId });
  identity.username = username;

  try {
    await repository.identity.find({ username });

    throw new UsernameConflictError(username);
  } catch (err) {
    if (!(err instanceof RepositoryEntityNotFoundError)) {
      throw err;
    }
  }

  await repository.identity.update(identity);

  logger.debug("identity username updated", {
    identityId,
    username: identity.username,
  });
};
