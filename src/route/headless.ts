import { IdentityContext } from "../typing";
import { basicAuthMiddleware, identityEntityMiddleware } from "../middleware";
import { createController, Router, schemaMiddleware } from "@lindorm-io/koa";
import {
  headlessCreateIdentity,
  headlessCreateIdentitySchema,
  headlessGetIdentity,
  headlessGetIdentitySchema,
} from "../controller";
import { headlessRemoveIdentity, headlessRemoveIdentitySchema } from "../controller/headless/remove-identity";

export const router = new Router<unknown, IdentityContext>();

router.use(basicAuthMiddleware);

router.post(
  "/identity",
  schemaMiddleware("request.body", headlessCreateIdentitySchema),
  createController(headlessCreateIdentity),
);

router.get(
  "/identity/:id",
  schemaMiddleware("params", headlessGetIdentitySchema),
  identityEntityMiddleware("params.id"),
  createController(headlessGetIdentity),
);

router.delete(
  "/identity/:id",
  schemaMiddleware("params", headlessRemoveIdentitySchema),
  identityEntityMiddleware("params.id"),
  createController(headlessRemoveIdentity),
);
