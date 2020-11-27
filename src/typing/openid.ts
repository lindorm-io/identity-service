import { IIdentityAddress } from "../entity";

export interface IOpenIdStandardClaim {
  address?: IIdentityAddress;
  birthDate?: string;
  email?: string;
  familyName?: string;
  gender?: string;
  givenName?: string;
  locale?: string;
  middleName?: string;
  nickname?: string;
  phoneNumber?: string;
  phoneNumberVerified?: boolean;
  picture?: string;
  preferredUsername?: string;
  profile?: string;
  website?: string;
  zoneInfo?: string;
}

export interface IOpenIdClaim extends IOpenIdStandardClaim {
  username?: string;
}
