import { identityGet } from "./get";
import { getTestIdentity, logger } from "../../test";
import { Scope } from "../../enum";

describe("identityGet", () => {
  let ctx: any;

  beforeEach(() => {
    ctx = {
      logger,
      entity: {
        identity: getTestIdentity(),
      },
      token: {
        bearerToken: {
          scope: [
            Scope.DEFAULT,
            Scope.EDIT,
            Scope.OPENID,
            Scope.ADDRESS,
            Scope.BIRTH_DATE,
            Scope.EMAIL,
            Scope.FAMILY_NAME,
            Scope.GENDER,
            Scope.GIVEN_NAME,
            Scope.LOCALE,
            Scope.MIDDLE_NAME,
            Scope.NICKNAME,
            Scope.PHONE_NUMBER,
            Scope.PICTURE,
            Scope.PREFERRED_USERNAME,
            Scope.PROFILE,
            Scope.WEBSITE,
            Scope.ZONE_INFO,
          ],
        },
      },
    };
  });

  test("should resolve with fully scoped identity data", async () => {
    await expect(identityGet(ctx)).resolves.toStrictEqual({
      body: {
        address: {
          country: "country",
          locality: "locality",
          postalCode: "postalCode",
          region: "region",
          streetAddress: "streetAddress",
        },
        birthDate: "2000-01-01",
        displayName: "displayName#1234",
        familyName: "familyName",
        gender: "gender",
        givenName: "givenName",
        gravatar: "https://gravatar.url/",
        locale: "sv-SE",
        middleName: "middleName",
        nickname: "nickname",
        phoneNumber: "+46700000000",
        picture: "https://picture.url/",
        preferredUsername: "preferredUsername",
        profile: "https://profile.url/",
        website: "https://website.url/",
        zoneInfo: "Europe/Stockholm",
      },
      status: 200,
    });
  });

  test("should resolve with only scoped data", async () => {
    ctx.token.bearerToken.scope = [
      Scope.DEFAULT,
      Scope.EDIT,
      Scope.OPENID,
      Scope.FAMILY_NAME,
      Scope.GIVEN_NAME,
      Scope.MIDDLE_NAME,
    ];

    await expect(identityGet(ctx)).resolves.toStrictEqual({
      body: {
        displayName: "displayName#1234",
        familyName: "familyName",
        givenName: "givenName",
        gravatar: "https://gravatar.url/",
        middleName: "middleName",
      },
      status: 200,
    });
  });
});
