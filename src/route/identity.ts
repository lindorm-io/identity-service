import { IdentityContext } from "../typing";
import { bearerAuthMiddleware, identityEntityMiddleware, verifyBearerScopeMiddleware } from "../middleware";
import { createController, Router, schemaMiddleware } from "@lindorm-io/koa";
import { identityGet, identityUpdate, identityUpdateSchema } from "../controller";

export const router = new Router<unknown, IdentityContext>();

router.use(bearerAuthMiddleware);
router.use(verifyBearerScopeMiddleware);

router.get("/", identityEntityMiddleware("token.bearerToken.subject"), createController(identityGet));

router.patch(
  "/",
  schemaMiddleware("request.body", identityUpdateSchema),
  identityEntityMiddleware("token.bearerToken.subject"),
  createController(identityUpdate),
);
