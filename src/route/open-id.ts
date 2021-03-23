import { BEARER_AUTH_MW_OPTIONS } from "../config";
import { HttpStatus } from "@lindorm-io/core";
import { IKoaIdentityContext } from "../typing";
import { Router } from "@lindorm-io/koa";
import { bearerAuthMiddleware } from "@lindorm-io/koa-bearer-auth";
import { getOpenIdInformation } from "../action";

export const router = new Router();

router.use(bearerAuthMiddleware(BEARER_AUTH_MW_OPTIONS));

router.get(
  "/:id",
  async (ctx: IKoaIdentityContext): Promise<void> => {
    const identityId = ctx.params.id;

    ctx.body = await getOpenIdInformation(ctx)({ identityId });
    ctx.status = HttpStatus.Success.OK;
  },
);
