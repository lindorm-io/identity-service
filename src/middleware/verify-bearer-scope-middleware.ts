import { Middleware } from "@lindorm-io/koa";
import { IdentityContext } from "../typing";
import { includes } from "lodash";
import { Scope } from "@lindorm-io/jwt";
import { ClientError } from "@lindorm-io/errors";

export const verifyBearerScopeMiddleware: Middleware<IdentityContext> = async (ctx, next): Promise<void> => {
  const {
    token: {
      bearerToken: { scope },
    },
  } = ctx;

  if (!includes(scope, Scope.DEFAULT)) {
    throw new ClientError("Forbidden", {
      description: "Invalid scope",
      statusCode: ClientError.StatusCode.FORBIDDEN,
    });
  }
  if (!includes(scope, Scope.OPENID)) {
    throw new ClientError("Forbidden", {
      description: "Invalid scope",
      statusCode: ClientError.StatusCode.FORBIDDEN,
    });
  }

  await next();
};
