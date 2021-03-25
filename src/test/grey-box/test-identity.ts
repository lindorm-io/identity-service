import { Identity } from "../../entity";

export const getTestIdentity = (): Identity =>
  new Identity({
    id: "b24c6bfe-8e30-4f02-9c92-f7eca5c3b1b1",
    address: {
      country: "country",
      locality: "locality",
      postalCode: "postalCode",
      region: "region",
      streetAddress: "streetAddress",
    },
    birthDate: "2000-01-01",
    displayName: {
      name: "displayName",
      number: 1234,
    },
    familyName: "familyName",
    gender: "gender",
    givenName: "givenName",
    gravatar: "https://gravatar.url/",
    locale: "sv-SE",
    middleName: "middleName",
    nickname: "nickname",
    phoneNumber: "+46700000000",
    phoneNumberVerified: true,
    picture: "https://picture.url/",
    preferredUsername: "preferredUsername",
    profile: "https://profile.url/",
    username: "username",
    website: "https://website.url/",
    zoneInfo: "Europe/Stockholm",
  });
