import { ClientError, ServerError } from "@lindorm-io/errors";
import { Identity } from "../../entity";
import { Scope } from "@lindorm-io/jwt";
import { identityUpdate } from "./update";
import { getTestDisplayName, logger } from "../../test";
import { getRandomNumber as _getRandomNumber } from "@lindorm-io/core";

jest.mock("@lindorm-io/core", () => ({
  ...(jest.requireActual("@lindorm-io/core") as object),
  getRandomNumber: jest.fn().mockResolvedValue(9876),
}));

const getRandomNumber = _getRandomNumber as unknown as jest.Mock;

describe("identityUpdate", () => {
  let ctx: any;

  beforeEach(() => {
    ctx = {
      entity: { identity: new Identity({}) },
      logger,
      repository: {
        displayNameRepository: {
          findOrCreate: async () => getTestDisplayName(),
          update: jest.fn(),
        },
        identityRepository: {
          update: jest.fn(),
        },
      },
      request: {
        body: {
          address: {
            country: "country",
            locality: "locality",
            postalCode: "postalCode",
            region: "region",
            streetAddress: "streetAddress",
          },
          birthDate: "birthDate",
          familyName: "familyName",
          gender: "gender",
          givenName: "givenName",
          gravatar: "gravatar",
          locale: "locale",
          middleName: "middleName",
          nickname: "nickname",
          phoneNumber: "phoneNumber",
          picture: "picture",
          preferredUsername: "preferredUsername",
          profile: "profile",
          website: "website",
          zoneInfo: "zoneInfo",
        },
      },
      token: {
        bearerToken: {
          scope: [
            Scope.EDIT,
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
            Scope.USERNAME,
          ],
        },
      },
    };
  });

  test("should update identity keys", async () => {
    await expect(identityUpdate(ctx)).resolves.toStrictEqual({
      body: {},
      status: 204,
    });

    expect(ctx.repository.identityRepository.update).toHaveBeenCalledWith(
      expect.objectContaining({
        address: {
          country: "country",
          locality: "locality",
          postalCode: "postalCode",
          region: "region",
          streetAddress: "streetAddress",
        },
        birthDate: "birthDate",
        familyName: "familyName",
        gender: "gender",
        givenName: "givenName",
        gravatar: "gravatar",
        locale: "locale",
        middleName: "middleName",
        nickname: "nickname",
        phoneNumber: "phoneNumber",
        picture: "picture",
        preferredUsername: "preferredUsername",
        profile: "profile",
        website: "website",
        zoneInfo: "zoneInfo",
      }),
    );
  });

  test("should update displayName", async () => {
    ctx.token.bearerToken.scope = [Scope.EDIT];
    ctx.request.body = {
      displayName: "displayName",
    };

    await expect(identityUpdate(ctx)).resolves.toStrictEqual({
      body: {},
      status: 204,
    });

    expect(ctx.repository.identityRepository.update).toHaveBeenCalledWith(
      expect.objectContaining({
        displayName: {
          name: "displayName",
          number: 9876,
        },
      }),
    );

    expect(ctx.repository.displayNameRepository.update).toHaveBeenCalledWith(
      expect.objectContaining({
        numbers: [1234, 2345, 3456, 4567, 5678, 6789, 9876],
      }),
    );
  });

  test("should eventually find displayName number", async () => {
    getRandomNumber
      .mockResolvedValueOnce(1234)
      .mockResolvedValueOnce(2345)
      .mockResolvedValueOnce(3456)
      .mockResolvedValueOnce(4567)
      .mockResolvedValueOnce(5678)
      .mockResolvedValueOnce(6789);

    ctx.token.bearerToken.scope = [Scope.EDIT];
    ctx.request.body = {
      displayName: "displayName",
    };

    await expect(identityUpdate(ctx)).resolves.toStrictEqual({
      body: {},
      status: 204,
    });
  });

  test("should throw when displayName number cannot be resolved", async () => {
    getRandomNumber.mockResolvedValue(1234);

    ctx.token.bearerToken.scope = [Scope.EDIT];
    ctx.request.body = {
      displayName: "displayName",
    };

    await expect(identityUpdate(ctx)).rejects.toThrow(ServerError);
  });

  test("should throw on scope/key conflict", async () => {
    ctx.token.bearerToken.scope = [Scope.EDIT, Scope.BIRTH_DATE];
    ctx.request.body = {
      birthDate: "birthDate",
      familyName: "familyName",
    };

    await expect(identityUpdate(ctx)).rejects.toThrow(ClientError);
  });

  test("should throw on invalid scope", async () => {
    ctx.token.bearerToken.scope = [];

    await expect(identityUpdate(ctx)).rejects.toThrow(ClientError);
  });
});
