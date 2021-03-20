import { BASIC_AUTH_MW_OPTIONS } from "../config";
import { HttpStatus } from "@lindorm-io/core";
import { IKoaIdentityContext } from "../typing";
import { Router } from "@lindorm-io/koa";
import { basicAuthMiddleware } from "@lindorm-io/koa-basic-auth";
import { ensureIdentityExists } from "../action";

export const router = new Router();

router.use(basicAuthMiddleware(BASIC_AUTH_MW_OPTIONS));

router.post(
  "/:id",
  async (ctx: IKoaIdentityContext): Promise<void> => {
    const identityId = ctx.params.id;

    ctx.body = await ensureIdentityExists(ctx)({ identityId });
    ctx.status = HttpStatus.Success.CREATED;
  },
);
