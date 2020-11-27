import MockDate from "mockdate";
import { Identity } from "../../entity";
import { InvalidScopeError } from "../../error";
import { Scope } from "@lindorm-io/jwt";
import { getGreyBoxRepository, resetStore } from "../../test/grey-box";
import { getIdentityOpenId } from "./get-identity-open-id";
import { getOpenIdClaims } from "../../support";
import { winston } from "../../logger";

MockDate.set("2020-01-01 08:00:00.000");

jest.mock("../../support", () => ({
  getOpenIdClaims: jest.fn(() => ({ openid: true })),
}));

describe("getIdentityOpenId", () => {
  let ctx: any;

  beforeEach(async () => {
    ctx = {
      logger: winston,
      repository: await getGreyBoxRepository(),
      token: { bearer: { scope: [Scope.DEFAULT, Scope.EDIT].join(" ") } },
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

  test("should return bare minimum", async () => {
    const options = {
      identityId: "fd4e3548-1279-4065-9671-74c3bbea0c25",
      scope: [Scope.DEFAULT, Scope.OPENID].join(" "),
    };

    await expect(getIdentityOpenId(ctx)(options)).resolves.toMatchSnapshot();
  });

  test("should return scoped data", async () => {
    const options = {
      identityId: "fd4e3548-1279-4065-9671-74c3bbea0c25",
      scope: [Scope.DEFAULT, Scope.OPENID, Scope.ADDRESS, Scope.GIVEN_NAME, Scope.ZONE_INFO].join(" "),
    };

    await expect(getIdentityOpenId(ctx)(options)).resolves.toMatchSnapshot();

    expect(getOpenIdClaims).toHaveBeenCalledWith(expect.any(Identity), "default openid address given_name zone_info");
  });

  test("should throw error when DEFAULT is missing", async () => {
    const options = {
      identityId: "fd4e3548-1279-4065-9671-74c3bbea0c25",
      scope: "wrong",
    };

    await expect(getIdentityOpenId(ctx)(options)).rejects.toThrow(expect.any(InvalidScopeError));
  });

  test("should throw error when OPENID is missing", async () => {
    const options = {
      identityId: "fd4e3548-1279-4065-9671-74c3bbea0c25",
      scope: Scope.DEFAULT,
    };

    await expect(getIdentityOpenId(ctx)(options)).rejects.toThrow(expect.any(InvalidScopeError));
  });
});
