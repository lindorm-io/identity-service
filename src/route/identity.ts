import { IdentityContext } from "../typing";
import { Scope } from "../enum/scope";
import { bearerAuthMiddleware, identityEntityMiddleware } from "../middleware";
import { createController, Router, schemaMiddleware } from "@lindorm-io/koa";
import { identityGet, identityUpdate, identityUpdateSchema } from "../controller";

export const router = new Router<unknown, IdentityContext>();

router.get(
  "/",
  bearerAuthMiddleware([Scope.DEFAULT, Scope.OPENID]),
  identityEntityMiddleware("token.bearerToken.subject"),
  createController(identityGet),
);

router.patch(
  "/",
  bearerAuthMiddleware([Scope.DEFAULT, Scope.EDIT, Scope.OPENID]),
  schemaMiddleware("request.body", identityUpdateSchema),
  identityEntityMiddleware("token.bearerToken.subject"),
  createController(identityUpdate),
);
