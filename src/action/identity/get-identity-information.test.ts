import MockDate from "mockdate";
import { Identity } from "../../entity";
import { getGreyBoxRepository, resetStore } from "../../test";
import { getIdentityInformation } from "./get-identity-information";
import { winston } from "../../logger";

jest.mock("../../support", () => ({
  ...jest.requireActual("../../support"),
  assertAccountPermission: jest.fn(() => () => undefined),
}));

MockDate.set("2020-01-01 08:00:00.000");

describe("getIdentityInformation", () => {
  let ctx: any;

  beforeEach(async () => {
    ctx = {
      logger: winston,
      repository: await getGreyBoxRepository(),
    };

    await ctx.repository.identity.create(
      new Identity({
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
      }),
    );
  });

  afterEach(() => {
    resetStore();
    jest.clearAllMocks();
  });

  test("should return identity information", async () => {
    const options = {
      identityId: "fd4e3548-1279-4065-9671-74c3bbea0c25",
    };

    await expect(getIdentityInformation(ctx)(options)).resolves.toMatchSnapshot();
  });
});
