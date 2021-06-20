import { Controller, ControllerResponse, HttpStatus } from "@lindorm-io/koa";
import { IdentityClaims, IdentityContext } from "../../typing";
import { camelCase } from "@lindorm-io/core";
import { getDisplayName } from "../../util";

export const identityGet: Controller<IdentityContext<never>> = async (
  ctx,
): Promise<ControllerResponse<Partial<IdentityClaims>>> => {
  const {
    entity: { identity },
    logger,
    token: { bearerToken },
  } = ctx;

  const scope = bearerToken.scope.map(camelCase) as Array<keyof IdentityClaims>;
  const json = identity.toJSON();
  const { gravatar } = json;
  const displayName = getDisplayName(json.displayName);

  const claims: Record<string, unknown> = {};

  for (const claim of scope) {
    if (!json[claim]) continue;

    claims[claim] = json[claim];
  }

  logger.info("identity data resolved", {
    displayName,
    gravatar,
    ...claims,
  });

  return {
    body: {
      displayName,
      gravatar,
      ...claims,
    },
    status: HttpStatus.Success.OK,
  };
};
