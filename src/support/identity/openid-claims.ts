import { Identity } from "../../entity";
import { isScope, Scope } from "@lindorm-io/jwt";
import { IOpenIdClaim } from "../../typing";
import { InvalidPermissionError } from "../../error";

const getClaim = (identity: Identity, scope: Scope): IOpenIdClaim => {
  switch (scope) {
    case Scope.ADDRESS:
      return { address: identity.address };

    case Scope.BIRTH_DATE:
      return { birthDate: identity.birthDate };

    case Scope.FAMILY_NAME:
      return { familyName: identity.familyName };

    case Scope.GENDER:
      return { gender: identity.gender };

    case Scope.GIVEN_NAME:
      return { givenName: identity.givenName };

    case Scope.LOCALE:
      return { locale: identity.locale };

    case Scope.MIDDLE_NAME:
      return { middleName: identity.middleName };

    case Scope.NICKNAME:
      return { nickname: identity.nickname };

    case Scope.PHONE_NUMBER:
      return {
        phoneNumber: identity.phoneNumber,
        phoneNumberVerified: identity.phoneNumberVerified,
      };

    case Scope.PICTURE:
      return { picture: identity.picture };

    case Scope.PREFERRED_USERNAME:
      return { preferredUsername: identity.preferredUsername };

    case Scope.PROFILE:
      return { profile: identity.profile };

    case Scope.USERNAME:
      return { username: identity.username };

    case Scope.WEBSITE:
      return { website: identity.website };

    case Scope.ZONE_INFO:
      return { zoneInfo: identity.zoneInfo };

    default:
      return {};
  }
};

export const getOpenIdClaims = (identity: Identity, scope: string): IOpenIdClaim => {
  if (!isScope(scope, Scope.OPENID)) {
    throw new InvalidPermissionError();
  }

  const array = scope.split(" ") as Array<Scope>;
  let result: IOpenIdClaim = {};

  for (const item of array) {
    result = {
      ...result,
      ...getClaim(identity, item),
    };
  }

  return result;
};
