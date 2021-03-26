import MockDate from "mockdate";
import { Identity } from "../../../entity";
import { Scope } from "@lindorm-io/jwt";
import { UsernameConflictError } from "../../../error";
import { changeUsername } from "./change-username";
import { getTestRepository, inMemoryStore, resetStore } from "../../../test";
import { winston } from "../../../logger";

jest.mock("../../../support", () => ({
  assertAccountPermission: jest.fn(() => () => undefined),
}));

MockDate.set("2020-01-01 08:00:00.000");

describe("changeUsername", () => {
  let ctx: any;

  beforeEach(async () => {
    ctx = {
      logger: winston,
      repository: await getTestRepository(),
      token: { bearer: { scope: [Scope.DEFAULT, Scope.EDIT] } },
    };

    await ctx.repository.identity.create(
      new Identity({
        id: "fd4e3548-1279-4065-9671-74c3bbea0c25",
      }),
    );
  });

  afterEach(resetStore);

  test("should change username", async () => {
    const options = {
      identityId: "fd4e3548-1279-4065-9671-74c3bbea0c25",
      username: "username",
    };

    await expect(changeUsername(ctx)(options)).resolves.toBe(undefined);

    expect(inMemoryStore).toMatchSnapshot();
  });

  test("should throw error if the username exists", async () => {
    await ctx.repository.identity.create(
      new Identity({
        id: "e908c4fd-a0b2-4804-ba42-bef787490681",
        username: "exists",
      }),
    );

    const options = {
      identityId: "fd4e3548-1279-4065-9671-74c3bbea0c25",
      username: "exists",
    };

    await expect(changeUsername(ctx)(options)).rejects.toThrow(expect.any(UsernameConflictError));

    expect(inMemoryStore).toMatchSnapshot();
  });
});
