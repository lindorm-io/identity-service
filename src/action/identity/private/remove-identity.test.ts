import MockDate from "mockdate";
import { Identity } from "../../../entity";
import { getTestRepository, inMemoryStore, resetStore } from "../../../test";
import { Scope } from "@lindorm-io/jwt";
import { removeIdentity } from "./remove-identity";
import { winston } from "../../../logger";

jest.mock("../../../support", () => ({
  assertAccountPermission: jest.fn(() => () => undefined),
}));

MockDate.set("2020-01-01 08:00:00.000");

describe("removeIdentity", () => {
  let ctx: any;

  beforeEach(async () => {
    ctx = {
      logger: winston,
      repository: await getTestRepository(),
      token: { bearer: { scope: [Scope.DEFAULT, Scope.EDIT].join(" ") } },
    };

    await ctx.repository.identity.create(
      new Identity({
        id: "fd4e3548-1279-4065-9671-74c3bbea0c25",
      }),
    );
  });

  afterEach(resetStore);

  test("should remove identity", async () => {
    const options = {
      identityId: "fd4e3548-1279-4065-9671-74c3bbea0c25",
    };

    await expect(removeIdentity(ctx)(options)).resolves.toBe(undefined);

    expect(inMemoryStore).toMatchSnapshot();
  });
});
