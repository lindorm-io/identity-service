import Joi from "@hapi/joi";
import { IKoaIdentityContext } from "../../../typing";
import { InvalidScopeError } from "../../../error";
import { JOI_DATE, JOI_LOCALE, JOI_PHONE, JOI_ZONE_INFO } from "../../../constant";
import { assertAccountPermission } from "../../../support";
import { isScope, Scope } from "@lindorm-io/jwt";

export interface IUpdateIdentityOptions {
  identityId: string;
  birthDate?: string;
  familyName?: string;
  gender?: string;
  givenName?: string;
  gravatar?: string;
  locale?: string;
  middleName?: string;
  nickname?: string;
  phoneNumber?: string;
  picture?: string;
  preferredUsername?: string;
  profile?: string;
  website?: string;
  zoneInfo?: string;
}

const schema = Joi.object({
  identityId: Joi.string().guid().required(),
  birthDate: JOI_DATE,
  familyName: Joi.string(),
  gender: Joi.string(),
  givenName: Joi.string(),
  gravatar: Joi.string().uri(),
  locale: JOI_LOCALE,
  middleName: Joi.string(),
  nickname: Joi.string(),
  phoneNumber: JOI_PHONE,
  picture: Joi.string().uri(),
  preferredUsername: Joi.string(),
  profile: Joi.string().uri(),
  website: Joi.string().uri(),
  zoneInfo: JOI_ZONE_INFO,
});

export const updateIdentity = (ctx: IKoaIdentityContext) => async (options: IUpdateIdentityOptions): Promise<void> => {
  await schema.validateAsync(options);

  const { logger, repository, token } = ctx;
  const {
    bearer: { scope },
  } = token;
  const {
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
  } = options;

  await assertAccountPermission(ctx)(identityId);

  if (!isScope(scope, Scope.EDIT)) {
    throw new InvalidScopeError(scope, Scope.EDIT);
  }

  const identity = await repository.identity.find({ id: identityId });

  if (birthDate) {
    identity.birthDate = birthDate;
  }
  if (familyName) {
    identity.familyName = familyName;
  }
  if (gender) {
    identity.gender = gender;
  }
  if (givenName) {
    identity.givenName = givenName;
  }
  if (gravatar) {
    identity.gravatar = gravatar;
  }
  if (locale) {
    identity.locale = locale;
  }
  if (middleName) {
    identity.middleName = middleName;
  }
  if (nickname) {
    identity.nickname = nickname;
  }
  if (phoneNumber) {
    identity.phoneNumber = phoneNumber;
  }
  if (picture) {
    identity.picture = picture;
  }
  if (preferredUsername) {
    identity.preferredUsername = preferredUsername;
  }
  if (profile) {
    identity.profile = profile;
  }
  if (website) {
    identity.website = website;
  }
  if (zoneInfo) {
    identity.zoneInfo = zoneInfo;
  }

  await repository.identity.update(identity);

  logger.debug("identity updated", {
    identityId: identity.id,
  });
};
