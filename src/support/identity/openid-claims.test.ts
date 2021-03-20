import MockDate from "mockdate";
import { Identity } from "../../entity";
import { getOpenIdClaims } from "./openid-claims";
import { Scope } from "@lindorm-io/jwt";

MockDate.set("2020-01-01 08:00:00.000");

jest.mock("../../support", () => ({
  getOpenIdClaims: jest.fn(() => ({ openid: true })),
}));

describe("getIdentityOpenId", () => {
  let identity: Identity;

  beforeEach(async () => {
    identity = new Identity({
      id: "fd4e3548-1279-4065-9671-74c3bbea0c25",
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
  });

  afterEach(jest.clearAllMocks);

  test("should return claims based on scope", () => {
    expect(
      getOpenIdClaims(
        identity,
        [Scope.OPENID, Scope.ADDRESS, Scope.GIVEN_NAME, Scope.MIDDLE_NAME, Scope.FAMILY_NAME].join(" "),
      ),
    ).toMatchSnapshot();
  });

  test("should return an empty object on unknown scope", () => {
    expect(getOpenIdClaims(identity, [Scope.OPENID, "unknown"].join(" "))).toMatchSnapshot();
  });
});
