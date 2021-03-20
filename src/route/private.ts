import { BEARER_TOKEN_MW_OPTIONS } from "../config";
import { HttpStatus } from "@lindorm-io/core";
import { IKoaIdentityContext } from "../typing";
import { Router } from "@lindorm-io/koa";
import { bearerTokenMiddleware } from "@lindorm-io/koa-jwt";
import { changeAddress, changeDisplayName, changeUsername, removeIdentity, updateIdentity } from "../action";

export const router = new Router();

router.use(bearerTokenMiddleware(BEARER_TOKEN_MW_OPTIONS));

router.patch(
  "/:id",
  async (ctx: IKoaIdentityContext): Promise<void> => {
    const identityId = ctx.params.id;
    const {
      birthDate,
      familyName,
      gender,
      givenName,
      gravatar,
      locale,
      middleName,
      nickname,
      phoneNumber,
      picture,
      preferredUsername,
      profile,
      website,
      zoneInfo,
    } = ctx.request.body;

    await updateIdentity(ctx)({
      identityId,
      birthDate,
      familyName,
      gender,
      givenName,
      gravatar,
      locale,
      middleName,
      nickname,
      phoneNumber,
      picture,
      preferredUsername,
      profile,
      website,
      zoneInfo,
    });

    ctx.body = {};
    ctx.status = HttpStatus.Success.NO_CONTENT;
  },
);

router.delete(
  "/:id",
  async (ctx: IKoaIdentityContext): Promise<void> => {
    const identityId = ctx.params.id;

    await removeIdentity(ctx)({ identityId });

    ctx.body = {};
    ctx.status = HttpStatus.Success.ACCEPTED;
  },
);

router.patch(
  "/:id/address",
  async (ctx: IKoaIdentityContext): Promise<void> => {
    const identityId = ctx.params.id;
    const { country, locality, postalCode, region, streetAddress } = ctx.request.body;

    await changeAddress(ctx)({
      identityId,
      country,
      locality,
      postalCode,
      region,
      streetAddress,
    });

    ctx.body = {};
    ctx.status = HttpStatus.Success.NO_CONTENT;
  },
);

router.patch(
  "/:id/display-name",
  async (ctx: IKoaIdentityContext): Promise<void> => {
    const identityId = ctx.params.id;
    const { displayName } = ctx.request.body;

    await changeDisplayName(ctx)({ identityId, displayName });
    ctx.status = HttpStatus.Success.NO_CONTENT;
  },
);

router.patch(
  "/:id/username",
  async (ctx: IKoaIdentityContext): Promise<void> => {
    const identityId = ctx.params.id;
    const { username } = ctx.request.body;

    await changeUsername(ctx)({ identityId, username });

    ctx.body = {};
    ctx.status = HttpStatus.Success.NO_CONTENT;
  },
);
