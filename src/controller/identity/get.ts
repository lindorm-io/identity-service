import { Controller, ControllerResponse, HttpStatus } from "@lindorm-io/koa";
import { IdentityAttributes } from "../../entity";
import { IdentityContext } from "../../typing";
import { camelCase } from "@lindorm-io/core";
import { getDisplayName } from "../../util";

type ResponseBody = Record<string, any>;

export const identityGet: Controller<IdentityContext<unknown>> = async (
  ctx,
): Promise<ControllerResponse<ResponseBody>> => {
  const {
    entity: { identity },
    logger,
    token: { bearerToken },
  } = ctx;

  const scope = bearerToken.scope.map(camelCase) as Array<keyof IdentityAttributes>;
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
