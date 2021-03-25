import { BASIC_AUTH_MW_OPTIONS } from "../config";
import { HttpStatus } from "@lindorm-io/core";
import { IKoaIdentityContext } from "../typing";
import { Router } from "@lindorm-io/koa";
import { basicAuthMiddleware } from "@lindorm-io/koa-basic-auth";
import { ensureIdentityExists } from "../action";
import { getOpenIdClaims } from "../action/headless/get-open-id-claims";

export const router = new Router();

router.use(basicAuthMiddleware(BASIC_AUTH_MW_OPTIONS));

router.post(
  "/create/:id",
  async (ctx: IKoaIdentityContext): Promise<void> => {
    const identityId = ctx.params.id;

    ctx.body = await ensureIdentityExists(ctx)({ identityId });
    ctx.status = HttpStatus.Success.CREATED;
  },
);

router.post(
  "/open-id/:id",
  async (ctx: IKoaIdentityContext): Promise<void> => {
    const identityId = ctx.params.id;
    const { scope } = ctx.request.body;

    ctx.body = await getOpenIdClaims(ctx)({ identityId, scope });
    ctx.status = HttpStatus.Success.OK;
  },
);
