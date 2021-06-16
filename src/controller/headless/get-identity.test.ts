import MockDate from "mockdate";
import { getTestIdentity, logger } from "../../test";
import { headlessGetIdentity } from "./get-identity";

MockDate.set("2020-01-01T08:00:00.000Z");

describe("headlessGetIdentity", () => {
  let ctx: any;

  beforeEach(() => {
    ctx = {
      entity: {
        identity: getTestIdentity(),
      },
      logger,
    };
  });

  test("should findOrCreate entity", async () => {
    await expect(headlessGetIdentity(ctx)).resolves.toStrictEqual({
      body: {
        address: {
          country: "country",
          locality: "locality",
          postalCode: "postalCode",
          region: "region",
          streetAddress: "streetAddress",
        },
        birthDate: "2000-01-01",
        created: new Date("2020-01-01T08:00:00.000Z"),
        displayName: "displayName#1234",
        familyName: "familyName",
        gender: "gender",
        givenName: "givenName",
        gravatar: "https://gravatar.url/",
        locale: "sv-SE",
        middleName: "middleName",
        nickname: "nickname",
        phoneNumber: "+46700000000",
        phoneNumberVerified: false,
        picture: "https://picture.url/",
        preferredUsername: "preferredUsername",
        profile: "https://profile.url/",
        updated: new Date("2020-01-01T08:00:00.000Z"),
        website: "https://website.url/",
        zoneInfo: "Europe/Stockholm",
      },
      status: 200,
    });
  });
});
