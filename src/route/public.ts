import { HttpStatus } from "@lindorm-io/core";
import { IKoaIdentityContext } from "../typing";
import { Router } from "@lindorm-io/koa";
import { getPublicInformation } from "../action";

export const router = new Router();

router.get(
  "/:id",
  async (ctx: IKoaIdentityContext): Promise<void> => {
    const identityId = ctx.params.id;

    ctx.body = await getPublicInformation(ctx)({ identityId });
    ctx.status = HttpStatus.Success.OK;
  },
);
