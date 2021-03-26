import MockDate from "mockdate";
import { Identity } from "../../../entity";
import { getTestRepository, inMemoryStore, resetStore } from "../../../test";
import { Scope } from "@lindorm-io/jwt";
import { updateIdentity } from "./update-identity";
import { winston } from "../../../logger";

jest.mock("../../../support", () => ({
  assertAccountPermission: jest.fn(() => () => undefined),
}));

MockDate.set("2020-01-01 08:00:00.000");

describe("updateIdentity", () => {
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

  test("should change identity data", async () => {
    const options = {
      identityId: "fd4e3548-1279-4065-9671-74c3bbea0c25",
      familyName: "familyName",
    };

    await expect(updateIdentity(ctx)(options)).resolves.toBe(undefined);

    expect(inMemoryStore).toMatchSnapshot();
  });
});
