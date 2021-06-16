export interface OpenIdStandardClaim {
  address?: {
    country?: string;
    locality?: string;
    postalCode?: string;
    region?: string;
    streetAddress?: string;
  };
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

export interface OpenIdClaim extends OpenIdStandardClaim {
  username?: string;
}
