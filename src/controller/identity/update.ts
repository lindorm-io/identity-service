import { ClientError, ServerError } from "@lindorm-io/errors";
import { Controller, ControllerResponse, HttpStatus } from "@lindorm-io/koa";
import { IdentityAddress, IdentityContext } from "../../typing";
import { IdentityAttributes } from "../../entity";
import { Scope } from "../../enum";
import { camelCase, getRandomNumber } from "@lindorm-io/core";
import { includes } from "lodash";

const ALWAYS_ALLOWED_SCOPE = ["displayName", "gravatar"];

interface RequestBody {
  address?: IdentityAddress;
  birthDate?: string | null;
  displayName?: string | null;
  familyName?: string | null;
  gender?: string | null;
  givenName?: string | null;
  gravatar?: string | null;
  locale?: string | null;
  middleName?: string | null;
  nickname?: string | null;
  phoneNumber?: string | null;
  picture?: string | null;
  preferredUsername?: string | null;
  profile?: string | null;
  website?: string | null;
  zoneInfo?: string | null;
}

type ResponseBody = Record<string, never>;

export const identityUpdate: Controller<IdentityContext<RequestBody>> = async (
  ctx,
): Promise<ControllerResponse<ResponseBody>> => {
  const {
    entity: { identity },
    logger,
    repository: { displayNameRepository, identityRepository },
    request: { body },
    token: { bearerToken },
  } = ctx;

  if (!includes(bearerToken.scope, Scope.EDIT)) {
    throw new ClientError("Forbidden", {
      description: "Invalid scope",
      statusCode: ClientError.StatusCode.FORBIDDEN,
    });
  }

  const claims = bearerToken.scope.map(camelCase) as Array<keyof IdentityAttributes>;

  for (const key of Object.keys(body)) {
    if (includes(ALWAYS_ALLOWED_SCOPE, key)) continue;

    if (!includes(claims, key)) {
      throw new ClientError("Forbidden", {
        data: { key },
        debug: { bearerToken },
        description: "Invalid scope",
        statusCode: ClientError.StatusCode.FORBIDDEN,
      });
    }
  }

  const {
    address,
    birthDate,
    displayName,
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
  } = body;

  if (displayName !== undefined) {
    const displayNameEntity = await displayNameRepository.findOrCreate({ name: displayName });

    const timeout = 999;

    let count = 0;
    let number = await getRandomNumber(4);

    while (count !== timeout && displayNameEntity.exists(number)) {
      count += 1;
      number = await getRandomNumber(4);
    }

    if (count === timeout) {
      throw new ServerError("Unable to find number for displayName");
    }

    displayNameEntity.add(number);

    await displayNameRepository.update(displayNameEntity);

    identity.displayName.name = displayName;
    identity.displayName.number = number;
  }

  if (address !== undefined) identity.address = address;
  if (birthDate !== undefined) identity.birthDate = birthDate;
  if (familyName !== undefined) identity.familyName = familyName;
  if (gender !== undefined) identity.gender = gender;
  if (givenName !== undefined) identity.givenName = givenName;
  if (gravatar !== undefined) identity.gravatar = gravatar;
  if (locale !== undefined) identity.locale = locale;
  if (middleName !== undefined) identity.middleName = middleName;
  if (nickname !== undefined) identity.nickname = nickname;
  if (phoneNumber !== undefined) identity.phoneNumber = phoneNumber;
  if (picture !== undefined) identity.picture = picture;
  if (preferredUsername !== undefined) identity.preferredUsername = preferredUsername;
  if (profile !== undefined) identity.profile = profile;
  if (website !== undefined) identity.website = website;
  if (zoneInfo !== undefined) identity.zoneInfo = zoneInfo;

  await identityRepository.update(identity);

  logger.info("identity update resolved", {});

  return {
    body: {},
    status: HttpStatus.Success.NO_CONTENT,
  };
};
