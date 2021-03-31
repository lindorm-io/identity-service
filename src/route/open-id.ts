import { HttpStatus } from "@lindorm-io/core";
import { IKoaIdentityContext } from "../typing";
import { Router } from "@lindorm-io/koa";
import { bearerAuthMiddleware } from "../middleware";
import { getOpenIdInformation } from "../action";

export const router = new Router();

router.use(bearerAuthMiddleware);

router.get(
  "/",
  async (ctx: IKoaIdentityContext): Promise<void> => {
    const {
      token: {
        bearer: { subject },
      },
    } = ctx;

    ctx.body = await getOpenIdInformation(ctx)({ identityId: subject });
    ctx.status = HttpStatus.Success.OK;
  },
);

router.get(
  "/:id",
  async (ctx: IKoaIdentityContext): Promise<void> => {
    const identityId = ctx.params.id;

    ctx.body = await getOpenIdInformation(ctx)({ identityId });
    ctx.status = HttpStatus.Success.OK;
  },
);
