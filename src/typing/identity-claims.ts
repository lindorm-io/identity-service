export interface IdentityAddress {
  country: string;
  locality: string;
  postalCode: string;
  region: string;
  streetAddress: string;
}

export interface IdentityClaims {
  address: IdentityAddress;
  birthDate: string;
  displayName: string;
  familyName: string;
  gender: string;
  givenName: string;
  gravatar: string;
  locale: string;
  middleName: string;
  nickname: string;
  phoneNumber: string;
  phoneNumberVerified: boolean;
  picture: string;
  preferredUsername: string;
  profile: string;
  website: string;
  zoneInfo: string;
}
