import Joi from "@hapi/joi";
import { IIdentityAddress } from "../../entity";
import { IKoaIdentityContext } from "../../typing";
import { assertAccountPermission, getDisplayNameString } from "../../support";

export interface IIdentityInformationOptions {
  identityId: string;
}

export interface IIdentityInformationData {
  displayName: string;
  gravatar: string;
  username: string;

  address: IIdentityAddress;
  birthDate: string;
  familyName: string;
  gender: string;
  givenName: string;
  locale: string;
  middleName: string;
  nickname: string;
  phoneNumber: string;
  picture: string;
  preferredUsername: string;
  profile: string;
  website: string;
  zoneInfo: string;
}

const schema = Joi.object({
  identityId: Joi.string().guid().required(),
});

export const getIdentityInformation = (ctx: IKoaIdentityContext) => async (
  options: IIdentityInformationOptions,
): Promise<IIdentityInformationData> => {
  await schema.validateAsync(options);

  const { logger, repository } = ctx;
  const { identityId } = options;

  logger.debug("requesting identity information", {
    identityId,
  });

  await assertAccountPermission(ctx)(identityId);

  const identity = await repository.identity.find({ id: identityId });

  return {
    displayName: getDisplayNameString(identity.displayName),
    gravatar: identity.gravatar,
    username: identity.username,

    address: identity.address,
    birthDate: identity.birthDate,
    familyName: identity.familyName,
    gender: identity.gender,
    givenName: identity.givenName,
    locale: identity.locale,
    middleName: identity.middleName,
    nickname: identity.nickname,
    phoneNumber: identity.phoneNumber,
    picture: identity.picture,
    preferredUsername: identity.preferredUsername,
    profile: identity.profile,
    website: identity.website,
    zoneInfo: identity.zoneInfo,
  };
};
